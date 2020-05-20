import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { uploadImage } from '../../utils/ImagesService.jsx';
import {
  createTag,
  getAllTags,
  getTagsByName,
} from '../../utils/TagService.jsx';
import styles from './LoadFileModal.css';

const LoadFileModal = ({
  show,
  handleClose,
  showToast,
  setToastMessage,
  addImageToPage,
}) => {
  const [image, setImage] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [tagName, setTagName] = useState('');

  const handleInputOnchange = async (e) => {
    const name = e.target.value;
    setTagName(name);
    if (name === '') {
      fetchTags();
      return;
    }
    const res = await getTagsByName(name);
    if (res.status === 200) setAllTags(res.data);
  };

  const fetchTags = async () => {
    const res = await getAllTags();
    setAllTags(res.data.content);
  };

  const addTag = (tag) => {
    setActiveTags([...activeTags, tag]);
  };

  const deleteTag = (tagId) => {
    setActiveTags(activeTags.filter((tag) => tag.id !== tagId));
  };

  const isDisabled = (tagId) => activeTags.some((tag) => tag.id === tagId);

  const fileOnChange = (e) => {
    setImage(e.target.files[0]);
  };

  const createTagOnClick = async () => {
    const res = await createTag(tagName);
    if (res.status === 200) {
      setActiveTags([...activeTags, res.data]);
      setAllTags([res.data]);
    }
  };

  const isCreateDisabled = () =>
    allTags.some((tag) => tag.name === tagName) || !tagName;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    const tags = activeTags.map((tag) => tag.id);
    const res = await uploadImage(formData, tags);
    if (res.status !== 200) {
      setToastMessage(res.message);
    } else {
      addImageToPage(res);
    }
    handleClose();
    setToastMessage('Image is added!');
    showToast(true);
  };

  useEffect(() => {
    fetchTags();
  }, []);
  useEffect(() => {
    setActiveTags([]);
    setTagName('');
    setImage(false);
  }, [show]);
  return (
    <div>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="mb-3">
              <Form.File id="formcheck-api-regular">
                <Form.File.Label>Choose image</Form.File.Label>
                <Form.File.Input onChange={fileOnChange} />
              </Form.File>
            </div>
          </Form>
          <h5>Tags:</h5>
          {!activeTags.length && <span>Add tags...</span>}
          {activeTags.map((tag) => (
            <Button
              className={styles.Tag}
              variant="outline-secondary"
              key={`tag active modal ${tag.id}`}
              onClick={() => deleteTag(tag.id)}
            >
              {tag.name}
            </Button>
          ))}
          <InputGroup className="mb-3">
            <FormControl
              value={tagName}
              onChange={handleInputOnchange}
              placeholder="Enter tag"
            />
            <InputGroup.Append>
              <Button disabled={isCreateDisabled()} onClick={createTagOnClick}>
                Create
              </Button>
            </InputGroup.Append>
          </InputGroup>
          {allTags.map((tag) => (
            <Button
              className={styles.Tag}
              variant="outline-secondary"
              key={`tag modal ${tag.id}`}
              onClick={() => addTag(tag)}
              disabled={isDisabled(tag.id)}
            >
              {tag.name}
            </Button>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button disabled={!image} onClick={handleSubmit} variant="primary">
            Add image
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoadFileModal;
