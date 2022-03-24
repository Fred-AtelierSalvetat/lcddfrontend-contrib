import React, { FC } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import { useDropzone } from 'react-dropzone';

import PropTypes from 'prop-types';
import { ReactComponent as UploadIcon } from '~/assets/icons/upload_94px.svg';
import { ReactComponent as FileIcon } from '~/assets/icons/insert_drive_file_24px.svg';
import { ReactComponent as DeleteIcon } from '~/assets/icons/delete_24px.svg';

const uploadsPropTypes = {
    value: PropTypes.arrayOf(PropTypes.instanceOf(File)).isRequired,
    setValue: PropTypes.func.isRequired,
};

const Uploads: FC<PropTypes.InferProps<typeof uploadsPropTypes>> = ({ value = [], setValue }) => {
    const onDrop = (acceptedFiles) => {
        setValue([...value, ...acceptedFiles]);
    };
    const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 10, maxSize: 7864320 });

    const deleteUpload = (toDelete) => {
        setValue(value.filter((upload) => upload !== toDelete));
    };

    return (
        <Form.Row>
            <Col className="rightborder" xs={4} sm={6}>
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <UploadIcon />
                    <p>Pour télécharger, glisser et déposer vos fichiers ici</p>
                    <p>ou</p>
                    <a>Télécharger depuis votre ordinateur</a>
                </div>
            </Col>
            <Col xs={8} sm={6}>
                <div className="list">
                    {!!value &&
                        value.map(
                            (file) =>
                                file && (
                                    <div key={file.name} className="item">
                                        <div className="upload-item-header flex-shrink-1">
                                            <FileIcon />
                                            <div className="flex-shrink-1 wrap-anywhere">{file.name}</div>
                                        </div>
                                        <DeleteIcon className="action-icon" onClick={() => deleteUpload(file)} />
                                    </div>
                                ),
                        )}
                </div>
            </Col>
        </Form.Row>
    );
};

Uploads.propTypes = uploadsPropTypes;

export default Uploads;
