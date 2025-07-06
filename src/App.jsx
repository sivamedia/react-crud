import { useState, useEffect } from 'react';
import useFetch from './useFetch';
import Table from './Table';
import './App.css';

function App() {
  const [usersData, setUsersData] = useState(null);
  const [request, setRequest] = useState();

  const { loading, error, data, fetchData } = useFetch();
  const TableHead = ['id', 'name', 'email', 'mobile', 'actions'];

  useEffect(() => {
    fetchData('https://686a44162af1d945cea39f6b.mockapi.io/music/users', {
      methos: 'GET',
    });
  }, []);

  useEffect(() => {
    if (data) {
      setUsersData(data);
    }
  }, [data]);

  const fetchUsers = () => {
    fetchData('https://686a44162af1d945cea39f6b.mockapi.io/music/users', {
      methos: 'GET',
    });
  };

  return (
    <div>
      <h2>USERS CRUD</h2>
      <button onClick={fetchUsers}>Click to fetch </button>

      {/* <pre>{usersData && JSON.stringify(usersData, null, 2)}</pre> */}

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {usersData && <Table tableHead={TableHead} tableData={usersData} />}
    </div>
  );
}

export default App;
