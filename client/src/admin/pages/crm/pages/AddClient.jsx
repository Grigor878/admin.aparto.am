/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AddPart from '../../../components/addPart/AddPart'
import { Card } from '../../properties/components/card/Card';
import { InputText } from '../../properties/components/inputs/InputText';
import { InputNum } from '../../properties/components/inputs/InputNum';
import { MultiSelect } from '../../properties/components/dropdowns/MultiSelect';
import { Text } from '../components/Text';
import { AgentSelect } from '../../properties/components/asyncSelects/AgentSelect';
import { SingleSelect } from '../components/SingleSelect';
import { UploadFile } from '../components/UploadFile';
import { deals, proptypes, statuses } from './data';
import { addCrmUser, getHomes } from '../../../../store/slices/crmSlice';
import { ownerAdd, remove } from '../../../svgs/svgs';
import { Search } from '../../../components/inputs/Search';
import { cutText } from '../../../../helpers/formatters';
import { Loader } from '../../../../components/loader/Loader';
import { error } from '../../../../components/swal/swal';
import { useNavigate } from 'react-router-dom';
import { HomeStatus } from '../components/statuses/HomeStatus';
import './styles.scss'

const AddClient = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, crmHomes, uploadFiles } = useSelector((state) => state.crm)

    useEffect(() => {
        dispatch(getHomes())
    }, [dispatch])

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [source, setSource] = useState("")
    const [deal, setDeal] = useState([])
    const [propertyType, setPropertyType] = useState([])
    const [room, setRoom] = useState("")
    const [budget, setBudget] = useState("")
    const [comment, setComment] = useState("")
    const [contractNumber, setContractNumber] = useState("")
    const [specialist, setSpecialist] = useState("")
    const [status, setStatus] = useState("")

    const [homeSearch, setHomeSearch] = useState("")

    const [displayed, setDisplayed] = useState([])

    const filteredHomes = crmHomes?.filter((el) =>
        JSON.stringify(el)
            .toLowerCase()
            .includes(homeSearch.toLowerCase())
    );

    const addToDisplayed = (id) => {
        const selectedHome = crmHomes.find(home => home.id === id);

        setDisplayed(prevDisplayedHomes => [...prevDisplayedHomes, selectedHome]);
    };

    const removeFromDisplayed = (id) => {
        setDisplayed(prevDisplayedHomes => prevDisplayedHomes.filter(home => home.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!deal?.length) {
            return error("Նշեք գործարքի տեսակը!")
        }

        if (!propertyType?.length) {
            return error("Նշեք գույքի տիպը!")
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
            date: new Date().toLocaleDateString("en-US")
        }));

        formData.append('displayedHomes', JSON.stringify(displayedHomes));

        dispatch(addCrmUser(formData)).then(() => {
            setTimeout(() => {
                navigate(-1)
            }, 1000)
        });
    }

    return (
        <article className="addNewClient">
            <AddPart type="addNewClient" />

            <form
                id="addNewClientForm"
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
                                    title="Անուն*"
                                    placeholder="Նշեք հաճաճախորդի անունը"
                                    style="306px"
                                    required={true}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <InputNum
                                    title="Հեռախոս*"
                                    placeholder="Նշեք հաճախորդի հեռախոսահամարը"
                                    style="306px"
                                    required={true}
                                    onChange={(e) => setPhone(e.target.value)}
                                />

                                <InputText
                                    title="Էլ. Հասցե"
                                    placeholder="Նշեք հաճախորդի էլ. հասցեն"
                                    style="306px"
                                    required={false}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <InputText
                                    title="Աղբյուր*"
                                    placeholder="Նշեք աղբյուրը"
                                    style="306px"
                                    required={true}
                                    onChange={(e) => setSource(e.target.value)}
                                />

                                <MultiSelect
                                    title="Գործարք*"
                                    // name="Նշեք գործարք"
                                    data={deals}
                                    style="306px"
                                    required={true}
                                    onChange={(e) => setDeal(e.target.value)}
                                />
                                <MultiSelect
                                    title="Գույքի տիպ*"
                                    // name="Ընտրեք գույքի տիպերը"
                                    data={proptypes}
                                    style="306px"
                                    required={true}
                                    onChange={(e) => setPropertyType(e.target.value)}
                                />

                                <InputText
                                    title="Բյուջե*"
                                    placeholder="Նշեք բյուջե"
                                    style="306px"
                                    required={true}
                                    onChange={(e) => setBudget(e.target.value)}
                                />
                                <InputText
                                    title="Սենյակ*"
                                    placeholder="Նշեք սենյակների քանակ"
                                    style="306px"
                                    required={true}
                                    onChange={(e) => setRoom(e.target.value)}
                                />

                                <Text
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
                                    title="Պայմանագրի Համար"
                                    placeholder="Նշեք պայմանագրի համարը"
                                    style="306px"
                                    required={false}
                                    onChange={(e) => setContractNumber(e.target.value)}
                                />
                                <UploadFile
                                    // files={files}
                                    // handleUploadFile={handleUploadFile}
                                    // removeFile={removeFile}
                                />
                            </>
                        }
                    />

                    <Card
                        width="460px"
                        child={
                            <>
                                <AgentSelect
                                    title="Մասնագետ*"
                                    style="412px"
                                    required={true}
                                    onChange={(e) => setSpecialist(e.target.value)}
                                />
                                <SingleSelect
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
            </form>

            {displayed?.length
                ? <div className='addNewClient__displaylist'>
                    <h4>Ցուցադրված գույքեր</h4>

                    <ul className='addNewClient__displaylist-homes'>
                        {displayed?.map(({ id, home_id, street, community, surface, status }) => {
                            return (
                                <li>
                                    <div key={id}>
                                        <p># {home_id}</p>
                                        <p>{cutText(street, 15)}</p>
                                        <p>{community}</p>
                                        <p>{surface} ք․մ</p>
                                        <HomeStatus status={status} />
                                    </div>
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
                                const isAdded = displayed.some(home => home.id === id);

                                return (
                                    <li>
                                        <div key={id}>
                                            <p># {home_id}</p>
                                            <p>{cutText(street, 15)}</p>
                                            <p>{community}</p>
                                            <p>{surface} ք․մ</p>
                                            <HomeStatus status={status} />
                                        </div>
                                        {!isAdded && (
                                            <button onClick={() => addToDisplayed(id)}>
                                                {ownerAdd.icon}
                                            </button>
                                        )}
                                    </li>
                                )
                            })
                            : crmHomes?.slice(0, 15)?.map(({ id, home_id, street, community, surface, status }) => {
                                const isAdded = displayed.some(home => home.id === id);

                                return (
                                    <li>
                                        <div key={id}>
                                            <p># {home_id}</p>
                                            <p>{cutText(street, 15)}</p>
                                            <p>{community}</p>
                                            <p>{surface} ք․մ</p>
                                            <HomeStatus status={status} />
                                        </div>
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

export default AddClient

// const addToDisplayed = (id) => {
//     const selectedHome = crmHomes.find(home => home.id === id);

//     const exists = displayed.some(home => home.id === id);

//     if (exists) {
//         error('Տունն արդեն ավելացված է!');
//     } else {
//         setDisplayed(prevDisplayedHomes => [...prevDisplayedHomes, selectedHome]);
//     }
// };


// const uploadFormData = () => {
//     const formData = new FormData();
//     files.forEach((file, index) => {
//         formData.append(`file${index}`, file);
//     });
// };    