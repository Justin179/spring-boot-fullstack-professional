import React from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from "reactstrap";

const EditEntry = () => {

    return (
        <Form id="form1">
            <FormGroup>
                <input type="hidden" name="entryId" value=""/>
                <Label>Content</Label>
                <Input type="text" value="" name="content" placeholder="Enter content" required></Input>
            </FormGroup>
            <Button type="submit">Submit</Button>

        </Form>
    )
}

export default EditEntry;