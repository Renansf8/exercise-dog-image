import React from 'react';
import './section.css';

class Section extends React.Component {
  constructor(props) {
    super(props);

    this.fetchDog = this.fetchDog.bind(this);
    // this.saveDog = this.saveDog.bind(this);

    this.state = {
      dogImage: '',
      // loading: true,
      // dogObj: [],
    };
  }

  componentDidMount() {
    this.fetchDog();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextState.dogImage.message.includes('terrier')) {
  //     return false;
  //   }
  //   return true;
  // }

  // componentDidUpdate() {
  //   localStorage.setItem("dogURL", this.state.data.message);
  //   const dogBreed = this.state.data.message.split("/")[4];
  //   alert(dogBreed);
  // }

  fetchDog() {
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

  // saveDog() {
  //   this.setState(({ dogImage, dogObj }) => ({
  //     dogObj: [...dogObj, dogImage],
  //   }));

  //   this.fetchDog();
  // }

  renderDogImage() {
    const { dogImage } = this.state;
    return (
      <div className="image-container">
        <img src={ dogImage.message } alt="Dog" />
        <button type="button" onClick={ this.fetchDog }>Buscar mais um doguinho</button>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    const loadingElement = <span>Loading...</span>;

    // if (this.state.dogImage === '') return 'loading...';

    return (
      <div className="image-container">
        {loading ? loadingElement : this.renderDogImage()}
      </div>
    );
  }
}

export default Section;
