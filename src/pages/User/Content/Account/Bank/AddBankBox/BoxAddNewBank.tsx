
import { FC, useState } from "react"
import { ListBanks } from "."
import { VietnameseRegex } from "../../../../../../components/regex/regex"
import InputCustom from "../../../../../../components/input/InputCustom"
import CheckInput from "../../../../../../components/input/CheckInput"
import BackBtn from "../../../../../../components/button/BackBtn"
import SendBtn from "../../../../../../components/button/SendBtn"
import UpdateBtn from "../../../../../../components/button/UpdateBtn"
import Cookies from "js-cookie"

const BoxAddNewBank: FC<any> = ({
  setStoreBank,
  setfullNameErr,
  fullNameErr,
  setDefault,
  Default,
  StoreBank,
  ValueIPBank,
  handleBackCCCD,
  disCheckIP,
  STK,
  setNameBank,
  setSTK,
  setfullName,
  setBranchName,
  fullName,
  nameBank,
  branchName,
  handleSend,
  handleBack,
  handleUpdate
}) => {
  const [showListBank, setShowListBank] = useState<boolean>(false)
  const [ShowListBranch, setShowListBranch] = useState<boolean>(false)
  const isUpdate = Cookies.get('bank_id')
  //--------------------------------HANDLE STORE BANK-------------------------
  const handleStoreBank = (e: { branches: string[]; bank: string }) => {
    setStoreBank(e.branches)
    setNameBank(e.bank)
    setShowListBank(false)
  }
  //--------------------------------HANDLE STORE BRANCH-------------------------
  const handleStoreBranch = (e: string) => {
    setBranchName(e)
    setShowListBranch(false)
  }
  //---------------------------------GET LIST BANK-------------------------
  const getListBank = ListBanks.map((item, index) => (
    <div
      key={index}
      className={`${ValueIPBank == item.bank ? "bg-green-500 text-white" : ""}  hover:bg-green-500 hover:text-white cursor-default text-sm items-left px-4 py-1`}
      onClick={() => handleStoreBank(item)}
    >
      {item.bank}
    </div>
  ))
  //---------------------------------GET LIST BRANCH-------------------------

  const getListBranch = StoreBank.map((item: string, index: number) => (
    <div
      key={index}
      onClick={() => handleStoreBranch(item)}
      className=' hover:bg-green-500 hover:text-white cursor-default text-sm items-left px-4 py-1'
    >
      {item}
    </div>
  ))
  //---------------------------------HANDLE TRANSFROM STATE -------------------------
  const handleShowListBank = () => setShowListBank(!showListBank)
  const handleShowListBranch = () => setShowListBranch(!ShowListBranch)
  //---------------------------------CHANGE EVENT -------------------------
  const ChangeNameBank = (value: string) => setNameBank(value)
  const ChangeSTK = (value: string) => setSTK(value)
  const ChangeFullName = (value: string) => {
    if (!VietnameseRegex.test(value) ) {
      setfullNameErr(true)
      if (value == "") setfullName("")
      return
    } else {
      setfullNameErr(false);
      setfullName(value)
    }
  }
   const handleCheckboxChange = () => {
    setDefault(!Default); // Đảo ngược giá trị của isChecked
  };
  const ChangeBranchName = (value: string) => setBranchName(value)
  return (
    <div className='absolute  h-[30rem]  top-12  left-1/3 w-[30rem] bg-white shadow rounded-sm px-4 py-2 overflow-y-auto border border-gray-200'>
      <div className='flex items-center'>
        <button className=' mr-3 text-xl text-gray-500' onClick={handleBackCCCD}>
          {
            <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
              <g fill='none' fillRule='evenodd'>
                <path d='M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z' />
                <path
                  fill='currentColor'
                  d='M7.94 13.06a1.5 1.5 0 0 1 0-2.12l5.656-5.658a1.5 1.5 0 1 1 2.121 2.122L11.122 12l4.596 4.596a1.5 1.5 0 1 1-2.12 2.122l-5.66-5.658Z'
                />
              </g>
            </svg>
          }
        </button>
        <h2 className='py-4 px-1 text-xl'>Thêm Tài Khoản Ngân Hàng</h2>
      </div>
      <form action='' onSubmit={handleSend} className=''>
        <div className='relative my-3.5'>
          <InputCustom
            required={true}
            placeHolder='Tên ngân hàng'
            handleClick={handleShowListBank}
            value={nameBank}
            changeValue={ChangeNameBank}
            cursor='cursor-pointer'
          />
          <p className='absolute top-3 right-2 text-black text-base'>
            {
              <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
                <g fill='none' fillRule='evenodd'>
                  <path d='M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z' />
                  <path
                    fill='currentColor'
                    d='M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z'
                  />
                </g>
              </svg>
            }
          </p>
          {showListBank && (
            <div className='h-[14rem] overflow-y-scroll absolute top-full bg-white shadow-md rounded-sm z-50 left-0 right-0'>
              {getListBank}
            </div>
          )}
          <p className={`text-[12px] absolute left-0.5 top-[-8px] z-20 px-1 text-black bg-white`}>
            Tên ngân hàng
          </p>
        </div>
        <div className='relative my-3.5'>
          <p className='absolute top-3 right-2 text-black text-base'>
            {
              <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
                <g fill='none' fillRule='evenodd'>
                  <path d='M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z' />
                  <path
                    fill='currentColor'
                    d='M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z'
                  />
                </g>
              </svg>
            }
          </p>
          <InputCustom
            placeHolder='Tên chi nhánh'
            value={branchName}
            required={true}
            handleClick={handleShowListBranch}
            changeValue={ChangeBranchName}
            cursor='cursor-pointer'
          />
          <p className={`text-[12px] absolute left-0.5 top-[-8px] z-20 px-1 text-black bg-white`}>
            Tên chi nhánh
          </p>
          {ShowListBranch && (
            <div className='h-[14rem] z-50 overflow-y-scroll absolute top-full bg-white shadow-md rounded-sm  left-0 right-0'>
              {getListBranch}
            </div>
          )}
        </div>
        <div className='relative my-3.5'>
          <InputCustom
            required={true}
            placeHolder='Số tài khoản'
            value={STK}
            changeValue={ChangeSTK}
            length={13}
          />
          <p className={`text-[12px] absolute left-0.5 top-[-8px] z-20 px-1 text-black bg-white`}>
            Số tài khoản
          </p>
        </div>
        <div className='relative my-3.5'>
          <InputCustom
            required={true}
            error={fullNameErr}
            placeHolder='Tên đầy đủ (viết in hoa, không dấu)'
            value={fullName}
            changeValue={ChangeFullName}
          />
          <p
            className={` ${fullNameErr ? "text-red-500" : ""} text-[12px] absolute left-0.5 top-[-8px] z-20 px-1 text-black bg-white`}
          >
            Tên đầy đủ
          </p>
          {fullNameErr && (
            <p className={`${fullNameErr ? "text-red-500" : ""} text-[12px] text-black`}>
              Tên phải viết HOA và KHÔNG CÓ DẤU
            </p>
          )}
        </div>

        <div className='flex items-center '>
          <CheckInput
            disable={disCheckIP}
            id='valueDefault'
            handleChange={handleCheckboxChange}
            checked={Default}
          />
          <label htmlFor='valueDefault' className='px-2 text-[12px] text-slate-700'>
            Đặt làm mặc định
          </label>
        </div>
        <div className='flex pt-28 justify-end'>
          <BackBtn handleBack={handleBack} />
          {isUpdate && (
            <button
              className='text-[13px] outline-none  hover:bg-green-600 px-6 py-2.5 bg-green-500 text-white hover:shadow border border-green-300 rounded-sm'
              onClick={handleUpdate}
            >
              Cập nhật
            </button>
          )}
          {!isUpdate && <SendBtn handleSend={handleSend} />}
        </div>
      </form>
    </div>
  )
}

export default BoxAddNewBank
