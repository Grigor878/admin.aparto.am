/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { editCrmUser, getEditCrmUser, getHomes } from '../../../../store/slices/crmSlice'
import AddPart from '../../../components/addPart/AddPart'
import { cutText, formatDate } from '../../../../helpers/formatters'
import { HomeStatus } from '../components/statuses/HomeStatus'
import { ownerAdd, remove } from '../../../svgs/svgs'
import { Loader } from '../../../../components/loader/Loader'
import { Search } from '../../../components/inputs/Search'
import { Card } from '../../properties/components/card/Card'
import { InputText } from '../../properties/components/inputs/InputText'
import { InputNum } from '../../properties/components/inputs/InputNum'
import { EditSelect } from '../components/EditSelect'
import { Text } from '../components/Text'
import { deals, proptypes, statuses } from './data'
import { UploadFile } from '../components/UploadFile'
import { AgentSelect } from '../../properties/components/asyncSelects/AgentSelect'
import { SingleSelect } from '../components/SingleSelect'
import { error } from '../../../../components/swal/swal'
import { APP_BASE_URL } from '../../../../apis/config'
import './styles.scss'

const EditClient = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { editCrmUserData, loading, crmHomes, uploadFiles } = useSelector((state) => state.crm)

    useEffect(() => {
        dispatch(getEditCrmUser(id))
        dispatch(getHomes())
    }, [dispatch, id])

    useEffect(() => {
        if (editCrmUserData) {
            setName(editCrmUserData.name);
            setPhone(editCrmUserData.phone);
            setEmail(editCrmUserData.email);
            setSource(editCrmUserData.source);
            setDeal(editCrmUserData.deal);
            setPropertyType(editCrmUserData.propertyType);
            setRoom(editCrmUserData.room);
            setBudget(editCrmUserData.budget);
            setComment(editCrmUserData.comment);
            setContractNumber(editCrmUserData.contractNumber);
            setSpecialist(editCrmUserData.specialist);
            setStatus(editCrmUserData.status);
            setDisplayed(editCrmUserData.displayedHomes);
        }
    }, [editCrmUserData]);

    const [name, setName] = useState(editCrmUserData?.name)
    const [phone, setPhone] = useState(editCrmUserData?.phone)
    const [email, setEmail] = useState(editCrmUserData?.email)
    const [source, setSource] = useState(editCrmUserData?.source)
    const [deal, setDeal] = useState(editCrmUserData?.deal)
    const [propertyType, setPropertyType] = useState(editCrmUserData?.propertyType)
    const [room, setRoom] = useState(editCrmUserData?.room)
    const [budget, setBudget] = useState(editCrmUserData?.budget)
    const [comment, setComment] = useState(editCrmUserData?.comment)
    const [contractNumber, setContractNumber] = useState(editCrmUserData?.contractNumber)
    const [specialist, setSpecialist] = useState(editCrmUserData?.specialist);

    const [status, setStatus] = useState(editCrmUserData?.status)
    const [homeSearch, setHomeSearch] = useState("")
    const [displayed, setDisplayed] = useState(editCrmUserData?.displayedHomes)

    const handleDateChangeInDisplayed = (value, id) => {
        const date = new Date(value);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        const updatedDisplayed = displayed.map((item) => {
            if (item.id === id) {
                return { ...item, date: formattedDate };
            }
            return item;
        });
        setDisplayed(updatedDisplayed);
    };

    const filteredHomes = crmHomes?.filter((el) =>
        JSON.stringify(el)
            .toLowerCase()
            .includes(homeSearch.toLowerCase())
    );

    const addToDisplayed = (id) => {
        const selectedHome = crmHomes?.find(home => home.id === id);

        setDisplayed(prevDisplayedHomes => [...prevDisplayedHomes, selectedHome]);
    };

    const removeFromDisplayed = (id) => {
        setDisplayed(prevDisplayedHomes => prevDisplayedHomes?.filter(home => home.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!deal?.length) {
            return error("Նշեք գործարքի տեսակը!")
        }

        if (!propertyType?.length) {
            return error("Նշեք գույքի տիպը!")
        }

        if (displayed?.some((home) => !home.date)) {
            return error('Նշեք ցուցադրման ամսաթիվը!');
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('source', source);
        formData.append('deal', JSON.stringify(deal));
        formData.append('propertyType', JSON.stringify(propertyType));
        formData.append('room', room);
        formData.append('budget', budget);
        formData.append('comment', comment);
        formData.append('contractNumber', contractNumber);
        formData.append('specialist', specialist);
        formData.append('status', status);

        uploadFiles.forEach((file, index) => {
            formData.append(`file-${index + 1}`, file);
        });

        const displayedHomes = displayed?.map(home => ({
            id: home.id,
            date: home.date
        }));

        formData.append('displayedHomes', JSON.stringify(displayedHomes));

        dispatch(editCrmUser({ id, formData }))
            .then(() => {
                setTimeout(() => {
                    navigate(-1)
                }, 1000)
            });
    }

    return (
        <article className="addNewClient">
            <AddPart type="editClient" crmPermission={editCrmUserData?.permission} />

            {!editCrmUserData
                ? <Loader />
                : <form
                    id="editClientForm"
                    className='addNewClient__main'
                    onSubmit={handleSubmit}
                >
                    <div className="addNewClient__center">
                        <Card
                            title="Հաճախորդ"
                            width="680px"
                            child={
                                <>
                                    <InputText
                                        value={editCrmUserData?.name ? editCrmUserData?.name : name}
                                        title="Անուն*"
                                        placeholder="Նշեք հաճաճախորդի անունը"
                                        style="306px"
                                        required={true}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <InputNum
                                        value={editCrmUserData?.phone ? editCrmUserData?.phone : phone}
                                        title="Հեռախոս*"
                                        placeholder="Նշեք հաճախորդի հեռախոսահամարը"
                                        style="306px"
                                        required={true}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />

                                    <InputText
                                        value={editCrmUserData?.email ? editCrmUserData?.email : email}
                                        title="Էլ. Հասցե"
                                        placeholder="Նշեք հաճախորդի էլ. հասցեն"
                                        style="306px"
                                        required={false}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <InputText
                                        value={editCrmUserData?.source ? editCrmUserData?.source : source}
                                        title="Աղբյուր*"
                                        placeholder="Նշեք աղբյուրը"
                                        style="306px"
                                        required={true}
                                        onChange={(e) => setSource(e.target.value)}
                                    />

                                    <EditSelect
                                        value={editCrmUserData?.deal ? editCrmUserData?.deal : deal}
                                        title="Գործարք*"
                                        // name="Նշեք գործարք"
                                        data={deals}
                                        style="306px"
                                        required={true}
                                        onChange={(e) => setDeal(e.target.value)}
                                    />
                                    <EditSelect
                                        value={editCrmUserData?.propertyType ? editCrmUserData?.propertyType : propertyType}
                                        title="Գույքի տիպ*"
                                        // name="Ընտրեք գույքի տիպերը"
                                        data={proptypes}
                                        style="306px"
                                        required={true}
                                        onChange={(e) => setPropertyType(e.target.value)}
                                    />

                                    <InputText
                                        value={editCrmUserData?.budget ? editCrmUserData?.budget : budget}
                                        title="Բյուջե*"
                                        placeholder="Նշեք բյուջե"
                                        style="306px"
                                        required={true}
                                        onChange={(e) => setBudget(e.target.value)}
                                    />
                                    <InputText
                                        value={editCrmUserData?.room ? editCrmUserData?.room : room}
                                        title="Սենյակ*"
                                        placeholder="Նշեք սենյակների քանակ"
                                        style="306px"
                                        required={true}
                                        onChange={(e) => setRoom(e.target.value)}
                                    />

                                    <Text
                                        value={editCrmUserData?.comment ? editCrmUserData?.comment : comment}
                                        title="Մեկնաբանություն"
                                        placeholder="Նշեք մեկնաբանություն"
                                        required={false}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </>
                            }
                        />
                    </div>

                    <div className='addNewClient__right'>
                        <Card
                            title="Հաճախորդ"
                            width="460px"
                            child={
                                <>
                                    <InputText
                                        value={editCrmUserData?.contractNumber ? editCrmUserData?.contractNumber : contractNumber}
                                        title="Պայմանագրի Համար"
                                        placeholder="Նշեք պայմանագրի համարը"
                                        style="306px"
                                        required={false}
                                        onChange={(e) => setContractNumber(e.target.value)}
                                    />
                                    <UploadFile
                                        files={editCrmUserData?.files}
                                    />
                                </>
                            }
                        />

                        <Card
                            width="460px"
                            child={
                                <>
                                    <AgentSelect
                                        value={editCrmUserData?.specialist ? editCrmUserData?.specialist : specialist}
                                        title="Մասնագետ*"
                                        style="412px"
                                        required={true}
                                        onChange={(e) => setSpecialist(e.target.value)}
                                    />
                                    <SingleSelect
                                        value={editCrmUserData?.status ? editCrmUserData?.status : status}
                                        title="Կարգավիճակ*"
                                        data={statuses}
                                        style="412px"
                                        required={true}
                                        onChange={(e) => setStatus(e.target.value)}
                                    />
                                </>
                            }
                        />
                    </div>
                </form>}

            {displayed?.length
                ? <div className='addNewClient__displaylist'>
                    <h4>Ցուցադրված գույքեր</h4>

                    <ul className='addNewClient__displaylist-homes'>
                        {displayed?.map(({ id, home_id, street, community, surface, status, date }) => {
                            return (
                                <li key={id}>
                                    <a
                                        href={`${APP_BASE_URL}/result/${id}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <p># {home_id}</p>
                                        <p>{cutText(street, 15)}</p>
                                        <p>{community}</p>
                                        <p>{surface} ք․մ</p>
                                        <HomeStatus status={status} />
                                    </a>

                                    <input
                                        id={`date-${id}`}
                                        type="date"
                                        defaultValue={date ? formatDate(date) : ""}
                                        onChange={(e) => handleDateChangeInDisplayed(e.target.value, id)}
                                    />

                                    <button onClick={() => removeFromDisplayed(id)}>
                                        {remove.icon}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                : null}
            {loading
                ? <Loader />
                : <div className='addNewClient__homelist'>
                    <h4>Գույքերի Ցուցակ</h4>

                    <Search
                        value={homeSearch}
                        placeholder="Search by ID, Property Name, Phone, Owner or Agent"
                        onChange={(e) => setHomeSearch(e.target.value.toLowerCase())}
                    />

                    <ul className='addNewClient__homelist-homes'>
                        {homeSearch ?
                            filteredHomes?.map(({ id, home_id, street, community, surface, status }) => {
                                const isAdded = displayed?.some(home => home.id === id);

                                return (
                                    <li key={id}>
                                        <a
                                            href={`${APP_BASE_URL}/result/${id}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <p># {home_id}</p>
                                            <p>{cutText(street, 15)}</p>
                                            <p>{community}</p>
                                            <p>{surface} ք․մ</p>
                                            <HomeStatus status={status} />
                                        </a>
                                        {!isAdded && (
                                            <button onClick={() => addToDisplayed(id)}>
                                                {ownerAdd.icon}
                                            </button>
                                        )}
                                    </li>
                                )
                            })
                            : crmHomes?.slice(0, 15)?.map(({ id, home_id, street, community, surface, status }) => {
                                const isAdded = displayed?.some(home => home.id === id);

                                return (
                                    <li key={id}>
                                        <a
                                            href={`${APP_BASE_URL}/result/${id}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <p># {home_id}</p>
                                            <p>{cutText(street, 15)}</p>
                                            <p>{community}</p>
                                            <p>{surface} ք․մ</p>
                                            <HomeStatus status={status} />
                                        </a>
                                        {!isAdded && (
                                            <button onClick={() => addToDisplayed(id)}>
                                                {ownerAdd.icon}
                                            </button>
                                        )}
                                    </li>
                                )
                            })}
                    </ul>
                </div>}
        </article>
    )
}

export default EditClient


// const addToDisplayed = (id) => {
//     const selectedHome = crmHomes.find(home => home.id === id);
//     const date = new Date();
//     const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
//     const updatedHome = { ...selectedHome, date: formattedDate };

//     setDisplayed(prevDisplayedHomes => [...prevDisplayedHomes, updatedHome]);
// };