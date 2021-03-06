import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import getCitiesByName from '../api/getCitiesByName';
import SearchResult from './SearchResult';
import { BREAKPOINT2, BREAKPOINT1 } from '../config/constants';
import logo from '../images/weather_icon.png';

const NavContainer = styled.div`
  background-color: #2b244d;
  position: fixed;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: ${BREAKPOINT2}px) {
    justify-content: center;
  }
`;

const NavBrand = styled.div`
  display: flex;
  align-items: center;
`;

const NavIcon = styled.img`
  width: 35px;
`;

const NavText = styled.a`
  color: white;
  font-weight: bold;
  text-align: center;

  @media only screen and (max-width: ${BREAKPOINT2}px) {
    display: none;
  }
`;

const SearchContainer = styled.div`
`;

const SearchInput = styled.input`
  padding: 6px;
  margin: 8px 0;
  font-size: 17px;
  border: none;
  background-color: rgba(66 0 82 0.15);

  @media only screen and (max-width: ${BREAKPOINT1}px) {
    width: calc(100% - 65px);
  }
`;

const SearchButton = styled.button`
  padding: 6px 10px;
  margin-top: 8px;
  margin-right: 16px;
  background: #ddd;
  font-size: 17px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #ccc;
  }
`;

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: undefined,
      searchResult: [],
    };

    this.setSearchInput = this.setSearchInput.bind(this);
    this.setSearchResult = this.setSearchResult.bind(this);
  }

  setSearchInput = (event) => {
    if (event.target.value !== '')
      this.setState({ searchInput: event.target.value, searchResult: [] });
  };

  setSearchResult = (result) => {
    this.clearSearchResult();
    for (let i = 0; i < result.length; i++) {
      this.setState(prevState => ({ searchResult: [...prevState.searchResult, result[i]] }));
    }
  };

  clearSearchResult = () => {
    this.setState({ searchResult: [] });
  };

  clearInputValue = (event) => {
    event.target.value = '';
    this.clearSearchResult();
  };

  getCitiesByName = async (event) => {
    event.preventDefault();
    const { searchInput } = this.state;
    if (searchInput && searchInput.trim() !== '') {
      const city = { name: searchInput };
      const { data } = await getCitiesByName(city);
      this.setSearchResult(data);
    }
  };

  render() {
    const { searchInput, searchResult } = this.state;
    const { setCity } = this.props;
    return (
      <>
        <NavContainer>
          <NavBrand>
            <NavIcon src={logo} alt="Logo" />
            <NavText>My Weather App</NavText>
          </NavBrand>

          <SearchContainer>
            <form onSubmit={this.getCitiesByName}>
              <SearchInput
                placeholder="Search"
                type="text"
                name="city"
                onChange={this.setSearchInput}
                onFocus={this.clearInputValue}
              />
              <SearchButton>
                <FontAwesomeIcon icon={faSearch} />
              </SearchButton>
            </form>
          </SearchContainer>

          {searchResult.length !== 0 && (
            <SearchResult result={searchResult} setCity={setCity} clear={this.clearSearchResult} />
          )}
        </NavContainer>
      </>
    );
  }
}

export default NavBar;
