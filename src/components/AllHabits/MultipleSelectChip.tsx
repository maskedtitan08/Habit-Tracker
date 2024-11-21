import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useGlobalContextProvider } from '@/contextAPI';
import { defaultColor } from '../../../color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

export default function MultipleSelectChip({ onChange }: { onChange: (selectedItems: any) => void }) {
    const theme = useTheme();
    const { allAreasObject } = useGlobalContextProvider();
    const { allAreas } = allAreasObject;
    const [selectedAreas, setSelectedAreas] = React.useState<string[]>([]);
    const [selectedAreasItems, setSelectedAreasItems] = React.useState<any>([]);

    const [personName, setPersonName] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof selectedAreas>) => {
        const {
            target: { value },
        } = event;
        setSelectedAreas(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const filteredAreas = allAreas.filter((area) => area.name !== "All");

    React.useEffect(()=>{
        const selectedAreaObjects = selectedAreas.map((selectedArea)=>{
            return allAreas.find((area) => area.name === selectedArea);
        })
        setSelectedAreasItems(selectedAreaObjects)
    },[selectedAreas])

    React.useEffect(() => {
        onChange(selectedAreasItems);
    }, [selectedAreasItems]);

    return (
        <div>
            <FormControl sx={{
                m: 1, width: "100%",
                "& .Mui-focused .MuiInputLabel-root": {
                    color: defaultColor.default,
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: defaultColor.default,
                },
            }}>
                <InputLabel id="demo-multiple-chip-label"
                    sx={{
                        "& .Mui-focused": {
                            color: defaultColor.default,
                        }
                    }}>Choose areas for habit..</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip"
                        sx={{
                            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: defaultColor.default,
                            },
                        }} />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {filteredAreas.map((area) => (
                        <MenuItem
                            key={area.id}
                            value={area.name}
                            style={getStyles(area.name, selectedAreas, theme)}
                        >
                            <FontAwesomeIcon className='text-red-500' icon={area.icon} style={{ marginRight: 8 }} />
                            {area.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
