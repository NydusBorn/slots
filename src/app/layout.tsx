'use client'
import {Inter} from 'next/font/google'
import './globals.scss'
import {
    Box,
    Button,
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ThemeProvider,
    useMediaQuery,
    createTheme, Divider
} from "@mui/material";
import {Gamepad, Menu, Settings} from '@mui/icons-material';
import React from "react";
import { useRouter } from 'next/navigation';


const inter = Inter({subsets: ['latin']})

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: Readonly<React.ReactNode>
}>) {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const router = useRouter();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(() => createTheme({
        palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
        },
    }), [prefersDarkMode],);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <html lang="en">
            <body className={inter.className}>
            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} anchor={'left'}
            >
                <Box>
                    <List>
                        <ListItem>
                            <ListItemButton onClick={() => router.push('/game')}>
                                <ListItemIcon>
                                    <Gamepad/>
                                </ListItemIcon>
                                <ListItemText primary={'Game'}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={() => router.push('/settings')}>
                                <ListItemIcon>
                                    <Settings/>
                                </ListItemIcon>
                                <ListItemText primary={'Settings'}/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box sx={{height: '100vh', display: 'flex', flexDirection: 'row'}}>
                <Button variant={'outlined'} sx={{padding: '0', margin: '8px'}} onClick={() => setDrawerOpen(true)}>
                    <Menu/>
                </Button>
                <Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'column', borderRadius: '16px', padding: '16px', marginRight: '16px', marginTop: '8px', marginBottom: '8px', gap: '8px', backgroundColor: 'rgba(128, 128, 128, 0.2)'}}>
                    <Box sx={{height: '32px'}}>
                        <p>{window.location.pathname == '/game' ? 'Game' : 'Settings'}</p>
                    </Box>
                    <Divider/>
                    {children}
                </Box>

            </Box>
            </body>
            </html>
        </ThemeProvider>
)
}
