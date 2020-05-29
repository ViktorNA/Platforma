import React, { useEffect, useState } from 'react';
import { getTests } from '../../utils/TestService.jsx';
import { Spinner, Table } from 'react-bootstrap';
import styles from './DataView.css';

const DataView = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await getTests();
    if (res.status === 200) setData(res.data);
    console.log(res);
    setIsLoading(false);
  };
  return (
    <div className={styles.container}>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Test type</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {data.map((test) => (
              <tr key={test.id}>
                <td>{test.id}</td>
                <td>{test.testType}</td>
                <td>{test.duration}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default DataView;
