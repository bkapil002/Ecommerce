import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import catagorys from '../helpers/catgory';
import VCatagery from '../component/VCatagery';
import summaryApi from '../common/index';

const CategeryOfProduct = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectCatagory, setSelectCatagory] = useState({});
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(summaryApi.filterProduct.url, {
        method: summaryApi.filterProduct.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          catagory: filterCategoryList,
        }),
      });

      const dataResponse = await response.json();
      setData(dataResponse?.data || []);
      console.log('Fetched data:', dataResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const headerSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCatagory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCatagory)
      .map((categoryKeyName) => (selectCatagory[categoryKeyName] ? categoryKeyName : null))
      .filter((el) => el);
    setFilterCategoryList(arrayOfCategory);
  }, [selectCatagory]);

  return (
    <div className="container mx-auto p-4">
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-r-slate-500">
              Category
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {catagorys.map((categoryName, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="category"
                    checked={selectCatagory[categoryName?.value]}
                    value={categoryName?.value}
                    id={categoryName?.value}
                    onChange={headerSelectCategory}
                  />
                  <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>
        <div className='mx-auto'>
        <p className = 'font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>
        <div> 
          {loading ? (
            <p>Loading...</p>
          ) : (
            <VCatagery catagory={data} />
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default CategeryOfProduct;
