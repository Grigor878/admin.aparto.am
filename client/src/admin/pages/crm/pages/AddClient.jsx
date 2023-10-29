/* eslint-disable react/style-prop-object */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import AddPart from '../../../components/addPart/AddPart'
import { Card } from '../../properties/components/card/Card';
import { InputText } from '../../properties/components/inputs/InputText';
import { InputNum } from '../../properties/components/inputs/InputNum';
import { MultiSelect } from '../../properties/components/dropdowns/MultiSelect';
import { TextLarg } from '../../properties/components/inputs/TextLarg';
import { AgentSelect } from '../../properties/components/asyncSelects/AgentSelect';
import { SingleSelect } from '../components/SingleSelect';
import { UploadFile } from '../components/UploadFile';
import { deals, proptypes, statuses } from './data';
import './styles.scss'
import { addCrmUser } from '../../../../store/slices/crmSlice';

const AddClient = () => {
    const dispatch = useDispatch()

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
    const [files, setFiles] = useState([])
    const [specialist, setSpecialist] = useState("")
    const [status, setStatus] = useState("")

    const handleUploadFile = (e) => {
        const filesArray = Array.from(e.target.files);

        const uniqueFiles = filesArray.filter((file) => {
            return !files.some((uploadedFile) => uploadedFile.name === file.name);
        });

        setFiles((prev) => [...prev, ...uniqueFiles]);
    };

    const removeFile = (file) => {
        setFiles((prev) => prev.filter((uploadedFile) => uploadedFile !== file));
    };

    const uploadFormData = () => {
        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`file${index}`, file);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // const data = {
        //     name, phone, email, source, deal, propertyType, room, budget, comment, files, contractNumber, specialist, status
        // }

        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`file${index}`, file);
        })

        const data = {
            name,
            phone,
            email,
            source,
            deal,
            propertyType,
            room,
            budget,
            comment,
            contractNumber,
            specialist,
            status,
            formData
        };

        console.log(data);//

        dispatch(addCrmUser(data))


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

                                <TextLarg
                                    // value={arm}
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
                                    files={files}
                                    handleUploadFile={handleUploadFile}
                                    removeFile={removeFile}
                                    uploadFormData={uploadFormData}
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
        </article>
    )
}

export default AddClient