import Head from "next/head";

import * as React from "react";

export default class WebsitePrototypeWrapper extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>{this.props.title}</title>
          <meta name="title" content={this.props.title} />
          <meta name="description" content={this.props.description} />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={this.props.url} />
          <meta property="og:title" content={this.props.title} />
          <meta property="og:description" content={this.props.description} />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={this.props.url} />
          <meta property="twitter:title" content={this.props.title} />
          <meta property="twitter:description" content={this.props.description} />
        </Head>
        {this.props.children}
      </React.Fragment>
    );
  }
}
