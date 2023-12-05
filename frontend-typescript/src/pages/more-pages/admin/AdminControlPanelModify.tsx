import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import IProduct from '../../../types/IProduct';
import AdminProductService from '../../../services/admin/AdminProductService';
import { useNavigate, useParams } from 'react-router-dom';
import designesis from '../../../assets/js/designesia';
import ThumbNailService from '../../../services/product/ThumbNailService';
import IThumbNail from '../../../types/IThumbNail';
import { ToastContainer, toast } from 'react-toastify';

function AdminControlPanelModify() {
    useEffect(() => {
        designesis();
    }, []);
    // TODO: 변수 정의
    // TODO: adminProductList 배열 변수
    let [adminProductList, setAdminProductList] = useState<Array<IProduct>>([]);
    let [tag, setTag] = useState<Array<string>>([]);

    // TODO: 할인율 수정할 adminProduct 변수
    // initialAdminProduct 객체 초기화
    const initialAdminProduct = {
        pid: '',
        name: '',
        shortDescription: '',
        imgUrl: '',
        price: 0,
        finalPrice: 0,
        tag: '',
        discount: 0,
        uuid: '',
    };
    const [adminProduct, setAdminProduct] = useState<IProduct>(initialAdminProduct);

    // 검색어 변수
    const [searchName, setSearchName] = useState<string>('');
    const [selectBox, setSelectBox] = useState<string>('');

    // 강제페이지 이동 함수
    let navigate = useNavigate();
    // 화면에 수정 성공에 메세지 찍기 변수
    const [message, setMessage] = useState<string>('');

    // TODO : 공통 변수(필수) : page(현재 페이지), count(총 페이지 건수) , pageSize(3,6,9 배열 : 1페이지 당 건수)
    const [page, setPage] = useState<number>(1); // 현재 페이지 번호        : 최초값 1
    const [count, setCount] = useState<number>(1); // 총페이지 건수         : 최초값 1
    const [pageSize, setPageSize] = useState<number>(20); // 1페이지당 개수 : 최초값 20

    const initialFileDb = {
        uuid: null,
        fileUrl: '',
    };

    const [uploadFileDb, setUploadFileDb] = useState<IThumbNail>(initialFileDb);
    const [selectedFiles, setSelectedFiles] = useState<FileList>();
    const [previewImage, setPreviewImage] = useState<string | undefined>(uploadFileDb.fileUrl);

    // TODO: 함수 정의
    // TODO : Pagenation 수동 바인딩
    // TODO : 페이지 번호를 누르면 -> page 변수에 값 저장
    const handlePageChange = (event: any, value: number) => {
        // value == 화면의 페이지번호
        setPage(value);
    };

    // todo : 첫번째 실행
    useEffect(() => {
        reteiveAdminProductList();
    }, [page, pageSize]);

    // todo : 상품 목록 전체조회
    const reteiveAdminProductList = () => {
        AdminProductService.getAllByTag(searchName, selectBox, page - 1, pageSize)
            .then((response: any) => {
                const { product, tag, totalPages } = response.data;
                setAdminProductList(product);
                setTag(tag);
                // Todo : 페이징 처리
                setCount(totalPages);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    // todo: 상세조회 함수
    const getAdminProduct = (pid: string) => {
        AdminProductService.get(pid) // 벡엔드로 상세조회 요청
            .then((response: any) => {
                setAdminProduct(response.data);
                getFileDb(response.data.uuid);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    // Todo : 할인율 수동 바인딩
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        if (value >= 0) {
            setAdminProduct({ ...adminProduct, [name]: value });
        }
    };

    // todo: 할인율 수정 버튼 온클릭 함수
    const updateFileDb = () => {
        let currentFile = selectedFiles?.[0];

        if (currentFile == null) {
            return updateProductDiscount(uploadFileDb.uuid);
        }

        ThumbNailService.updateFileDb(uploadFileDb, currentFile)
            .then((response: any) => {
                updateProductDiscount(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
                toastMessage('상품 수정중 문제가 발생하였습니다. 개발자에게 문의해주세요');
            });
    };

    // todo: 할인율 수정 버튼 온클릭 함수
    const updateProductDiscount = (uuid: any) => {
        let data = {
            pid: adminProduct.pid,
            name: adminProduct.name,
            shortDescription: adminProduct.shortDescription,
            imgUrl: adminProduct.imgUrl,
            price: adminProduct.price,
            finalPrice: (adminProduct.price * (100 - adminProduct.discount)) / 100,
            tag: adminProduct.tag,
            discount: adminProduct.discount,
            uuid: uuid,
        };

        AdminProductService.update(data.pid, data) // 백엔드로 수정 요청
            .then((response: any) => {
                alert('상품이 수정되었습니다.');
                window.location.reload();
            })
            .catch((e: Error) => {
                if ('Request failed with status code 400' == e.message) {
                    toastMessage('상품 수정을 해주세요.');
                } else {
                    toastMessage('서버 에러가 발생하였습니다. 개발자에게 문의해주세요');
                }
                console.log(e);
            });
    };

    // todo: 상품 삭제 버튼 온클릭 함수
    const deleteProduct = () => {
        // Todo : 상품 삭제
        AdminProductService.remove(adminProduct.pid) // 벡엔드로 삭제요청
            .then((response: any) => {
            })
            .catch((e: Error) => {
                console.log(e);
            });

        // Todo : 썸네일 삭제
        ThumbNailService.deleteFile(adminProduct.uuid)
            .then((response: any) => {
                toastMessage('상품이 삭제되었습니다.');
                reteiveAdminProductList();
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const toastMessage = (message: string) => {
        toast.info(
            <div>
                <div>{message}</div>
                <div style={{ whiteSpace: 'pre-line' }}>{adminProduct.name}</div>
            </div>,
            {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            }
        );
    };

    //  검색어 수동 바인딩
    const onChangeSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    //  Select 박스 태그 수동 바인딩
    const onChangeSelectBox = (e: any) => {
        const selectBox = e.target.value;

        setSelectBox(selectBox);
    };

    //Todo : 이미지 미리보기
    const getFileDb = (uuid: string) => {
        ThumbNailService.getFileDb(uuid)
            .then((response: any) => {
                setUploadFileDb(response.data);
                setPreviewImage(response.data.fileUrl); // 수정 전 이미지를 먼저 미리보기에 표시
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const selectFile = (event: any) => {
        setSelectedFiles(event.target.files as FileList);

        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div className="no-bottom no-top" id="content">
                <div id="top"></div>
                {/* <!-- 목차 section 시작 --> */}
                <section id="subheader" className="jarallax">
                    <img
                        src={require('../../../assets/images/background/bg-grid.webp')}
                        className="jarallax-img"
                        alt=""
                    />
                    <div className="container z-1000">
                        <div className="row">
                            {/* 뱃지 시작 */}
                            <div className="col-lg-12">
                                <div className="subtitle wow fadeInUp mb-3">Admin</div>
                            </div>
                            {/* 뱃지 끝 */}

                            {/* 제목 시작 */}
                            <div className="col-lg-6">
                                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                                    상품 조회/수정 페이지
                                </h2>
                            </div>
                            {/* 제목 끝 */}

                            {/* 검색어 입력창 시작 */}
                            <div className="row mt-5 justify-content-center">
                                {/* w-50 : 크기 조정, mx-auto : 중앙정렬(margin: 0 auto), justify-content-center */}
                                <div className="col-12 w-50 input-group mb-3" id="form_sb">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="게임 이름을 입력해 주세요"
                                        value={searchName}
                                        onChange={onChangeSearchName}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            className="btn btn-outline-primary overflow-hidden"
                                            type="button"
                                            onClick={reteiveAdminProductList}
                                            style={{ height: '49px', width: '80px' }}
                                        >
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* 검색어 입력창 끝 */}

                            {/* 셀렉트 박스 시작 */}
                            <select
                                className="form-select col-md-4 offset-10"
                                aria-label="Default select example"
                                style={{ width: '120px' }}
                                onChange={onChangeSelectBox}
                            >
                                <option selected value="">
                                    장르
                                </option>
                                {tag &&
                                    tag.map((value: any, index) => (
                                        <option value={value} key={index}>
                                            {value}
                                        </option>
                                    ))}
                            </select>
                            {/* 셀렉트 박스 끝 */}
                        </div>
                    </div>
                </section>
                {/* <!-- 목차 section 끝 --> */}

                {/* 본문 시작 */}
                <section className="no-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center wow fadeInUp">
                                <div className="switch-set">
                                    <div className="spacer-20"></div>
                                </div>
                            </div>
                            {/* 관리용 테이블(+콜랩스) 시작 */}
                            <div className="col-md-12">
                                <table className="table table-pricing dark-style text-center">
                                    <thead>
                                        <tr>
                                            <th style={{ paddingLeft: '50px', paddingRight: '50px' }}>ID</th>
                                            <th style={{ paddingLeft: '15px', paddingRight: '15px' }}>이미지</th>
                                            <th style={{ paddingLeft: '15px' }}>상품명</th>
                                            <th style={{ paddingLeft: '40px', paddingRight: '40px' }}>가격</th>
                                            <th style={{ paddingLeft: '40px', paddingRight: '40px' }}>분류</th>
                                            <th style={{ paddingLeft: '40px', paddingRight: '40px' }}>할인율</th>
                                            <th style={{ paddingLeft: '10px', paddingRight: '20px' }}>관리/삭제</th>
                                        </tr>
                                    </thead>
                                    {/* 관리용 테이블(내용) 반복문 시작 */}
                                    <tbody id="my-accordion">
                                        {adminProductList &&
                                            adminProductList.map((data, index) => (
                                                <>
                                                    <tr key={index} style={{ height: '170px' }}>
                                                        {/* 상품번호 */}
                                                        <th
                                                            style={{
                                                                paddingLeft: '30px',
                                                                paddingRight: '30px',
                                                            }}
                                                        >
                                                            {data.pid}
                                                        </th>
                                                        {/* 상품 이미지 */}
                                                        <td>
                                                            <img
                                                                src={data.imgUrl}
                                                                style={{ width: '250px', borderRadius: '15px' }}
                                                            ></img>
                                                        </td>
                                                        {/* 상품 이름 */}
                                                        <td
                                                            className="d-spc"
                                                            style={{ width: '250px', paddingLeft: '15px' }}
                                                        >
                                                            {data.name}
                                                        </td>
                                                        {/* 상품 가격 */}
                                                        {data.price ? <td>{data.price} 원</td> : <td>가격 없음</td>}
                                                        {/* 상품 태그 */}
                                                        <td> {data.tag} </td>
                                                        {/* 할인율 */}
                                                        <td>{data.discount} %</td>
                                                        {/* 수정/삭제 관리버튼 (콜랩스 부모) */}
                                                        <td
                                                            style={{
                                                                paddingLeft: '30px',
                                                                paddingRight: '30px',
                                                            }}
                                                        >
                                                            <a
                                                                data-bs-toggle="collapse"
                                                                data-bs-target={'#collapse' + index}
                                                                role="button"
                                                                aria-expanded="false"
                                                                aria-controls={'collapse' + index}
                                                                className="btn-main opt-1 me-2"
                                                                onClick={() => getAdminProduct(data.pid)}
                                                                style={{
                                                                    width: '170px',
                                                                    fontSize: '15px',
                                                                }}
                                                            >
                                                                상품 관리
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    {/* adminProductList details 시작 */}
                                                    <tr>
                                                        <td colSpan={7} style={{ padding: '10px 0 10px 0' }}>
                                                            {/* 콜랩스 자식 */}
                                                            <div
                                                                className="accordion-collapse collapse"
                                                                id={'collapse' + index}
                                                                aria-labelledby={'heading' + index}
                                                                data-bs-parent="#my-accordion"
                                                            >
                                                                <div className="my-card card-body">
                                                                    <table className="table table-pricing dark-style text-center">
                                                                        <thead>
                                                                            <tr style={{ height: '60px' }}>
                                                                                <th
                                                                                    style={{
                                                                                        padding: '0 0 0 0',
                                                                                        verticalAlign: 'middle',
                                                                                    }}
                                                                                >
                                                                                    할인된 가격
                                                                                </th>
                                                                                <th
                                                                                    style={{
                                                                                        padding: '0 0 0 0',
                                                                                        verticalAlign: 'middle',
                                                                                    }}
                                                                                >
                                                                                    할인율 수정
                                                                                </th>
                                                                                <th
                                                                                    style={{
                                                                                        padding: '0 0 0 0',
                                                                                        verticalAlign: 'middle',
                                                                                    }}
                                                                                >
                                                                                    썸네일 수정
                                                                                </th>
                                                                                <th
                                                                                    style={{
                                                                                        padding: '0 0 0 0',
                                                                                        verticalAlign: 'middle',
                                                                                    }}
                                                                                >
                                                                                    상품 삭제
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                {/* 할인된 가격 */}
                                                                                <td
                                                                                    style={{
                                                                                        padding: '10px 0 10px 0',
                                                                                        verticalAlign: 'middle',
                                                                                    }}
                                                                                >
                                                                                    {data.price} 원 -{' '}
                                                                                    {Math.ceil(
                                                                                        data.price *
                                                                                            (adminProduct.discount /
                                                                                                100)
                                                                                    )}{' '}
                                                                                    원 = {/* 여기가 마지막 계산기 */}
                                                                                    {data.price *
                                                                                        ((100 - adminProduct.discount) /
                                                                                            100)}
                                                                                    원
                                                                                </td>
                                                                                {/* 할인율 */}
                                                                                <td
                                                                                    style={{
                                                                                        padding: '10px 0 10px 0',
                                                                                        verticalAlign: 'middle',
                                                                                    }}
                                                                                >
                                                                                    {adminProduct.price > 0 && (
                                                                                        <>
                                                                                            {' '}
                                                                                            <input
                                                                                                style={{
                                                                                                    width: '150px',
                                                                                                    height: '35px',
                                                                                                    display: 'inline',
                                                                                                    paddingTop: '5px',
                                                                                                    marginRight: '5px',
                                                                                                }}
                                                                                                type="number"
                                                                                                id="discount"
                                                                                                required
                                                                                                className="form-control ms-3"
                                                                                                value={
                                                                                                    adminProduct.discount
                                                                                                }
                                                                                                onChange={
                                                                                                    handleInputChange
                                                                                                }
                                                                                                placeholder="unitPrice"
                                                                                                name="discount"
                                                                                            />
                                                                                        </>
                                                                                    )}

                                                                                    {adminProduct.price === 0 &&
                                                                                        adminProduct.discount === 0 && (
                                                                                            <>
                                                                                                {' '}
                                                                                                <input
                                                                                                    style={{
                                                                                                        width: '150px',
                                                                                                        height: '35px',
                                                                                                        display:
                                                                                                            'inline',
                                                                                                        paddingTop:
                                                                                                            '5px',
                                                                                                        marginRight:
                                                                                                            '5px',
                                                                                                    }}
                                                                                                    type="number"
                                                                                                    id="discount"
                                                                                                    required
                                                                                                    disabled
                                                                                                    className="form-control ms-3"
                                                                                                    value={
                                                                                                        adminProduct.discount
                                                                                                    }
                                                                                                    onChange={
                                                                                                        handleInputChange
                                                                                                    }
                                                                                                    placeholder="unitPrice"
                                                                                                    name="discount"
                                                                                                />
                                                                                            </>
                                                                                        )}
                                                                                </td>
                                                                                <td
                                                                                    style={{
                                                                                        padding: '10px 0 10px 0',
                                                                                        verticalAlign: 'bottom',
                                                                                    }}
                                                                                >
                                                                                    {/* upload 선택상자/버튼 start */}
                                                                                    <input
                                                                                        type="file"
                                                                                        onChange={selectFile}
                                                                                        style={{
                                                                                            color: 'black',
                                                                                            backgroundColor: 'white',
                                                                                            width: '200px',
                                                                                            height: '30px',
                                                                                            fontSize: '14px',
                                                                                        }}
                                                                                    />
                                                                                    <br />
                                                                                    <img
                                                                                        src={previewImage}
                                                                                        style={{
                                                                                            width: '200px',
                                                                                            borderRadius: '15px',
                                                                                            paddingTop: '10px',
                                                                                        }}
                                                                                    />
                                                                                </td>
                                                                                {/* 삭제버튼 */}
                                                                                <td
                                                                                    style={{
                                                                                        padding: '10px 0 10px 0',
                                                                                        verticalAlign: 'middle',
                                                                                    }}
                                                                                >
                                                                                    <button
                                                                                        className="btn-main opt-1"
                                                                                        onClick={deleteProduct}
                                                                                        style={{
                                                                                            width: '170px',
                                                                                            fontSize: '15px',
                                                                                        }}
                                                                                    >
                                                                                        상품 목록에서 삭제
                                                                                    </button>
                                                                                    <br />
                                                                                    <button
                                                                                        className="btn-main opt-1 mt-3"
                                                                                        onClick={updateFileDb}
                                                                                        style={{
                                                                                            width: '170px',
                                                                                            fontSize: '15px',
                                                                                        }}
                                                                                    >
                                                                                        상품 할인율 수정
                                                                                    </button>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </>
                                            ))}
                                    </tbody>
                                    {/* 관리용 테이블(내용) 반복문 끝 */}
                                </table>
                                {/* 페이징 처리 */}
                                <Pagination
                                    className="pagination"
                                    count={count}
                                    page={page}
                                    siblingCount={1}
                                    boundaryCount={1}
                                    shape="rounded"
                                    onChange={handlePageChange}
                                    sx={{
                                        backgroundColor: '#1E1F22', // 검정색 배경
                                        color: 'white', // 흰색 글자색
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginTop: '20px', // 원하는 여백 설정
                                        '& .Mui-selected': {
                                            backgroundColor: 'white', // 선택된 페이지의 배경색
                                            color: '#1E1F22', // 선택된 페이지의 글자색
                                            '&:hover': {
                                                backgroundColor: 'white', // 선택된 페이지의 호버 배경색
                                            },
                                        },
                                        '& .MuiPaginationItem-root': {
                                            fontSize: '1rem', // 페이지 아이템의 글자 크기
                                            minWidth: '30px', // 페이지 아이템의 최소 너비
                                            height: '30px', // 페이지 아이템의 높이
                                            color: 'white', // 선택되지 않은 페이지 아이템의 글자색
                                            '&:hover': {
                                                backgroundColor: 'black', // 선택되지 않은 페이지 아이템의 호버 배경색
                                            },
                                            '&.Mui-selected': {
                                                backgroundColor: 'purple', // 특정 페이지일 때 선택된 페이지의 배경색
                                                color: 'white', // 특정 페이지일 때 선택된 페이지의 글자색
                                                '&:hover': {
                                                    backgroundColor: 'purple', // 특정 페이지일 때 선택된 페이지의 호버 배경색
                                                },
                                            },
                                        },
                                    }}
                                />
                            </div>
                            {/* 관리용 테이블(아코디언) 끝 */}
                        </div>
                    </div>
                </section>
                {/* 본문 끝 */}

                {/* < -- 2번째 섹션 : Premium Game Server 시작 -- > */}
                <section className="no-bottom">
                    <div className="container pb-5">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="subtitle wow fadeInUp mb-3">Incredibly features</div>
                                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                                    프리미엄 게임 서버
                                </h2>
                            </div>

                            <div className="col-lg-6"></div>

                            <div className="col-lg-3 col-md-6 mb-sm-20 wow fadeInRight" data-wow-delay="0s">
                                <div>
                                    <img src="images/icons/1.png" className="mb20" alt="" />
                                    <h4>Super Quick Purchase</h4>
                                    <p>다른 웹 사이트보다 훨씬 빠른 게임 설정이 가능합니다.</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 mb-sm-20 wow fadeInRight" data-wow-delay=".2s">
                                <div>
                                    <img src="images/icons/2.png" className="mb20" alt="" />
                                    <h4>Premium Hardware</h4>
                                    <p>저희 서버에서는 프리미엄 하드웨어를 제공합니다.</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 mb-sm-20 wow fadeInRight" data-wow-delay=".4s">
                                <div>
                                    <img src="images/icons/3.png" className="mb20" alt="" />
                                    <h4>DDos Protection</h4>
                                    <p>어떠한 디도스 공격에도 막아낼 수 있습니다.</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 mb-sm-20 wow fadeInRight" data-wow-delay=".6s">
                                <div>
                                    <img src="images/icons/4.png" className="mb20" alt="" />
                                    <h4>Fast Support</h4>
                                    <p>24시간 대기 하고있는 상담원을 빠른 서포트 기능을 만나보세요!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Toast Container */}
                    <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        style={{ width: '600px' }}
                    />
                </section>
                {/* < -- 2번째 섹션 : Premium Game Server 종료 -- > */}
            </div>
        </>
    );
}

export default AdminControlPanelModify;
