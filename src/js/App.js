import React, { Component } from 'react';
import PageStart from './PageStart';
import PageGame from './PageGame';
import PageFinish from './PageFinish';
import PageProduct from './PageProduct';
import PreloadAssets from './PreloadAssets';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'START',
      result: null,
    }

    this.onStart = this.onStart.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.onGoProduct = this.onGoProduct.bind(this);
    this.onOpenMainLink = this.onOpenMainLink.bind(this);
  }

  componentDidMount() {
    
    this.nextPageTimeout = setTimeout(() => {
      this.onStart();
    }, 7000)
  }

  onStart() {
    clearTimeout(this.nextPageTimeout);
    this.setState({
      page: 'GAME',
    })
  }

  onFinish(result) {
    this.setState({
      page: 'FINISH',
      result: result,
    })
    this.nextPageTimeout = setTimeout(() => {
      this.onGoProduct();
    }, 5000)
  }

  onGoProduct() {
    clearTimeout(this.nextPageTimeout);
    this.setState({
      page: 'PRODUCT',
    })
  }

  onOpenMainLink() {
    if (window.parent) window.parent.postMessage('banner.redirect', '*');
  }

  render() {
    return (
      <div className="app-container">
        <div className="pages">
          <PreloadAssets />
          {(this.state.page==='START') && <PageStart onClick={this.onStart} />}
          {(this.state.page==='GAME') && <PageGame onFinish={this.onFinish} />}
          {(this.state.page==='FINISH') && <PageFinish onClick={this.onGoProduct} time={this.state.result} />}
          {(this.state.page==='PRODUCT') && <PageProduct onClick={this.onOpenMainLink} />}
        </div>
      </div>
    );
  }
}

export default App;
