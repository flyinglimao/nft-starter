// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Yuan is ERC721Enumerable, Ownable {
    using SafeMath for uint256;
    using Strings for uint256;

    uint256 public maxSupply;
    uint256 public quotaEachAddress;
    uint256 private mintStartTime;
    uint256 private mintEndTime;
    string private baseURI;
    bool public reveal;
    bool public isPublicMint;
    mapping(address => bool) public isWhitelist;
    mapping(address => uint256) public numOfAddressMinted;
    string public contractURI;
    address constant operator = 0x1394982F9678e099191aF16FA93D031D32491376;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 maxSupply_,
        uint256 quotaEachAddress_,
        string memory basedURI_,
        uint256 mintStartTime_,
        uint256 mintEndTime_,
        bool isPublicMint_,
        string memory contractURI_
    ) ERC721(name_, symbol_) {
        maxSupply = maxSupply_;
        quotaEachAddress = quotaEachAddress_;
        baseURI = basedURI_;
        mintStartTime = mintStartTime_;
        mintEndTime = mintEndTime_;
        isPublicMint = isPublicMint_;
        contractURI = contractURI_;
    }

    function publicMint(uint256 _mintNum) public {
        require(isPublicMint, "Not public mint, you need in whitelist");
        require(
            _mintNum.add(numOfAddressMinted[msg.sender]) <= quotaEachAddress,
            "Cannot mint above limit"
        );
        require(
            _mintNum > 0,
            "number of tokens can not be less than or equal to 0"
        );
        require(
            totalSupply() + _mintNum <= maxSupply,
            "Purchase would exceed max public supply of NFTs"
        );
        require(mintStartTime != 0, "start time not set");
        require(block.timestamp > mintStartTime, "mint hasn't start");
        require(block.timestamp < mintEndTime, "mint has finished");

        for (uint256 i = 0; i < _mintNum; i++) {
            numOfAddressMinted[msg.sender] += 1;
            _safeMint(msg.sender, totalSupply());
        }
    }

    function whitelistMint(uint256 _mintNum) public {
        require(!isPublicMint, "It's public mint, no need whitelist");
        require(isWhitelist[msg.sender], "Not in the whitelist");
        require(
            _mintNum.add(numOfAddressMinted[msg.sender]) <= quotaEachAddress,
            "Cannot mint above limit"
        );
        require(
            _mintNum > 0,
            "number of tokens can not be less than or equal to 0"
        );
        require(
            totalSupply() + _mintNum <= maxSupply,
            "Purchase would exceed max public supply of NFTs"
        );
        require(mintStartTime != 0, "start time not set");
        require(block.timestamp > mintStartTime, "mint hasn't start");
        require(block.timestamp < mintEndTime, "mint has finished");

        numOfAddressMinted[msg.sender] += _mintNum;
        for (uint256 i = 0; i < _mintNum; i++) {
            _safeMint(msg.sender, totalSupply());
        }
    }

    // @notice This function can be called to retrieve the tokenURI
    // @param  tokenId - the unique identifier for one NFT
    // composed token URI
    function tokenURI(uint256 tokenId_)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId_),
            "ERC721Metadata: URI query for nonexistent token"
        );

        return string(abi.encodePacked(baseURI, tokenId_.toString()));
    }

    /* onlyOwner's function */

    function setBaseURI(string memory baseURI_) external {
        require(
            owner() == _msgSender() || operator == _msgSender(),
            "Ownable: caller is not the owner or operator"
        );
        baseURI = baseURI_;
    }

    function setWhitelist(address[] calldata _users) public onlyOwner {
        for (uint256 i = 0; i < _users.length; i++) {
            isWhitelist[_users[i]] = true;
        }
    }

    function setPublicMint(bool _val) external onlyOwner {
        isPublicMint = _val;
    }
}
