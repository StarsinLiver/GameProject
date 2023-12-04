import React, { useEffect, useState } from 'react';
import designesis from '../../assets/js/designesia';
import customMarquee from '../../assets/js/custom-marquee';
import customSwiper2 from '../../assets/js/custom-swiper-2';
import IProduct from '../../types/IProduct';
import ProductService from '../../services/product/ProductService';
import { Link, useParams } from 'react-router-dom';
import NullPage from './NullPage';
import { Pagination } from '@mui/material';

function GameTagSimulation() {
    const [render, setRender] = useState<boolean>(false);

    useEffect(() => {
        customMarquee();
        customSwiper2();
        designesis();
    }, [render]);

    // todo  상품 배열 변수
    const [productList, setProductList] = useState<Array<IProduct>>([]);
    const initialCoast = {
        firstCoast: 0,
        lastCoast: 999999,
    };
    const [coast, setCoast] = useState<any>(initialCoast);

    //  TODO  공통 변수(필수)  page(현재 페이지), count(총 페이지 건수) , pageSize(3,6,9 배열  1페이지 당 건수)
    const [page, setPage] = useState<number>(1); // 현재 페이지 번호         최초값 1
    const [count, setCount] = useState<number>(1); //총페이지 건수          최초값 1
    const [pageSize, setPageSize] = useState<number>(18); //1페이지당 개수  최초값 20
    //  검색어 변수
    const [searchName, setSearchName] = useState<string>('');
    const [orderBy, setOrderBy] = useState<string>('DESC');
    const [message, setMessage] = useState<string>('가장 좋아요가 많은순');

    useEffect(() => {
        onClickOrderBy(orderBy);
    }, [page, pageSize]);

    //  todo  전체조회 - 데이터베이스
    // Todo : Order By Desc
    const retrieveProductListDesc = () => {
        ProductService.getAllByThumbNailAndReviewCountFullJoinOrderByDesc(
            searchName,
            '시뮬레이션',
            coast.firstCoast,
            coast.lastCoast,
            page - 1,
            pageSize
        )
            .then((response: any) => {
                const { product, totalPages } = response.data;
                setProductList(product);
                setCount(totalPages);
                console.log('product', product);

                setRender(true);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    // Todo : Order By Asc
    const retrieveProductListAsc = () => {
        ProductService.getAllByThumbNailAndReviewCountFullJoinOrderByAsc(
            searchName,
            '시뮬레이션',
            coast.firstCoast,
            coast.lastCoast,
            page - 1,
            pageSize
        )
            .then((response: any) => {
                const { product, totalPages } = response.data;
                setProductList(product);
                setCount(totalPages);
                console.log('product', product);

                setRender(true);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    // TODO : Pagenation 수동 바인딩
    // TODO : 페이지 번호를 누르면 -> page 변수에 값 저장
    const handlePageChange = (event: any, value: number) => {
        // value == 화면의 페이지번호
        setPage(value);
    };

    // Todo : 가격 세팅 : 수동바인딩
    const coastSet = (object: any) => {
        setCoast(object);
    };

    // Todo : 가격 리셋
    const resetCoast = () => {
        setPage(1);
        setCoast(initialCoast);
        onClickOrderBy(orderBy);
    };

    // Todo : 가격 수동 바인딩
    const onChangeCoast = (e: any) => {
        const { name, value } = e.target;
        const onlyNumber = value.replace(/[^0-9]/g, ''); // 숫자가 아닐경우 replace 해버림
        setCoast({ ...coast, [name]: onlyNumber });
        retrieveProductListDesc();
    };

    // Todo : 검색어 수동 바인딩
    const onChangeSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    // Todo : OrderBy 클릭시
    const onClickOrderBy = (orderBy: string) => {
        setOrderBy(orderBy);
        console.log('orderBy', orderBy);
        if (orderBy === 'DESC') {
            retrieveProductListDesc();
            setMessage('가장 좋아요가 많은순');
        } else if (orderBy === 'ASC') {
            retrieveProductListAsc();
            setMessage('가장 좋아요가 적은순');
        }
    };

    // Todo : 검색어 클릭시
    const onClickSearchName = () => {
        setPage(1);
        onClickOrderBy(orderBy);
    };

    return (
        <>
            {render && (
                <div className="no-bottom no-top" id="content">
                    <div id="top"></div>

                    {/* < -- 2번째 섹션 : Most complete 시작 -- >  */}
                    <section className="jarallax">
                        <img
                            src="images/game-wallpaper/8.jpg"
                            className="jarallax-img"
                            alt=""
                            style={{ opacity: '0.3' }}
                        />
                        <div className="de-gradient-edge-top"></div>
                        <div className="de-gradient-edge-bottom"></div>

                        <div className="container z-1000 ">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="subtitle wow fadeInUp mb-3">Most complete</div>

                                    <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                                        시뮬레이션 게임
                                    </h2>
                                </div>
                                <div className="col-lg-6 text-lg-end">
                                    <a className="btn-main mb-sm-30" href="/games">
                                        View all games
                                    </a>
                                </div>
                            </div>

                            <div className="container">
                                <div className="row">
                                    {/* 본문 시작 */}
                                    <div className="col-md-8">
                                        {/* 상품 정보  */}
                                        <div className="row g-4 sequence mt-5" style={{ clear: 'both' }}>
                                            {/* 1 */}
                                            {productList &&
                                                productList.map((value, index) => (
                                                    <>
                                                        <div
                                                            className="col-lg-4 col-md-4  wow fadeInRight"
                                                            data-wow-delay="0s"
                                                        >
                                                            <div
                                                                style={{
                                                                    width: '250px',
                                                                    height: '100%',
                                                                    fontSize: '12px',
                                                                }}
                                                            >
                                                                <div className="de-image-hover">
                                                                    <Link to={`/game-detail/${value.pid}`}>
                                                                        <img
                                                                            src={value.imgUrl}
                                                                            className="img-fluid"
                                                                            alt=""
                                                                            style={{
                                                                                marginBottom: '5px',
                                                                                borderRadius: '15px',
                                                                            }}
                                                                        />
                                                                        <span className="d-tagline">{value.tag}</span>

                                                                        <div className="d-text">
                                                                            <h3 style={{ fontSize: '17px' }}>
                                                                                {value.name}
                                                                            </h3>

                                                                            {value.discount > 0 ? (
                                                                                <>
                                                                                    <p
                                                                                        className="d-price"
                                                                                        style={{
                                                                                            display: 'flex',
                                                                                            alignItems: 'center',
                                                                                        }}
                                                                                    >
                                                                                        <span
                                                                                            className="css-15fdr99"
                                                                                            style={{
                                                                                                display: 'inline',
                                                                                                fontSize: '8px',
                                                                                            }}
                                                                                        >
                                                                                            {value.discount > 0 && (
                                                                                                <div className="css-b0xoos">
                                                                                                    {' '}
                                                                                                    -{value.discount}%
                                                                                                </div>
                                                                                            )}
                                                                                        </span>
                                                                                        &nbsp; &nbsp;
                                                                                        <del
                                                                                            style={{
                                                                                                display: 'inline',
                                                                                                fontSize: '15px',
                                                                                            }}
                                                                                        >
                                                                                            ₩{' '}
                                                                                            {value.price.toLocaleString()}
                                                                                        </del>
                                                                                        <h4
                                                                                            className="price"
                                                                                            style={{
                                                                                                display: 'inline',
                                                                                                marginTop: '12px',
                                                                                            }}
                                                                                        >
                                                                                            &nbsp; ₩{' '}
                                                                                            {value.finalPrice.toLocaleString()}
                                                                                        </h4>
                                                                                    </p>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <p
                                                                                        className="d-price"
                                                                                        style={{
                                                                                            display: 'flex',
                                                                                            alignItems: 'center',
                                                                                        }}
                                                                                    >
                                                                                        <h4
                                                                                            className="price"
                                                                                            style={{
                                                                                                marginTop: '12px',
                                                                                            }}
                                                                                        >
                                                                                            {(
                                                                                                value.price > 0
                                                                                            ).toLocaleString()
                                                                                                ? '₩ ' + value.price
                                                                                                : `무료`}
                                                                                        </h4>
                                                                                    </p>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                ))}
                                        </div>
                                        {render && (
                                            <div className="container" id="paging">
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
                                        )}
                                    </div>
                                    {/* 본문 끝 */}

                                    {/* 사이드 바 시작 */}
                                    <div id="sidebar" className="col-md-3" style={{ marginTop: '3rem' }}>
                                        {/*   search 시작 */}
                                        <div className="widget mb-1 wow fadeInUp">
                                            <h4>게임 이름</h4>
                                            <div className="small-border" style={{ width: '100%' }}></div>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="게임 이름을 입력해 주세요"
                                                    value={searchName}
                                                    onChange={onChangeSearchName}
                                                    style={{
                                                        height: '2.5rem',
                                                        backgroundColor: 'rgba(255, 255, 255, .1)',
                                                        borderColor: 'rgba(255, 255, 255, .1)',
                                                        color: 'white',
                                                        width: '9rem',
                                                    }}
                                                />
                                                <div className="input-group-append">
                                                    <button
                                                        className="btn btn-outline-secondary overflow-hidden"
                                                        type="button"
                                                        onClick={onClickSearchName}
                                                        style={{
                                                            height: '2.5rem',
                                                            width: '5.5rem',
                                                            borderColor: 'rgba(255, 255, 255, .1)',
                                                            color: 'grey',
                                                        }}
                                                    >
                                                        Search
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* search 끝 */}

                                        {/* 가격별(카테고리, 종류, 타입) 시작 */}
                                        <div className="widget wow fadeInUp">
                                            <h4>가격별</h4>
                                            <div className="small-border" style={{ width: '100%' }}></div>
                                            <div>
                                                <ul
                                                    // className="float-end float-sm-start "
                                                    data-wow-delay="0s"
                                                >
                                                    <li>
                                                        <a onClick={() => coastSet({ firstCoast: 0, lastCoast: 5000 })}>
                                                            무료 ~ 5천원
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            onClick={() =>
                                                                coastSet({ firstCoast: 5000, lastCoast: 10000 })
                                                            }
                                                        >
                                                            5천원 ~ 1만원
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            onClick={() =>
                                                                coastSet({
                                                                    firstCoast: 10000,
                                                                    lastCoast: 20000,
                                                                })
                                                            }
                                                        >
                                                            1만원 ~ 2만원
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            onClick={() =>
                                                                coastSet({
                                                                    firstCoast: 20000,
                                                                    lastCoast: 30000,
                                                                })
                                                            }
                                                        >
                                                            2만원 ~ 3만원
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            onClick={() =>
                                                                coastSet({
                                                                    firstCoast: 30000,
                                                                    lastCoast: 50000,
                                                                })
                                                            }
                                                        >
                                                            3만원 ~ 5만원
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            onClick={() =>
                                                                coastSet({
                                                                    firstCoast: 50000,
                                                                    lastCoast: 100000,
                                                                })
                                                            }
                                                        >
                                                            5만원 ~ 10만원
                                                        </a>
                                                    </li>
                                                    <li className="mt-3">
                                                        <p>
                                                            직접입력
                                                            <div className="input-group">
                                                                <span>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="0원"
                                                                        value={coast.firstCoast}
                                                                        name="firstCoast"
                                                                        onChange={onChangeCoast}
                                                                        style={{
                                                                            height: '2.5rem',
                                                                            backgroundColor: 'rgba(255, 255, 255, .1)',
                                                                            borderColor: 'rgba(255, 255, 255, .1)',
                                                                            color: 'white',
                                                                            width: '5rem',
                                                                        }}
                                                                    />
                                                                </span>
                                                                <span>&nbsp;~&nbsp;</span>
                                                                <span>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="999,999,999원"
                                                                        value={coast.lastCoast}
                                                                        name="lastCoast"
                                                                        onChange={onChangeCoast}
                                                                        style={{
                                                                            height: '2.5rem',
                                                                            backgroundColor: 'rgba(255, 255, 255, .1)',
                                                                            borderColor: 'rgba(255, 255, 255, .1)',
                                                                            color: 'white',
                                                                            width: '5rem',
                                                                        }}
                                                                    />
                                                                </span>
                                                                <div className="input-group-append">
                                                                    <button
                                                                        className="btn btn-outline-secondary overflow-hidden"
                                                                        type="button"
                                                                        onClick={retrieveProductListDesc}
                                                                        style={{
                                                                            height: '2.5rem',
                                                                            width: '4rem',
                                                                            borderColor: 'rgba(255, 255, 255, .1)',
                                                                            color: 'grey',
                                                                        }}
                                                                    >
                                                                        Search
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="widget widget_tags">
                                                            <li>
                                                                <a onClick={resetCoast}>
                                                                    {coast.firstCoast} 원 ~ {coast.lastCoast}{' '}
                                                                    원&nbsp;&nbsp;x
                                                                </a>
                                                            </li>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* 게임 태그(카테고리, 종류, 타입) 끝 */}

                                        {/* 좋아요순 시작 */}
                                        <div className="widget wow fadeInUp">
                                            <h4>좋아요순</h4>
                                            <div className="small-border" style={{ width: '100%' }}></div>
                                            <div>
                                                <ul data-wow-delay="0s">
                                                    <li>
                                                        <a onClick={() => onClickOrderBy('DESC')}>
                                                            가장 좋아요가 많은순
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a onClick={() => onClickOrderBy('ASC')}>
                                                            가장 좋아요가 적은순
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <div className="widget widget_tags">
                                                            <li>
                                                                <a onClick={() => onClickOrderBy('DESC')}>
                                                                    {message} &nbsp;&nbsp;x
                                                                </a>
                                                            </li>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* 좋아요순 끝 */}

                                        {/* 주의 사항 시작 */}
                                        <div className="widget widget-text wow fadeInUp">
                                            <h4>주의 사항</h4>
                                            <div className="small-border"></div>
                                            <p className="small no-bottom"></p>
                                        </div>
                                        {/* 주의 사항 끝 */}
                                    </div>
                                    {/* 사이드 바 끝 */}
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* < -- 2번째 섹션 : Most complete 종료 -- >  */}

                    {/* < -- 3번째 섹션 : Start your game 시작 -- > */}
                    <section className="no-bottom">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="padding60 sm-padding40 sm-p-2 jarallax position-relative">
                                        <img src="images/background/1.webp" className="jarallax-img" alt="" />
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="subtitle wow fadeInUp mb-3">Start your game</div>
                                                <h2 className="wow fadeInUp" data-wow-delay=".2s">
                                                    여러분의 게임 잠재력의 가능성을 시험해 보세요
                                                </h2>
                                                <p className="wow fadeInUp">
                                                    당신 안에 잠들어 있는 게임의 잠재력을 올려보세요!
                                                </p>
                                                <div className="spacer-10"></div>
                                                <a className="btn-main mb10 wow fadeInUp" href="/games">
                                                    게임 주문하러 가기
                                                </a>
                                            </div>
                                        </div>

                                        <img
                                            src="images/misc/avatar.webp"
                                            className="sm-hide position-absolute bottom-0 end-0 wow fadeIn"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* < -- 3번째 섹션 : Start your game 종료 -- > */}

                    {/* 4번째 섹션 : we accept 시작 */}
                    <section>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="subtitle wow fadeInUp mb-3">Payment Methods</div>
                                    <h2 className="wow fadeInUp" data-wow-delay=".2s">
                                        We accept
                                    </h2>
                                </div>
                                <div className="col-lg-6">
                                    <div className="row g-4">
                                        <div className="col-sm-2 col-4">
                                            <div className="p-2 rounded-10" data-bgcolor="rgba(255, 255, 255, .05)">
                                                <img
                                                    src={require('../../assets/images/payments/visa.webp')}
                                                    className="img-fluid"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-2 col-4">
                                            <div className="p-2 rounded-10" data-bgcolor="rgba(255, 255, 255, .05)">
                                                <img
                                                    src={require('../../assets/images/payments/mastercard.webp')}
                                                    className="img-fluid"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-2 col-4">
                                            <div className="p-2 rounded-10" data-bgcolor="rgba(255, 255, 255, .05)">
                                                <img
                                                    src={require('../../assets/images/payments/paypal.webp')}
                                                    className="img-fluid"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-2 col-4">
                                            <div className="p-2 rounded-10" data-bgcolor="rgba(255, 255, 255, .05)">
                                                <img
                                                    src={require('../../assets/images/payments/skrill.webp')}
                                                    className="img-fluid"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-2 col-4">
                                            <div className="p-2 rounded-10" data-bgcolor="rgba(255, 255, 255, .05)">
                                                <img
                                                    src={require('../../assets/images/payments/jcb.webp')}
                                                    className="img-fluid"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-2 col-4">
                                            <div className="p-2 rounded-10" data-bgcolor="rgba(255, 255, 255, .05)">
                                                <img
                                                    src={require('../../assets/images/payments/american-express.webp')}
                                                    className="img-fluid"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* 4번째 섹션 : we accept 종료 */}
                </div>
            )}
            {/* <!-- content begin --> */}

            {/* <!-- content close --> */}
        </>
    );
}

export default GameTagSimulation;
