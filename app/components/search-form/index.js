import React from 'react';


class SearchForm extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeRepository = this.onChangeRepository.bind(this);
    this.trySearch = this.trySearch.bind(this);

    this.state = {
      username: '',
      repository: '',
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeRepository(e) {
    this.setState({
      repository: e.target.value,
    });
  }

  trySearch(event) {
    const {
      username,
      repository,
    } = this.state;

    event.preventDefault();

    this.props.onSearch(username, repository);
  }

  render() {
    const {
      username,
      repository,
    } = this.state;
    const {
      isLoading,
      error,
    } = this.props

    return (
      <form onSubmit={this.trySearch}>
        <label>username</label>
        <input type="text" value={username} onChange={this.onChangeUsername} />
        <label>repository</label>
        <input type="text" value={repository} disabled={!username} onChange={this.onChangeRepository} />
        <button type="submit" disabled={isLoading}>{isLoading ? 'Loading' : 'Search'}</button>
        {error && (<p>Some error occurs. Please, try again</p>)}
      </form>
    );
  }

}

SearchForm.propTypes = {
  onSearch: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  error: React.PropTypes.bool.isRequired,
};

export default SearchForm;
