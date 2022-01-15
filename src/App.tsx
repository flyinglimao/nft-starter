import React from "react";
import { Root, Routes, addPrefetchExcludes } from "react-static";
import { Router } from "@reach/router";
import { Global, css } from "@emotion/react";

import "react-markdown-editor-lite/lib/index.css";

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(["dynamic"]);

function App() {
  return (
    <Root>
      <Global
        styles={css`
          * {
            padding: 0;
            margin: 0;
            font-family: "Cabin", sans-serif;
          }
          .custom-html-style {
            text-align: center;
          }
        `}
      />
      <div className="app">
        <React.Suspense fallback={<em>Loading...</em>}>
          <Router>
            <Routes path="*" />
          </Router>
        </React.Suspense>
      </div>
    </Root>
  );
}

export default App;
