
import { FormEvent, useEffect, useState } from "react"
import BankBox from "./AddBankBox/BankBox"
import BankAccounts from "./BankAccounts/BankAccounts"
// import CardAccounts from "./CardAccounts/CardAccounts"
// import AddCreditCard from "../../../../../components/button/AddCreditCard"
// import CardBox from "./CardBox"
import AddBankCard from "../../../../../components/button/AddBankcart"
import { useDispatch } from "react-redux"
import { setLoading } from "../../../../../store/PageSlice"
import { toast } from "react-toastify"
import Cookies from "js-cookie"
import SummaryApi from "../../../../../common"
import axios from "axios"
import { BankType } from "../../../../../typescript/customerType"
export const PageBank = () => {
  // const [showAddCart, setShowAddCart] = useState<boolean>(false)
  const [showBankACC, setShowBankACC] = useState<boolean>(false)
  const userid = Cookies.get("id")
  const token = Cookies.get("token")
  const dispatch = useDispatch()
  const [UserBank, setUserBank] = useState<BankType[]>([])
  // const [UserCard, setUserCard] = useState<object[]>()
  //------------------------------------ CARD BOX STATE---------------------------------
  // const [cardNum, setCardNum] = useState<string>("")
  // const [valueDay, setValueDay] = useState<string>("")
  // const [codeCvv, setCodeCvv] = useState<string>("")
  // const [CardName, setCardName] = useState<string>("")
  // const [address, setAddress] = useState<string>("")
  // const [primaryCode, setPrimaryCode] = useState<string>("")
  // const [cardErr, setCardErr] = useState<boolean>(false)
  // const [codeCvvErr, setCodeCvvErr] = useState<boolean>(false)
  // const [loadingCard, setloadingCard] = useState<boolean>(false)
  // const [NameErr, setNameErr] = useState<boolean>(false)
  // const [primaryPostErr, setprimaryPostErr] = useState<boolean>(false)

  //---------------------------------- BANK BOX STATE-------------------------
  const [loadingCCCDINF, setloadingCCCDINF] = useState<boolean>(false)
  const [loadingBank, setLoadingBank] = useState<boolean>(false)
  const [Next, setNext] = useState<boolean>(false)
  const [branchName, setBranchName] = useState<string>("")
  const [nameBank, setNameBank] = useState<string>("")
  const [userBankName, setUserBankName] = useState<string>("")
  const [CCCDNum, setCCCDNum] = useState<number| null>()
  const [fullName, setfullName] = useState<string>("")
  const [disCheckIP, setdisCheckIP] = useState<boolean>(false)
  const [Default, setDefault] = useState<boolean |null>(false)
  const [fullNameErr, setfullNameErr] = useState<boolean>(false)
  const [StoreBank, setStoreBank] = useState<string[]>([])
  const [ValueIPBank, setValueIPBank] = useState<string>("")
  const [ValueIPBranch, setValueIPBranch] = useState<string>("")
  const [STK, setSTK] = useState<number| null>()
  //--------------------------HANDLE STORE CARD ----------------------------
  // const HandleStoreCard = (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    // e.preventDefault()
    // if (!checkMissValue()) return
    // const dataCard = {
    //   cardnumber: cardNum,
    //   exp_day: valueDay,
    //   codecvv: codeCvv,
    //   first_lastname: CardName,
    //   address: address,
    //   primaryCode: primaryCode,
    //   userid: dataUser?.userid as number,
    // }
    // setloadingCard(true)
    // StoreUserCard(dataCard)
    //   .then(res => {
    //     console.log(res)
    //     const logCuccess = res ? res.data.message : "Lưu thành công"
    //     setloadingCard(false)
    //     handleBackCard()
    //     setUserCard(res.data.data)
    //     handleCuccessLabel(logCuccess, 600, setMessageLabel, setVisiCuccessLabel)
    //     setShowAddCart(false)
    //   })
    //   .catch(err => {
    //     const logErr = err ? err.response.data.message : "lỗi hệ thống"
    //     setloadingCard(false)
    //     handleFailLabel(logErr, 600, setMessageLabel, setVisilFailLabel)
    //   })
  // }
  //--------------------------HANDLE STORE BANK ----------------------------
  const fetchUserBank = async () => {
      dispatch(setLoading(true))
   
   try {
     const dataResponse = await axios.get(SummaryApi.get_bank.url + "/" + userid, {
       headers: {
         accept: "application/json",
         Authorization: `Bearer ${token}`,
       },
     })
     if (dataResponse.status === 200) { 
      dispatch(setLoading(false))
       
        const bank = dataResponse?.data?.data
       setUserBank(bank)
     }
   } catch (error) {
      dispatch(setLoading(false))
     
     console.error("Error fetching user details:", error)
   }
  }
 
  const RemoveBankACC = async (bank_id: number) => {
    dispatch(setLoading(true))
      try {
        const dataResponse = await axios.delete(SummaryApi.remove_bank.url + "/" + bank_id, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        if (dataResponse.status === 200) {
          dispatch(setLoading(false))
          Cookies.remove('bank_id')
          fetchUserBank()
         toast.success('Xoá Ngân Hàng Thành Công')
        }
      } catch (error) {
    dispatch(setLoading(false))
        console.error("Error fetching user details:", error)
      }
    }
      useEffect(() => {
        fetchUserBank()
      }, [])
  const handleStoreBank = async(e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()
    if (nameBank === "") {
      toast.error("Chưa chọn tên ngân hàng")
      return
    }
    if (branchName === "") {
      toast.error("Chưa chọn tên chi nhánh")
      return
    }
    if (!STK) {
      toast.error("Số tài khoản không bỏ trống")
      return
    }
    if (!/^\d{8,14}$/.test(String(STK))) {
      toast.error("Số tài khoản không hợp lệ")
      return
    }
      if (fullName === "") {
        toast.error("không bỏ trống Tên đầy đủ")
        return
    }
    const dataBank = {
      customer_id: userid,
      name: fullName,
      bank_name: nameBank,
      cccd: CCCDNum,
      branch_name: branchName,
      stk: STK,
      default: Default ? 1 : 0,
    }
    
    dispatch(setLoading(true));
    try {
      const response = await axios.post(SummaryApi.add_bank.url, dataBank, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
      if (response.status === 201) {
        toast.success(response.data.cuccess)
        fetchUserBank()
        dispatch(setLoading(false))
        //clear state
        handleBackBank()
      }
    } catch (error: any) {
      dispatch(setLoading(false))
      console.log(error)
      if (error.response) {
        toast.error(
          error.response?.data.error ||
            error.response?.data?.error ||
            "Lưu thất bại",
        )
      } else if (error.request) {
        // Request was made but no response was received
        toast.error("server không phản hồi.")
      } else {
        // Something else happened
        toast.error("có lỗi xảy ra.")
      }
    }
  }
  // -------------------------------- HANDLE BACK USER CARD AND USER BANK----------------------------
  // const handleBackCard = () => {
  //   setShowAddCart(false)
  //   setCardNum("")
  //   setValueDay("")
  //   setCodeCvv("")
  //   setCardName("")
  //   setAddress("")
  //   setPrimaryCode("")
  //   setCardErr(false)
  //   setCodeCvvErr(false)
  //   setloadingCard(false)
  //   setNameErr(false)
  //   setprimaryPostErr(false)
  // }
  const handleBackBank = () => {
    setShowBankACC(false)
    setloadingCCCDINF(false)
    setLoadingBank(false)
    setNext(false)
    setBranchName("")
    setNameBank("")
    setSTK(null)
    setUserBankName("")
    setCCCDNum(null)
    setfullName("")
    setdisCheckIP(false)
    setStoreBank([])
    setValueIPBank("")
    setValueIPBranch("")
    setNext(false)
    setDefault(false)
  }
  // --------------------------- HANDLE SHOW CARD BOX , BANK BOX --------------------------
  // const handleShowCard = () => {
  //   setLoading(true)
  //   setTimeout(() => {
  //     setLoading(false)
  //     setShowAddCart(true)
  //   }, 500)
  // }
  const handleUpdate = async (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const bank_id = JSON.parse(Cookies.get("bank_id") || "")
    const dataBank = {
      customer_id: userid,
      name: fullName,
      bank_name: nameBank,
      cccd: CCCDNum,
      branch_name: branchName,
      stk: STK,
      default: Default ? 1 : 0,
    }
     dispatch(setLoading(true))
     try {
       const response = await axios.post(SummaryApi.edit_bank.url + "/" + bank_id, dataBank, {
         headers: {
           "Content-Type": "application/json",
           Accept: "application/json",
           Authorization: `Bearer ${token}`,
         },
       })

       if (response.status === 200) {
         toast.success(response.data.cuccess)
         fetchUserBank()
         Cookies.remove("bank_id")
         dispatch(setLoading(false))
         //clear state
         handleBackBank()
       }
     } catch (error: any) {
       dispatch(setLoading(false))
       console.log(error)
       if (error.response) {
         toast.error(error.response?.data.error || error.response?.data?.error || "Lưu thất bại")
       } else if (error.request) {
         // Request was made but no response was received
         toast.error("server không phản hồi.")
       } else {
         // Something else happened
         toast.error("có lỗi xảy ra.")
       }
    }
  }
  const handleShowEdit = (bank_id: number) => {
    Cookies.set("bank_id", JSON.stringify(bank_id))
    const bank:BankType |any = UserBank?.find((bank: BankType) => bank.id === bank_id)
      setNameBank(bank?.bank_name)
      setCCCDNum(bank?.cccd)
      setBranchName(bank?.branch_name)
      setDefault(bank?.default)
      setSTK(bank?.stk)
      setfullName(bank?.name)
      setShowBankACC(true)
  }
  const HandleShowBank = () => {
          Cookies.remove("bank_id")
      setShowBankACC(true)
  }
  // const checkMissValue = () => {
  //   if (cardNum == "" || codeCvv == "" || valueDay == "" || address == "" || primaryCode == "") {
  //     setCardErr(true)
  //     setCodeCvvErr(true)
  //     setNameErr(true)
  //     setprimaryPostErr(true)
  //     return false
  //   }
  //   return true
  // }
  // const RemoveCardACC = (id: number, userid: number) => {}
  //--------------------------RENDER ELEMENT ----------------------------
  return (
    <section className='h-full bg-white w-full p-4'>
      {/* <nav className='flex justify-between px-2  border-b py-2  border-slate-400'> */}
      {/* <h2 className=' text-black text-lg'>Thẻ Tín Dụng/Ghi Nợ</h2> */}
      {/*------------------BUTTON SHOW ADD CREDIT CARD--------------- */}
      {/* <AddCreditCard handleAddCreditCart={handleShowCard} /> */}
      {/* </nav> */}
      {/* {UserCard && UserCard.length > 0 ? ( */}
      {/* <CardAccounts RemoveCardACC={RemoveCardACC} data={UserCard} /> */}
      {/* ) : ( */}
      {/* <p className='py-20 uppercase flex items-center justify-center'>Chưa có thẻ nào.</p> */}
      {/* )} */}
      {/*------------------------ SHOW ADD CARD ------------------------*/}
      {/* {showAddCart && (
        <CardBox
          handleSend={HandleStoreCard}
          loading={loadingCard}
          cardNum={cardNum}
          valueDay={valueDay}
          codeCvv={codeCvv}
          Name={CardName}
          address={address}
          primaryCode={primaryCode}
          cardErr={cardErr}
          setCardNum={setCardNum}
          setValueDay={setValueDay}
          setCodeCvv={setCodeCvv}
          setName={setCardName}
          setAddress={setAddress}
          setPrimaryCode={setPrimaryCode}
          setCardErr={setCardErr}
          setCodeCvvErr={setCodeCvvErr}
          setNameErr={setNameErr}
          setprimaryPostErr={setprimaryPostErr}
          codeCvvErr={codeCvvErr}
          NameErr={NameErr}
          primaryPostErr={primaryPostErr}
          handleBack={handleBackCard}
        />
      )} */}
      {/*------------------------ SHOW CREDIT CARD ------------------------*/}
      {showBankACC && (
        <BankBox
          setfullNameErr={setfullNameErr}
          fullNameErr={fullNameErr}
          handleSend={handleStoreBank}
          handleBack={handleBackBank}
          loadingCCCDINF={loadingCCCDINF}
          loading={loadingBank}
          Next={Next}
          setloadingCCCDINF={setloadingCCCDINF}
          setNext={setNext}
          setBranchName={setBranchName}
          setNameBank={setNameBank}
          setSTK={setSTK}
          setUserBankName={setUserBankName}
          setCCCDNum={setCCCDNum}
          setfullName={setfullName}
          setdisCheckIP={setdisCheckIP}
          setStoreBank={setStoreBank}
          setValueIPBank={setValueIPBank}
          setValueIPBranch={setValueIPBranch}
          branchName={branchName}
          nameBank={nameBank}
          STK={STK}
          Default={Default}
          setDefault={setDefault}
          handleUpdate={handleUpdate}
          userBankName={userBankName}
          CCCDNum={CCCDNum}
          fullName={fullName}
          disCheckIP={disCheckIP}
          StoreBank={StoreBank}
          ValueIPBank={ValueIPBank}
          ValueIPBranch={ValueIPBranch}
        />
      )}
      <div className=' border-b border-slate-400 mt-10  pb-3 '>
        <nav className='flex items-center justify-between px-2'>
          <p>Tài Khoản Ngân Hàng Của Tôi</p>
          {/*------------------BUTTON SHOW ADD NEW BANK--------------- */}
          <AddBankCard handleAddBank={HandleShowBank} />
        </nav>
      </div>
      {UserBank && UserBank.length > 0 ? (
        <BankAccounts handleRemove={RemoveBankACC} handleEdit={handleShowEdit} data={UserBank} />
      ) : (
        <p className='py-20 text-3xl font-medium  uppercase flex items-center justify-center'>
          Chưa có tài khoản NGÂN HÀNG.
        </p>
      )}
    </section>
  )
}
export default PageBank
