import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="create-cabin">
          <Button>Create new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="create-cabin">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal((show) => !show)}>
//           <CreateCabinForm
//             onCloseModal={() => setIsOpenModal((show) => !show)}
//           />
//         </Modal>
//       )}
//       ;
//     </div>
//   );
// }

export default AddCabin;
