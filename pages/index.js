import * as React from "react";
import * as Upload from "~/common/upload";

import WebsitePrototypeWrapper from "~/components/WebsitePrototypeWrapper";

import { css } from "@emotion/react";

const STYLES_FILE_HIDDEN = css`
  height: 1px;
  width: 1px;
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: -1px;
  left: -1px;
`;

const STYLES_BUTTON_PRIMARY = css`
  box-sizing: border-box;
  border-radius: 4px;
  outline: 0;
  border: 0;
  min-height: 40px;
  padding: 4px 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  letter-spacing: 0.2px;
  transition: 200ms ease all;
  overflow-wrap: break-word;
  user-select: none;
  cursor: pointer;
  background-color: blue;
  color: white;

  :focus {
    box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.3);
    background-color: #065ca8;
    outline: 0;
    border: 0;
  }
`;

export const ButtonPrimary = (props) => {
  return (
    <label
      css={STYLES_BUTTON_PRIMARY}
      children={props.children}
      type={props.label}
      htmlFor={props.htmlFor}
      onClick={props.onClick}
    />
  );
};

export default class IndexPage extends React.Component {
  _handleUpload = async (e) => {
    if (e.target.files) {
      console.log(e.target.files[0]);

      const response = await Upload.upload({ file: e.target.files[0] });
      console.log(response);
    }
  };

  render() {
    return (
      <WebsitePrototypeWrapper title="Next-S3" description="https://render.com test">
        <input css={STYLES_FILE_HIDDEN} type="file" id="file" onChange={this._handleUpload} />

        <ButtonPrimary full type="label" htmlFor="file" style={{ marginTop: 24 }}>
          Add file (open console for logs)
        </ButtonPrimary>
      </WebsitePrototypeWrapper>
    );
  }
}
