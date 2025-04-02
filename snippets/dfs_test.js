function solution(n, computers) {
    var answer = 0;
    var visited = new Array(n).fill(false);

    function Dfs_route(node) {
        visited[node] = true;

        for (let i = 0; i < n; i++){
            if (computers[node][i] === 1 && !visited[i]) {
                Dfs_route(i)
            }
        }
    }

    let count = 0;

    for (let i = 0; i < n; i++){
            if (computers[node][i] === 1 && !visited[i]) {
                Dfs_route(i)
            }
        }


    
    return answer;
}


// n = number of computers
// computers = array of information which contains connecting info between computers