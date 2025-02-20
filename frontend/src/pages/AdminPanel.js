import { useState, useEffect } from "react"
import { 
  Container, Typography, List, ListItem, 
  ListItemText, ListItemSecondaryAction, Switch, CircularProgress 
} from "@mui/material"
import { getUsers, toggleUserStatus } from "../services/api"

function AdminPanel() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true) // Show loading state

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true) // Start loading
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false) // Stop loading
    }
  }

  const handleToggleStatus = async (userId) => {
    try {
      await toggleUserStatus(userId)
      setUsers((prevUsers) =>
        prevUsers.map(user =>
          user._id === userId ? { ...user, isEnabled: !user.isEnabled } : user
        )
      )
    } catch (error) {
      console.error("Error toggling user status:", error)
    }
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Admin Panel - User Management
      </Typography>

      {loading ? (
        <CircularProgress style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <List>
          {users.map((user) => (
            <ListItem key={user._id} divider>
              <ListItemText
                primary={user.email}
                secondary={`${user.firstName} ${user.lastName} - ${user.isEnabled ? "Enabled" : "Disabled"}`}
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  onChange={() => handleToggleStatus(user._id)}
                  checked={user.isEnabled}
                  color="primary"
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  )
}

export default AdminPanel
