import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sweet from 'sweetalert';
import { withProps, compose } from 'recompose';
import styled from 'react-emotion';
import download from 'downloadjs';

import 'sweetalert/dist/sweetalert.css';

import Maker from './Maker';

let Card = ({ callUpload, download, upload, className }) => (
  <div className={ className + ' container text-center' }>
    <Maker/>
    <input name="upl" style={{ display: 'none' }} id="upload_box" type="file" accept="image/*" onChange={upload} />
    <button id="upload" onClick={callUpload} className="btn btn-primary">
      Upload Poster
    </button>
    <button onClick={(e) => download(e)} id="download_btn" className="btn btn-sucess">
      Download
    </button>
  </div>
);
//
// Card = styled(Card)`
//
// `;

let filename = '';

const injectProps = props => ({
  callUpload: () => {
    filename = `camp-poster-${Math.floor(Math.random() * (9999 - 1111) + 1111)}`
    Sweet({
      title: "Poster name",
      text: "Please fill your poster name: ",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      confirmButtonColor: '#f96b24',
      buttons: {
        cancel: true,
        text: "Cancel",
        value: null,
        visible: false,
        className: "",
        closeModal: true,
      },
      animation: "pop",
      inputPlaceholder: filename,
      showLoaderOnConfirm: true
    }, (input) => {
      if (input !== false && input !== null) {
        filename = input;
        document.getElementById('upload_box').click();
      }
      Sweet.close();
    })
  },
  upload: (e) => {
    let input = e.target;
    if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
          // $('#blah').attr('src', e.target.result);
          props.poster.src = e.target.result;
      }

      reader.readAsDataURL(input.files[0]);

      document.getElementById('download_btn').style.display = 'initial';
      Sweet("Uploaded!", "", "success");
    }
  },
  download: (e) => {
    let link = props.canvas.toDataURL('image/jpeg');
    // this.setState({ href: link });
    if (filename !== false && filename !== '' && filename !== null && filename !== undefined) {
      download(link, `${filename}_${new Date().getTime()}.jpg`, 'image/jpeg');
    } else {
      filename = `camp-poster-${Math.floor(Math.random() * (9999 - 1111) + 1111)}`
      download(link, `${filename}_${new Date().getTime()}.jpg`, 'image/jpeg');
    }
    // window.location = link.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    e.preventDefault();
  },
})

const mapStateToProps = state => ({
  canvas: state.app.canvas,
  poster: state.app.poster,
})


const enhance = compose(
  connect(mapStateToProps),
  withProps(injectProps),
)(Card)


export default enhance;
