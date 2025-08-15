import { useEffect, useState } from "react";
import css from "./App.module.css"
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";


function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["notes", searchQuery, currentPage],
    queryFn: () => fetchNotes({ search: searchQuery, page: currentPage }),
    // enabled: searchQuery !== "",
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
        setCurrentPage(1); 
    }, [searchQuery]);

  const notes = data?.notes || []; 
  const totalPages = data?.totalPages || 0;

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  }

  const handleCreateSuccess = () => {
    closeModal();
    refetch();
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={setSearchQuery} />
        {totalPages > 1 && <Pagination pages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />}
        <button className={css.button} onClick={openModal}>Create note +</button>
      </header>
      {/* {isSuccess && notes.length > 0 && <NoteList notes={notes} />} */}
      {isSuccess && (
        <>
          {notes.length > 0 ? (
            <NoteList notes={notes} />
          ) : (
            <div className={css.emptyResults}>
              {searchQuery ? (
                <p>No notes found for your search "{searchQuery}"</p>
              ) : (
                <p>No notes available. Create your first note!</p>
              )}
            </div>
          )}
        </>
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSuccess={handleCreateSuccess} onCancel={closeModal}/>
        </Modal>
      )}
    </div>
  );
}

export default App

