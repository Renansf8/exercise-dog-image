import React from 'react';
import './section.css';

class Section extends React.Component {
  constructor(props) {
    super(props);

    this.renderDogImage = this.renderDogImage.bind(this);
    this.saveDog = this.saveDog.bind(this);

    this.state = {
      dogImage: '',
      loading: true,
      dogObj: [],
    };
  }

  componentDidMount() {
    this.fetchDog();
  }

  async fetchDog() {
    this.setState(
      { loading: true },
      async () => {
        const requestReturn = await fetch('https://dog.ceo/api/breeds/image/random');
        const requestObj = await requestReturn.json();
        this.setState({
          dogImage: requestObj,
          loading: false,
        });
      },
    );
  }

  saveDog() {
    this.setState(({ dogImage, dogObj }) => ({
      dogObj: [...dogObj, dogImage],
    }));

    this.fetchDog();
  }

  renderDogImage() {
    const { dogImage } = this.state;
    return (
      <div className="image-container">
        <img src={ dogImage.message } alt="Dog" />
        <button type="button" onClick={ this.saveDog }>Buscar mais um doguinho</button>
      </div>
    );
  }

  render() {
    const { loading, dogObj } = this.state;
    const loadingElement = <span>Loading...</span>;

    return (
      <div className="image-container">
        <span>
          {dogObj.map((dog) => <img key={ dog.index } src={ dog.message } alt="dog" />)}
        </span>
        {loading ? loadingElement : this.renderDogImage()}
      </div>
    );
  }
}

export default Section;
