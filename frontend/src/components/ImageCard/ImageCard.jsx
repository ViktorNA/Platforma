import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  assignTagToImage,
  deleteTagFromImage,
  getImageById,
} from '../../utils/ImagesService.jsx';
import { InputGroup, Button, FormControl } from 'react-bootstrap';
import styles from './ImageCard.css';
import { createTag, getTagsByName } from '../../utils/TagService.jsx';

const ImageCard = () => {
  const { imageId } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [activeTags, setActiveTags] = useState([]);
  const [tagName, setTagName] = useState('');
  const [filteredTags, setFilteredTags] = useState([]);
  const [isAddTag, setIsAddTag] = useState(true);

  const handleInputOnchange = async (e) => {
    const name = e.target.value;
    setTagName(name);
    setIsAddTag(filteredTags.some((tag) => tag.name === name));
    if (name === '') {
      setFilteredTags([]);
      return;
    }
    const res = await getTagsByName(name);
    if (res.status === 200) setFilteredTags(res.data);
  };

  const deleteTag = async (tagId) => {
    const res = await deleteTagFromImage(imageId, tagId);
    if (res.status === 200) {
      setActiveTags(activeTags.filter((tag) => tag.id !== tagId));
    }
  };

  const addTag = async (tagId) => {
    const res = await assignTagToImage(imageId, tagId);
    setActiveTags(res.data.tags);
    setTagName('');
    setFilteredTags([]);
  };

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    if (tagName === '') return;
    if (isAddTag) {
      const tag = filteredTags.find((tag) => tag.name === tagName);
      addTag(tag.id);
      setTagName('');
      return;
    }
    const res = await createTag(tagName);
    addTag(res.data.id);
    setTagName('');
    setIsAddTag(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getImageById(imageId);
      const { imageUrl, tags } = res.data;
      setImageUrl(imageUrl);
      setActiveTags(tags);
    };
    fetchData();
  }, [imageId]);
  return (
    <div className={styles.Container}>
      <div>
        <h5>Tags:</h5>
        {activeTags.map((tag) => (
          <Button
            onClick={(e) => deleteTag(tag.id)}
            variant="outline-secondary"
            key={tag.id}
          >
            {tag.name}
          </Button>
        ))}
        <div className={styles.Form}>
          <InputGroup className="mb-3">
            <FormControl
              value={tagName}
              onChange={handleInputOnchange}
              placeholder="Enter tag"
            />
            <InputGroup.Append>
              <Button onClick={handleInputSubmit}>
                {isAddTag ? 'Add' : 'Create'}
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
        {filteredTags.map((tag) => (
          <Button
            onClick={(e) => addTag(tag.id)}
            variant="outline-secondary"
            key={tag.id}
          >
            {tag.name}
          </Button>
        ))}
      </div>
      <div className={styles.ImageContainer}>
        <img className={styles.Image} src={imageUrl} alt={'meme'} />
      </div>
    </div>
  );
};

export default ImageCard;
