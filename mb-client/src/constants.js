const constants = {
    colors: {
        blue: '#01bded',
        yellow: '#e8e80e',
        red: '#e41312',
        green: '#29ba7a',
        orange: '#ff7d00',
        purple: '#bd4cf8',
    },
    rarities: {
        common: '#8f764c',
        uncommon: '#adaca9',
        rare: '#fff300',
        mythic: '#2ec7f5',
    },
    raritiesBackground: {
        common: '#8f764c',
        uncommon: '#adaca9',
        rare: '#c9c201',
        mythic: '#2ec7f5',
    },
    gems: {
        b: '#01bded',
        y: '#e8e80e',
        r: '#e41312',
        g: '#29ba7a',
        o: '#ff7d00',
        p: '#bd4cf8',
    },
    styleSelect:  {
        control: base => ({...base, minHeight: 40 }),
        container: base => ({...base}),
        menu: base => ({...base, color: '#000', zIndex: 100}),
        multiValue: base => ({...base, color: '#000', fontSize: 18}),
    },
}
export default constants;