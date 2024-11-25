
import CCCDInfor from "./CCCDInfor"
import BoxAddNewBank from "./BoxAddNewBank"
import { FormEvent, memo } from "react"
import { toast } from "react-toastify"

const BankBox = ({
  handleBack,
  setfullNameErr,
  fullNameErr,
  loadingCCCDINF,
  Next,
  Default,
  loading,
  setNext,
  setBranchName,
  setNameBank,
  setSTK,
  setUserBankName,
  setCCCDNum,
  setfullName,
  setdisCheckIP,
  setStoreBank,
  setValueIPBank,
  setValueIPBranch,
  branchName,
  nameBank,
  STK,
  userBankName,
  CCCDNum,
  fullName,
  disCheckIP,
  StoreBank,
  ValueIPBank,
  ValueIPBranch,
  handleSend,
  handleUpdate,
  setDefault,
}: any) => {
  // --------------------------HANDLE BACK CCCD--------------------------------
  const handleBackCCCD = () => setNext(false)
  // --------------------------HANDLE SEND --------------------------------

  //--------------------------------HANDLE NEXT TO ADD NEW BANK----------------- -----
  const handleNext = (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()
    if (CCCDNum.length < 12) {
      toast.error("Số Căn Cước Công Dân không hợp lệ")
      return
    }
    setNext(true)
  }
  // --------------------------CHANGE EVENT --------------------------------
  const ChangeName = (value: string) => setUserBankName(value)
  const ChangeCCCDNum = (value: string) => {
    if (!value) {
      setCCCDNum(null)
      return
    }
    setCCCDNum(value)
  }
  //---------------------------------------RENDER ELEMENT-------------------
  return (
    <div className='fixed z-30 left-0 right-0 top-0 bottom-0'>
      {!Next ? (
        <CCCDInfor
          ChangeCCCDNum={ChangeCCCDNum}
          CCCDNum={CCCDNum}
          ChangeName={ChangeName}
          userBankName={userBankName}
          loading={loadingCCCDINF}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      ) : (
        <BoxAddNewBank
          setfullNameErr={setfullNameErr}
          fullNameErr={fullNameErr}
          setdisCheckIP={setdisCheckIP}
          setStoreBank={setStoreBank}
          setValueIPBank={setValueIPBank}
          setValueIPBranch={setValueIPBranch}
          StoreBank={StoreBank}
          ValueIPBank={ValueIPBank}
          ValueIPBranch={ValueIPBranch}
          visiAddbank={Next}
          handleBackCCCD={handleBackCCCD}
          disCheckIP={disCheckIP}
          STK={STK}
          Default={Default}
          setDefault={setDefault}
          setNameBank={setNameBank}
          setSTK={setSTK}
          setfullName={setfullName}
          setBranchName={setBranchName}
          fullName={fullName}
          nameBank={nameBank}
          branchName={branchName}
          loading={loading}
          handleUpdate={handleUpdate}
          handleSend={handleSend}
          handleBack={handleBack}
        />
      )}
    </div>
  )
}

export default BankBox
