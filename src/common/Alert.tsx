/** Alert component
 *
 * Props:
 * alerts: list of alerts like: ["Error: incorrect password"]
 * category: bootstrap alert category like "danger" or "success"
 *
 * { LoginForm, RegisterForm, GetPotentialFriend } --> Alert
 */

function Alert({ alerts, category }: { alerts: string[], category: string; }) {

    return (
        <div className={`mt-3 alert alert-${category}`}>
            {alerts.map((alert, i) =>
                <div key={i}>{alert}</div>
            )}
        </div>
    );
}

export default Alert;