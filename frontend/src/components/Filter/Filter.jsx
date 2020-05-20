import React, { useEffect, useState } from 'react';
import { getTagById, getTagsByName } from '../../utils/TagService.jsx';
import { useHistory } from 'react-router-dom';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import styles from '../ImageCard/ImageCard.css';

const Filter = ({ filters, baseUrl }) => {
  const [activeTags, setActiveTags] = useState([]);
  const [tagName, setTagName] = useState('');
  const [filteredTags, setFilteredTags] = useState([]);
  const history = useHistory();

  const createNewUrl = (filters = []) =>
    filters.length > 0
      ? `${baseUrl}?filter=${filters.join('&filter=')}`
      : baseUrl;

  const handleInputOnchange = async (e) => {
    const name = e.target.value;
    setTagName(name);
    if (name === '') {
      setFilteredTags([]);
      return;
    }
    const res = await getTagsByName(name);
    if (res.status === 200) setFilteredTags(res.data);
  };

  const handleDelete = (e, tagToDel) => {
    const newFilters = filters.filter((filter) => filter !== tagToDel);
    history.push(createNewUrl(newFilters));
  };

  const handleAddTag = (e, tag) => {
    if (!filters.some((filter) => filter === tag.id)) {
      setActiveTags([...activeTags, tag]);
      history.push(createNewUrl([...filters, tag.id]));
    }
  };

  const isDisabled = (tagId) => {
    return filters.some((filter) => filter === tagId);
  };

  const resetFilters = () => {
    history.push(createNewUrl());
    setTagName('');
    setFilteredTags([]);
  };

  useEffect(() => {
    const getIds = async () => {
      const newActiveTags = await Promise.all(
        filters.map(async (filter) => {
          const tag = activeTags.find((tag) => tag.id === filter);
          if (tag) return tag;
          const res = await getTagById(filter);
          if (res.status === 200) return res.data;
        })
      );
      setActiveTags(newActiveTags);
    };
    getIds();
  }, [filters]);

  return (
    <div className={styles.Container}>
      <div>
        <h5>Filters:</h5>
        {activeTags.map((tag) => (
          <Button
            variant="outline-secondary"
            key={`active tag${tag.id}`}
            onClick={(e) => handleDelete(e, tag.id)}
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
            {!!activeTags.length && (
              <InputGroup.Append>
                <Button variant="outline-danger" onClick={resetFilters}>
                  Reset filters
                </Button>
              </InputGroup.Append>
            )}
          </InputGroup>
        </div>
        {filteredTags.map((tag) => (
          <Button
            variant="outline-secondary"
            key={tag.id}
            onClick={(e) => handleAddTag(e, tag)}
            disabled={isDisabled(tag.id)}
          >
            {tag.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Filter;
