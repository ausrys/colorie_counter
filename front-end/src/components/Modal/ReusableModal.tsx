import { useDispatch, useSelector } from "react-redux";
import {
  closeAllModals,
  setSearchInput,
} from "../../reducers/modalReducers/modalReducers";
import { RootState } from "../../types/reducersTypes";
import { ReactNode } from "react";
import Button from "../Reusable Components/Button";
type ReusableModalProps = {
  modalTitle: string;
  children: ReactNode;
};
const ReusableModal = (props: ReusableModalProps) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center h-screen px-4">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all h-3/4 w-3/4 flex flex-col">
            <div className="bg-blue-200 px-5 py-4 flex justify-center items-center">
              <h2 className="text-2xl font-semibold text-blue-800 flex-1 ml-[42px]">
                {props.modalTitle}
              </h2>
              <Button
                onClick={() => dispatch(closeAllModals())}
                focus={"default"}
                variant={"exit"}
                animation={"pressAnimation"}
              >
                X
              </Button>
            </div>

            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReusableModal;
