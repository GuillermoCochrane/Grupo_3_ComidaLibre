import React, {Fragment, useState, useEffect} from 'react';
import UserRow from './UserRow';
import UserHeader from './UserHeader';
import './allUsers.css';

function AllUsers() {

    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [usersQuantity, setUsersQuantity] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
		
		const endpoint = `http://localhost:3000/api/users/?page=${currentPage}`
        setLoading(true);
		
        fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            setUsersList(data.users);
            setUsersQuantity(data.count);
            setLoading(false);
        })
        .catch(error => console.log(error));
		
	}, [currentPage]);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    
    const onPrevClick = () => {    
        setCurrentPage( (prev) => prev-1);
    }
    
    const onNextClick = () => {
        setCurrentPage(prev=>prev+1);
        }
    
    const handlePageClick = (e) => {
        onPageChange(Number(e.target.id));
    }
    
    let totalPages = 1
    if (usersQuantity !== 0){
    let p = 0
    if (usersQuantity % 10 !== 0){
        p = Math.trunc(usersQuantity/10) + 1
    }else{
        p = usersQuantity/10
    }
    totalPages = p;
    }

    const pages = [];
    for(let i=1 ; i<=totalPages; i++){
        pages.push(i);
    }


  return (
    <Fragment>
        <div className="card shadow mb-4">
            <div className="card-body">
                {!loading ?
                <div className="table-responsive">
                    <caption>
                        USUARIOS
                    </caption>
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <UserHeader/>
                        </thead>
                        <tbody>
                            {
                                usersList.map((item, i) => {
                                    return <UserRow {...item} key = {`userRow-${i}`} />
                                    })
                            }
                        </tbody>
                    </table>

                    <div className='pageNumbers-container'>
                        <ul className="pageNumbers"> 
                            <li>
                                <button onClick={onPrevClick} disabled={currentPage === pages[0]}>
                                    <i class="fas fa-angle-double-left" ></i>
                                </button>
                            </li>
                            
                            {
                                pages.map(page => { 
                                return (
                                        <li key={page} id={page} onClick={handlePageClick} 
                                            className={currentPage===page ? 'active' : null}>
                                            {page}
                                        </li>
                                        );
                                    })
                            }

                            <li>
                                <button onClick={onNextClick} disabled={currentPage === pages[pages.length-1]}>
                                    <i class="fas fa-angle-double-right" ></i>
                                </button>
                            </li>
                    </ul>
                    </div>
                </div>
                : <div> Cargando... </div>}
            </div>
        </div>
    </Fragment>
    )
}

export default AllUsers;