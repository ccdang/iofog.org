import React from "react";
import { graphql, Link, StaticQuery } from "gatsby";
import config from "../../../data/SiteConfig";

import "./Header.scss";

const Header = ({ menuLinks }) => (
  <header className="header">
    <div className="container">
      <div className="row">
        <div className="col-xl-3 col-lg-2 col-4 logo">
          <Link to="/">
            <img srcSet={config.siteLogo} alt="" />
          </Link>
        </div>

        <nav className="col-xl-6 col-lg-7 col-4 main-nav">
          <button className="menu-opener" />
          <div className="holder">
            {menuLinks.map(link => (
              <Link activeClassName="active" to={link.path} key={link.title}>{link.title}</Link>
            ))}
            <Link activeClassName="active" to="/community">Community</Link>
            <Link activeClassName="active" to="/enterprise">Enterprise</Link>
          </div>
        </nav>

        <div className="col-xl-3 col-lg-3 col-4 search">
          <div className="search__wrapper">
            <button type="submit">submit</button>
            <input type="text" placeholder="Search" />
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default props => (
  <StaticQuery
    query={graphql`
      query IndexQuery1234 {
        allMarkdownRemark{
          group(field: frontmatter___type) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  type
                  version
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const { group } = data.allMarkdownRemark;

      const menuLinks = group.map(item => {
        const { type, version } = item.edges[0].node.frontmatter;

        let path = `${type}${item.edges[0].node.fields.slug}`;

        if (version) {
          path = `${type}/${version}${item.edges[0].node.fields.slug}`;
        }

        return {
          title: type,
          path
        }
      });

      return <Header menuLinks={menuLinks} {...props} />;
    }}
  />
)