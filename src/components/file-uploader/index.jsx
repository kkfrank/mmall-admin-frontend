import React, { Component } from 'react';
import FileUpload from './react-fileupload.jsx';
import './index.scss'

export default class FileUploader extends Component{
    render(){
        const options={
            baseUrl         :'/manage/product/upload.do',
            fileFieldName   : 'upload_file',
            dataType        : 'json',
            chooseAndUpload : true,
            uploadSuccess   : (res) => {
                this.props.onSuccess(res.data);
            },
            uploadError     : (err) => {
                this.props.onError(err.message || '上传图片出错啦');
            }
        }
        return (
            <FileUpload options={options} className='pic-detail-box'>
                <button className="btn" ref="chooseAndUpload">请选择图片</button>
            </FileUpload>
        )           
    }
}
