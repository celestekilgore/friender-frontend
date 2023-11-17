function Alert({ alerts, category }) {

    return (
        <div className={`mt-3 alert alert-${category}`}>
            {alerts.map((alert, i) =>
                <div key={i}>{alert}</div>
            )}
        </div>
    );
}

export default Alert;