package pl.volt.tuner;

interface IShellService {
    /** Wymagane przez serwer Shizuku — nie zmieniać kodu transakcji. */
    void destroy() = 16777114;

    /** Wykonuje `sh -c <command>` jako uid shell. */
    String exec(String command) = 1;
}
