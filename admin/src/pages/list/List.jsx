import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setLoading(false);
      setList(response.data.data);
    } else {
      setLoading(false);
      toast.error("Error");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      {loading && <h1 >Loading...</h1>}
      {!loading && (
        <div className="list-table">
          <div className="list-table-format title">
            <p>Image</p>
            <p>Name</p>
            <p>Category</p>
            <p>Price</p>
            <p>Action</p>
          </div>
          {list?.length < 1 ? (
            <h4>No Items Found</h4>
          ) : (
            list.map((item, index) => {
              return (
                <div key={index} className="list-table-format">
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>₹{item.price}</p>
                  <p onClick={() => removeFood(item._id)} className="cursor">
                    X
                  </p>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default List;
