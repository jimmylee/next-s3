import * as React from "react";

import WebsitePrototypeWrapper from "~/components/WebsitePrototypeWrapper";

import { css } from "@emotion/react";

export default class IndexPage extends React.Component {
  render() {
    return (
      <WebsitePrototypeWrapper title="Next-S3" description="https://render.com test">
        Hello World
      </WebsitePrototypeWrapper>
    );
  }
}
