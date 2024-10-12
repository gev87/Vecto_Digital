import { useState } from "react";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import styles from "./MyDrawer.module.css";
import { BOTTOM_MENU_ITEMS, MENU_ITEMS, USER_NAME } from "./constants";
import clsx from "clsx";
import { Avatar } from "@mui/material";

const MyDrawer = () => {
	const [open, setOpen] = useState(false);
	const [activeIcon,setActiveIcon] = useState(MENU_ITEMS[1]);
	

	return (
		<Box>
			<MuiDrawer
				variant="permanent"
				classes={{
					root: styles.drawerRoot,
					paper: open ? styles.drawerOpen : styles.drawerClose,
				}}
				onMouseOver={() => setOpen(true)}
				onMouseOut={() => setOpen(false)}
			>
				{" "}
				<Box className={styles.drawerContent}>
					{open && (
						<Box className={styles.avatar}>
							<Avatar alt="Gevorg Petrosyan" src="/assets/images/avatar.jpeg" /> {USER_NAME}
						</Box>
					)}
					<List className={styles.list}>
						{MENU_ITEMS.map((text) => (
							<ListItem key={text} disablePadding className={styles.listItem}>
								<ListItemButton
									className={clsx(styles.listItemButton, {
										[styles.activeIcon]: text === activeIcon,
									})}
									onClick={() => setActiveIcon(text)}
								>
									<ListItemIcon className={styles.listItemIcon}>
										<img src={`/assets/icons/${text}.png`} alt={text} />
									</ListItemIcon>
									{open && <ListItemText primary={text} className={styles.listItemText} />}
								</ListItemButton>
							</ListItem>
						))}
					</List>
					{open && (
						<List>
							{BOTTOM_MENU_ITEMS.map((text) => (
								<ListItem key={text} disablePadding className={styles.listItemGray}>
									<ListItemButton className={styles.listItemButton}>
										<ListItemText primary={text} />
									</ListItemButton>
								</ListItem>
							))}
						</List>
					)}
				</Box>
			</MuiDrawer>
		</Box>
	);
};

export default MyDrawer;
