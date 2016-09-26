import React from 'react';


class Layout extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1>react-issue-viewer</h1>
        </header>
        <article>
          {this.props.children}
        </article>
        <footer>
          &copy; 2016
        </footer>
      </div>
    );
  }
}

export default Layout;
