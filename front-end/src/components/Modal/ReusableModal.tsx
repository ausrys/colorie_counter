import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchInput } from "../../reducers/modalReducers/modalReducers";
const ReusableModal = (props: any) => {
  const isSearchModalOpen = useSelector(
    (state: any) => state.modal.searchModal
  );
  const searchInput = useSelector((state: any) => state.modal.searchInput);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center h-screen px-4">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all h-3/4 w-3/4 flex flex-col">
            <div className="bg-gray-100 px-4 py-3">
              <h2 className="text-lg font-semibold text-gray-800">
                {props.modalTitle}
              </h2>
            </div>
            {isSearchModalOpen === true ? (
              <div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={(event) => {
                    dispatch(setSearchInput(event.target.value));
                  }}
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
            ) : null}
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReusableModal;
