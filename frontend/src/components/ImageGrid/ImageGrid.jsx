import React, { useEffect, useState } from 'react';
import { getImages } from '../../utils/ImagesService.jsx';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link, useParams, useLocation } from 'react-router-dom';
import styles from './ImageGrid.css';
import { Toast, Card, Button } from 'react-bootstrap';
import Pagination from '../../Pagination/Pagination.jsx';
import Filter from '../Filter/Filter.jsx';
import LoadFileModal from '../LoadFileModal/LoadFileModal.jsx';
import { getIsAdmin } from '../../utils/LocalStorageService.jsx';

function ImageGrid() {
  const pageSize = 9;
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [show, setShow] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { pageNumber: pageNumberString } = useParams();
  const pageNumber = Number(pageNumberString) || 1;
  const [filterTags, setFilterTags] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { search, pathname } = useLocation();

  const parseFilters = () => {
    const queryParams = search.substring(1).split('&');
    return queryParams.map((param) => {
      const filter = param.split('=');
      if (filter[0] === 'filter') return Number(filter[1]);
    });
  };

  const fetchData = async (page) => {
    const res = await getImages(page, pageSize, 'id', filterTags);
    if (res.status === 200) {
      setImages(res.data.content);
      setTotalPages(res.data.totalPages || 1);
      window.scrollTo(0, 0);
    } else {
      setToastMessage(res.message);
      setShow(true);
    }
  };

  useEffect(() => {
    if (search) {
      setFilterTags(parseFilters());
    } else setFilterTags([]);
  }, [search]);

  useEffect(() => {
    fetchData(pageNumber - 1);
  }, [pageNumber]);

  useEffect(() => {
    fetchData(pageNumber - 1);
  }, [filterTags]);

  const addImageToPage = async (res) => {
    if (images.length < pageSize) {
      setImages([...images, res.data]);
    } else {
      setTotalPages(totalPages + 1);
    }
  };
  return (
    <div className={styles.Container}>
      <Filter filters={filterTags} baseUrl={'/images'} />
      <div className={styles.Grid}>
        {images.map((image) => (
          <Card
            className={styles.Item}
            key={image.id}
            style={{ width: '18rem' }}
          >
            <div className={styles.Image}>
              <Card.Img src={image.imageUrl} />
            </div>
            <div className={styles.ItemBody}>
              <Card.Body>
                <Card.Text>
                  {image.tags.map((tag) => (
                    <Link
                      key={`tag${tag.id}`}
                      to={{ pathname: `/images/1`, search: `filter=${tag.id}` }}
                    >
                      #{tag.name}{' '}
                    </Link>
                  ))}
                  {!image.tags.length && <br />}
                </Card.Text>
                <Link to={`/image/${image.id}`}>
                  <Button variant="primary">Edit</Button>
                </Link>
              </Card.Body>
            </div>
          </Card>
        ))}
      </div>

      {!getIsAdmin() && (
        <div className={styles.UploadContainer}>
          <LoadFileModal
            show={showModal}
            handleClose={() => setShowModal(false)}
            showToast={setShow}
            setToastMessage={setToastMessage}
            addImageToPage={addImageToPage}
          />
          <Fab
            onClick={() => setShowModal(true)}
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <AddIcon />
          </Fab>
        </div>
      )}

      <div className={styles.PaginationContainer}>
        <Pagination
          baseUrl={'/images'}
          currentPage={pageNumber}
          totalPages={totalPages}
        />
      </div>

      <div className={styles.Toast}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <strong className="mr-auto">{toastMessage}</strong>
          </Toast.Header>
        </Toast>
      </div>
    </div>
  );
}

export default ImageGrid;
