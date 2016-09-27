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
      errorMessage,
    } = this.props;

    return (
      <form onSubmit={this.trySearch} className="search-form">
        <label className="search-form__label">username</label>
        <input type="text" value={username} onChange={this.onChangeUsername} className="search-form__input" />
        <label className="search-form__label">repository</label>
        <input type="text" value={repository} disabled={!username} onChange={this.onChangeRepository} className="search-form__input" />
        <button type="submit" disabled={isLoading} className="search-form__button">{isLoading ? 'Loading' : 'Search'}</button>
        {error && (<p className="search-form__error">An error has occurred{errorMessage ? ` — ${errorMessage}` : ''}. Please, try again…</p>)}
      </form>
    );
  }

}

SearchForm.propTypes = {
  onSearch: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  error: React.PropTypes.bool.isRequired,
  errorMessage: React.PropTypes.string.isRequired,
};

export default SearchForm;
