import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import axios from 'axios';
import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function CategorySiderBar() {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState('Category');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(
          '/api/products/categories'
        );
        console.log(data);
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, [selected]);

  return (
    <div className="">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">
            Server size
          </RadioGroup.Label>
          <div className="space-y-2 flex flex-col">
            {categories.map((category, index) => (
              <Link
                to={`/menu?category=${category}`}
                key={index}
              >
                <RadioGroup.Option
                  value={category}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? 'ring-2 ring-white ring-opacity-60 ring-offset-2  cursor-pointer hover:scale-110 ease-out duration-300'
                        : ''
                    }
                  ${
                    checked
                      ? 'bg-primary-color text-white'
                      : 'bg-white'
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <React.Fragment>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium  ${
                                checked
                                  ? 'text-white'
                                  : 'text-gray-900'
                              }`}
                            >
                              {category}
                            </RadioGroup.Label>
                          </div>
                        </div>
                        {checked && (
                          <div className="shrink-0 text-white">
                            <CheckIcon className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  )}
                </RadioGroup.Option>
              </Link>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle
        cx={12}
        cy={12}
        r={12}
        fill="#fff"
        opacity="0.2"
      />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
