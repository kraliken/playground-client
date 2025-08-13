import EmployeeForm from '@/components/roadrecorder/EmployeeForm'
import React from 'react'

const CreateEmployeePage = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EmployeeForm />
            <div>Új dolgozók létrehozása (import)</div>
        </div>
    )
}

export default CreateEmployeePage