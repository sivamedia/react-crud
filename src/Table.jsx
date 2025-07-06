import './Table.css';
import { useState, useEffect } from 'react';
import useFetch from './useFetch';

const Table = ({ tableHead, tableData }) => {
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(false);
  const [editData, setEditData] = useState({});

  const { loading, error, data, fetchData } = useFetch();

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const editHandler = (index) => {
    console.log(index);
    setEditData({ ...tableData[index] });
    setEdit(true);
    setEditIndex(index);
  };

  const editRecordHandler = (event) => {
    const { name, value } = event.target;
    setEditData({ ...editData, [name]: value });
  };

  const submitHandler = () => {
    console.log(editData);
    setEdit(false);
    setEditIndex(null);
    fetchData(
      'https://686a44162af1d945cea39f6b.mockapi.io/music/users/' + editData.id,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      }
    );
  };

  const deleteHandler = (id) => {
    console.log(id);
    fetchData('https://686a44162af1d945cea39f6b.mockapi.io/music/users/' + id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  };
  return (
    <>
      <table>
        <tbody>
          <tr>
            {tableHead.map((key, i) => (
              <th key={key}>{key}</th>
            ))}
          </tr>

          {tableData.map((user, i) => {
            return edit && i == editIndex ? (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <input
                    type="text"
                    onChange={(event) => {
                      editRecordHandler(event);
                    }}
                    value={editData.name}
                    name={tableHead[1]}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(event) => {
                      editRecordHandler(event);
                    }}
                    value={editData.email}
                    name={tableHead[2]}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(event) => {
                      editRecordHandler(event);
                    }}
                    value={editData.mobile}
                    name={tableHead[3]}
                  />
                </td>
                <td className="actions">
                  <span
                    onClick={() => {
                      submitHandler(i);
                    }}
                  >
                    submit
                  </span>
                  <span
                    onClick={() => {
                      deleteHandler(user.id);
                    }}
                  >
                    delete
                  </span>
                </td>
              </tr>
            ) : (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td className="actions">
                  <span
                    onClick={() => {
                      editHandler(i);
                    }}
                  >
                    edit
                  </span>
                  <span
                    onClick={() => {
                      deleteHandler(user.id);
                    }}
                  >
                    delete
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
