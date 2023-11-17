function Alert({ alerts, category }) {

    return (
        <div className={`mt-3 alert alert-${category}`}>
            {Object.keys(alerts).map((alert, i) =>
                <div key={i}>{alert}: {alerts[alert][0]}</div>
            )}
        </div>
    );
}

export default Alert;