"use client"

import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'
import LocationAutocomplete from './LocationAutocomplete'

const EmployeeForm = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        console.log(Object.fromEntries(fd.entries())); // itt benne lesz residence és current_location
    };


    const SubmitButton = () => {
        return (
            <div className='mt-8 flex justify-end gap-4'>
                <Button disabled={true} variant='default' type="submit">
                    Létrehozás
                </Button>
            </div>
        );
    };

    return (
        <div className="flex">
            <Card className="flex-1">
                <CardHeader>
                    <CardTitle>
                        <h2>Új dolgozó létrehozása</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent className="">
                    <form className="flex-1 flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className='space-y-4'>
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                                id="email"
                                name="email"
                                type="text"
                            // defaultValue={data?.data?.email || ''}
                            />
                        </div>
                        <div className="space-y-4">
                            <Label>Lakóhely</Label>
                            <LocationAutocomplete name="residence" placeholder="Lakóhely…" required />
                        </div>

                        <div className="space-y-4">
                            <Label>Tartózkodási hely</Label>
                            <LocationAutocomplete name="current_location" placeholder="Tartózkodási hely…" />
                        </div>
                        {/* <div className='space-y-4'>
                            <Label htmlFor="residence">Lakóhely</Label>
                            <Input
                                id="residence"
                                name="residence"
                                type="text"
                            // defaultValue={data?.data?.residence || ''}
                            />
                        </div>
                        <div className='space-y-4'>
                            <Label htmlFor="current_location">Tartózkodási hely</Label>
                            <Input
                                id="current_location"
                                name="current_location"
                                type="text"
                            // defaultValue={data?.data?.current_location || ''}
                            />
                        </div> */}
                        <div className="flex items-center gap-3">
                            <Checkbox id="has_driver_license" />
                            <Label htmlFor="has_driver_license">Van jogosítványa</Label>
                        </div>
                        <SubmitButton />
                        {/* <div className="mt-8 flex justify-end gap-4">
                            <Button variant="default" type="submit">
                                Létrehozás
                            </Button>
                        </div> */}
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default EmployeeForm