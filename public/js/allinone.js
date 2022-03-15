(function () {
    var n = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
        i = "sizcache" + (Math.random() + "").replace(".", ""),
        o = 0,
        r = Object.prototype.toString,
        h = false,
        g = true,
        q = /\\/g,
        u = /\r\n/g,
        w = /\W/;
    [0, 0].sort(function () {
        g = false;
        return 0
    });
    var d = function (D, e, G, H) {
        G = G || [];
        e = e || document;
        var J = e;
        if (e.nodeType !== 1 && e.nodeType !== 9) {
            return []
        }
        if (!D || typeof D !== "string") {
            return G
        }
        var A, L, O, z, K, N, M, F, C = true,
            B = d.isXML(e),
            E = [],
            I = D;
        do {
            n.exec("");
            A = n.exec(I);
            if (A) {
                I = A[3];
                E.push(A[1]);
                if (A[2]) {
                    z = A[3];
                    break
                }
            }
        } while (A);
        if (E.length > 1 && j.exec(D)) {
            if (E.length === 2 && k.relative[E[0]]) {
                L = s(E[0] + E[1], e, H)
            } else {
                L = k.relative[E[0]] ? [e] : d(E.shift(), e);
                while (E.length) {
                    D = E.shift();
                    if (k.relative[D]) {
                        D += E.shift()
                    }
                    L = s(D, L, H)
                }
            }
        } else {
            if (!H && E.length > 1 && e.nodeType === 9 && !B && k.match.ID.test(E[0]) && !k.match.ID.test(E[E.length - 1])) {
                K = d.find(E.shift(), e, B);
                e = K.expr ? d.filter(K.expr, K.set)[0] : K.set[0]
            }
            if (e) {
                K = H ? {
                    expr: E.pop(),
                    set: l(H)
                } : d.find(E.pop(), E.length === 1 && (E[0] === "~" || E[0] === "+") && e.parentNode ? e.parentNode : e, B);
                L = K.expr ? d.filter(K.expr, K.set) : K.set;
                if (E.length > 0) {
                    O = l(L)
                } else {
                    C = false
                }
                while (E.length) {
                    N = E.pop();
                    M = N;
                    if (!k.relative[N]) {
                        N = ""
                    } else {
                        M = E.pop()
                    }
                    if (M == null) {
                        M = e
                    }
                    k.relative[N](O, M, B)
                }
            } else {
                O = E = []
            }
        }
        if (!O) {
            O = L
        }
        if (!O) {
            d.error(N || D)
        }
        if (r.call(O) === "[object Array]") {
            if (!C) {
                G.push.apply(G, O)
            } else {
                if (e && e.nodeType === 1) {
                    for (F = 0; O[F] != null; F++) {
                        if (O[F] && (O[F] === true || O[F].nodeType === 1 && d.contains(e, O[F]))) {
                            G.push(L[F])
                        }
                    }
                } else {
                    for (F = 0; O[F] != null; F++) {
                        if (O[F] && O[F].nodeType === 1) {
                            G.push(L[F])
                        }
                    }
                }
            }
        } else {
            l(O, G)
        }
        if (z) {
            d(z, J, G, H);
            d.uniqueSort(G)
        }
        return G
    };
    d.uniqueSort = function (z) {
        if (p) {
            h = g;
            z.sort(p);
            if (h) {
                for (var e = 1; e < z.length; e++) {
                    if (z[e] === z[e - 1]) {
                        z.splice(e--, 1)
                    }
                }
            }
        }
        return z
    };
    d.matches = function (e, z) {
        return d(e, null, null, z)
    };
    d.matchesSelector = function (e, z) {
        return d(z, null, null, [e]).length > 0
    };
    d.find = function (F, e, G) {
        var E, A, C, B, D, z;
        if (!F) {
            return []
        }
        for (A = 0, C = k.order.length; A < C; A++) {
            D = k.order[A];
            if ((B = k.leftMatch[D].exec(F))) {
                z = B[1];
                B.splice(1, 1);
                if (z.substr(z.length - 1) !== "\\") {
                    B[1] = (B[1] || "").replace(q, "");
                    E = k.find[D](B, e, G);
                    if (E != null) {
                        F = F.replace(k.match[D], "");
                        break
                    }
                }
            }
        }
        if (!E) {
            E = typeof e.getElementsByTagName !== "undefined" ? e.getElementsByTagName("*") : []
        }
        return {
            set: E,
            expr: F
        }
    };
    d.filter = function (J, I, M, C) {
        var E, e, H, O, L, z, B, D, K, A = J,
            N = [],
            G = I,
            F = I && I[0] && d.isXML(I[0]);
        while (J && I.length) {
            for (H in k.filter) {
                if ((E = k.leftMatch[H].exec(J)) != null && E[2]) {
                    z = k.filter[H];
                    B = E[1];
                    e = false;
                    E.splice(1, 1);
                    if (B.substr(B.length - 1) === "\\") {
                        continue
                    }
                    if (G === N) {
                        N = []
                    }
                    if (k.preFilter[H]) {
                        E = k.preFilter[H](E, G, M, N, C, F);
                        if (!E) {
                            e = O = true
                        } else {
                            if (E === true) {
                                continue
                            }
                        }
                    }
                    if (E) {
                        for (D = 0;
                            (L = G[D]) != null; D++) {
                            if (L) {
                                O = z(L, E, D, G);
                                K = C ^ O;
                                if (M && O != null) {
                                    if (K) {
                                        e = true
                                    } else {
                                        G[D] = false
                                    }
                                } else {
                                    if (K) {
                                        N.push(L);
                                        e = true
                                    }
                                }
                            }
                        }
                    }
                    if (O !== undefined) {
                        if (!M) {
                            G = N
                        }
                        J = J.replace(k.match[H], "");
                        if (!e) {
                            return []
                        }
                        break
                    }
                }
            }
            if (J === A) {
                if (e == null) {
                    d.error(J)
                } else {
                    break
                }
            }
            A = J
        }
        return G
    };
    d.error = function (e) {
        throw new Error("Syntax error, unrecognized expression: " + e)
    };
    var b = d.getText = function (C) {
        var A, B, e = C.nodeType,
            z = "";
        if (e) {
            if (e === 1 || e === 9 || e === 11) {
                if (typeof C.textContent === "string") {
                    return C.textContent
                } else {
                    if (typeof C.innerText === "string") {
                        return C.innerText.replace(u, "")
                    } else {
                        for (C = C.firstChild; C; C = C.nextSibling) {
                            z += b(C)
                        }
                    }
                }
            } else {
                if (e === 3 || e === 4) {
                    return C.nodeValue
                }
            }
        } else {
            for (A = 0;
                (B = C[A]); A++) {
                if (B.nodeType !== 8) {
                    z += b(B)
                }
            }
        }
        return z
    };
    var k = d.selectors = {
        order: ["ID", "NAME", "TAG"],
        match: {
            ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
            CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
            NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
            ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
            TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
            CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
            POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
            PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
        },
        leftMatch: {},
        attrMap: {
            "class": "className",
            "for": "htmlFor"
        },
        attrHandle: {
            href: function (e) {
                return e.getAttribute("href")
            },
            type: function (e) {
                return e.getAttribute("type")
            }
        },
        relative: {
            "+": function (E, z) {
                var B = typeof z === "string",
                    D = B && !w.test(z),
                    F = B && !D;
                if (D) {
                    z = z.toLowerCase()
                }
                for (var A = 0, e = E.length, C; A < e; A++) {
                    if ((C = E[A])) {
                        while ((C = C.previousSibling) && C.nodeType !== 1) {}
                        E[A] = F || C && C.nodeName.toLowerCase() === z ? C || false : C === z
                    }
                }
                if (F) {
                    d.filter(z, E, true)
                }
            },
            ">": function (E, z) {
                var D, C = typeof z === "string",
                    A = 0,
                    e = E.length;
                if (C && !w.test(z)) {
                    z = z.toLowerCase();
                    for (; A < e; A++) {
                        D = E[A];
                        if (D) {
                            var B = D.parentNode;
                            E[A] = B.nodeName.toLowerCase() === z ? B : false
                        }
                    }
                } else {
                    for (; A < e; A++) {
                        D = E[A];
                        if (D) {
                            E[A] = C ? D.parentNode : D.parentNode === z
                        }
                    }
                    if (C) {
                        d.filter(z, E, true)
                    }
                }
            },
            "": function (B, z, D) {
                var C, A = o++,
                    e = t;
                if (typeof z === "string" && !w.test(z)) {
                    z = z.toLowerCase();
                    C = z;
                    e = a
                }
                e("parentNode", z, A, B, C, D)
            },
            "~": function (B, z, D) {
                var C, A = o++,
                    e = t;
                if (typeof z === "string" && !w.test(z)) {
                    z = z.toLowerCase();
                    C = z;
                    e = a
                }
                e("previousSibling", z, A, B, C, D)
            }
        },
        find: {
            ID: function (z, A, B) {
                if (typeof A.getElementById !== "undefined" && !B) {
                    var e = A.getElementById(z[1]);
                    return e && e.parentNode ? [e] : []
                }
            },
            NAME: function (A, D) {
                if (typeof D.getElementsByName !== "undefined") {
                    var z = [],
                        C = D.getElementsByName(A[1]);
                    for (var B = 0, e = C.length; B < e; B++) {
                        if (C[B].getAttribute("name") === A[1]) {
                            z.push(C[B])
                        }
                    }
                    return z.length === 0 ? null : z
                }
            },
            TAG: function (e, z) {
                if (typeof z.getElementsByTagName !== "undefined") {
                    return z.getElementsByTagName(e[1])
                }
            }
        },
        preFilter: {
            CLASS: function (B, z, A, e, E, F) {
                B = " " + B[1].replace(q, "") + " ";
                if (F) {
                    return B
                }
                for (var C = 0, D;
                    (D = z[C]) != null; C++) {
                    if (D) {
                        if (E ^ (D.className && (" " + D.className + " ").replace(/[\t\n\r]/g, " ").indexOf(B) >= 0)) {
                            if (!A) {
                                e.push(D)
                            }
                        } else {
                            if (A) {
                                z[C] = false
                            }
                        }
                    }
                }
                return false
            },
            ID: function (e) {
                return e[1].replace(q, "")
            },
            TAG: function (z, e) {
                return z[1].replace(q, "").toLowerCase()
            },
            CHILD: function (e) {
                if (e[1] === "nth") {
                    if (!e[2]) {
                        d.error(e[0])
                    }
                    e[2] = e[2].replace(/^\+|\s*/g, "");
                    var z = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(e[2] === "even" && "2n" || e[2] === "odd" && "2n+1" || !/\D/.test(e[2]) && "0n+" + e[2] || e[2]);
                    e[2] = (z[1] + (z[2] || 1)) - 0;
                    e[3] = z[3] - 0
                } else {
                    if (e[2]) {
                        d.error(e[0])
                    }
                }
                e[0] = o++;
                return e
            },
            ATTR: function (C, z, A, e, D, E) {
                var B = C[1] = C[1].replace(q, "");
                if (!E && k.attrMap[B]) {
                    C[1] = k.attrMap[B]
                }
                C[4] = (C[4] || C[5] || "").replace(q, "");
                if (C[2] === "~=") {
                    C[4] = " " + C[4] + " "
                }
                return C
            },
            PSEUDO: function (C, z, A, e, D) {
                if (C[1] === "not") {
                    if ((n.exec(C[3]) || "").length > 1 || /^\w/.test(C[3])) {
                        C[3] = d(C[3], null, null, z)
                    } else {
                        var B = d.filter(C[3], z, A, true ^ D);
                        if (!A) {
                            e.push.apply(e, B)
                        }
                        return false
                    }
                } else {
                    if (k.match.POS.test(C[0]) || k.match.CHILD.test(C[0])) {
                        return true
                    }
                }
                return C
            },
            POS: function (e) {
                e.unshift(true);
                return e
            }
        },
        filters: {
            enabled: function (e) {
                return e.disabled === false && e.type !== "hidden"
            },
            disabled: function (e) {
                return e.disabled === true
            },
            checked: function (e) {
                return e.checked === true
            },
            selected: function (e) {
                if (e.parentNode) {
                    e.parentNode.selectedIndex
                }
                return e.selected === true
            },
            parent: function (e) {
                return !!e.firstChild
            },
            empty: function (e) {
                return !e.firstChild
            },
            has: function (A, z, e) {
                return !!d(e[3], A).length
            },
            header: function (e) {
                return (/h\d/i).test(e.nodeName)
            },
            text: function (A) {
                var e = A.getAttribute("type"),
                    z = A.type;
                return A.nodeName.toLowerCase() === "input" && "text" === z && (e === z || e === null)
            },
            radio: function (e) {
                return e.nodeName.toLowerCase() === "input" && "radio" === e.type
            },
            checkbox: function (e) {
                return e.nodeName.toLowerCase() === "input" && "checkbox" === e.type
            },
            file: function (e) {
                return e.nodeName.toLowerCase() === "input" && "file" === e.type
            },
            password: function (e) {
                return e.nodeName.toLowerCase() === "input" && "password" === e.type
            },
            submit: function (z) {
                var e = z.nodeName.toLowerCase();
                return (e === "input" || e === "button") && "submit" === z.type
            },
            image: function (e) {
                return e.nodeName.toLowerCase() === "input" && "image" === e.type
            },
            reset: function (z) {
                var e = z.nodeName.toLowerCase();
                return (e === "input" || e === "button") && "reset" === z.type
            },
            button: function (z) {
                var e = z.nodeName.toLowerCase();
                return e === "input" && "button" === z.type || e === "button"
            },
            input: function (e) {
                return (/input|select|textarea|button/i).test(e.nodeName)
            },
            focus: function (e) {
                return e === e.ownerDocument.activeElement
            }
        },
        setFilters: {
            first: function (z, e) {
                return e === 0
            },
            last: function (A, z, e, B) {
                return z === B.length - 1
            },
            even: function (z, e) {
                return e % 2 === 0
            },
            odd: function (z, e) {
                return e % 2 === 1
            },
            lt: function (A, z, e) {
                return z < e[3] - 0
            },
            gt: function (A, z, e) {
                return z > e[3] - 0
            },
            nth: function (A, z, e) {
                return e[3] - 0 === z
            },
            eq: function (A, z, e) {
                return e[3] - 0 === z
            }
        },
        filter: {
            PSEUDO: function (A, F, E, G) {
                var e = F[1],
                    z = k.filters[e];
                if (z) {
                    return z(A, E, F, G)
                } else {
                    if (e === "contains") {
                        return (A.textContent || A.innerText || b([A]) || "").indexOf(F[3]) >= 0
                    } else {
                        if (e === "not") {
                            var B = F[3];
                            for (var D = 0, C = B.length; D < C; D++) {
                                if (B[D] === A) {
                                    return false
                                }
                            }
                            return true
                        } else {
                            d.error(e)
                        }
                    }
                }
            },
            CHILD: function (A, C) {
                var B, I, E, H, e, D, G, F = C[1],
                    z = A;
                switch (F) {
                    case "only":
                    case "first":
                        while ((z = z.previousSibling)) {
                            if (z.nodeType === 1) {
                                return false
                            }
                        }
                        if (F === "first") {
                            return true
                        }
                        z = A;
                    case "last":
                        while ((z = z.nextSibling)) {
                            if (z.nodeType === 1) {
                                return false
                            }
                        }
                        return true;
                    case "nth":
                        B = C[2];
                        I = C[3];
                        if (B === 1 && I === 0) {
                            return true
                        }
                        E = C[0];
                        H = A.parentNode;
                        if (H && (H[i] !== E || !A.nodeIndex)) {
                            D = 0;
                            for (z = H.firstChild; z; z = z.nextSibling) {
                                if (z.nodeType === 1) {
                                    z.nodeIndex = ++D
                                }
                            }
                            H[i] = E
                        }
                        G = A.nodeIndex - I;
                        if (B === 0) {
                            return G === 0
                        } else {
                            return (G % B === 0 && G / B >= 0)
                        }
                }
            },
            ID: function (z, e) {
                return z.nodeType === 1 && z.getAttribute("id") === e
            },
            TAG: function (z, e) {
                return (e === "*" && z.nodeType === 1) || !!z.nodeName && z.nodeName.toLowerCase() === e
            },
            CLASS: function (z, e) {
                return (" " + (z.className || z.getAttribute("class")) + " ").indexOf(e) > -1
            },
            ATTR: function (D, B) {
                var A = B[1],
                    e = d.attr ? d.attr(D, A) : k.attrHandle[A] ? k.attrHandle[A](D) : D[A] != null ? D[A] : D.getAttribute(A),
                    E = e + "",
                    C = B[2],
                    z = B[4];
                return e == null ? C === "!=" : !C && d.attr ? e != null : C === "=" ? E === z : C === "*=" ? E.indexOf(z) >= 0 : C === "~=" ? (" " + E + " ").indexOf(z) >= 0 : !z ? E && e !== false : C === "!=" ? E !== z : C === "^=" ? E.indexOf(z) === 0 : C === "$=" ? E.substr(E.length - z.length) === z : C === "|=" ? E === z || E.substr(0, z.length + 1) === z + "-" : false
            },
            POS: function (C, z, A, D) {
                var e = z[2],
                    B = k.setFilters[e];
                if (B) {
                    return B(C, A, z, D)
                }
            }
        }
    };
    var j = k.match.POS,
        c = function (z, e) {
            return "\\" + (e - 0 + 1)
        };
    for (var f in k.match) {
        k.match[f] = new RegExp(k.match[f].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
        k.leftMatch[f] = new RegExp(/(^(?:.|\r|\n)*?)/.source + k.match[f].source.replace(/\\(\d+)/g, c))
    }
    k.match.globalPOS = j;
    var l = function (z, e) {
        z = Array.prototype.slice.call(z, 0);
        if (e) {
            e.push.apply(e, z);
            return e
        }
        return z
    };
    try {
        Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType
    } catch (v) {
        l = function (C, B) {
            var A = 0,
                z = B || [];
            if (r.call(C) === "[object Array]") {
                Array.prototype.push.apply(z, C)
            } else {
                if (typeof C.length === "number") {
                    for (var e = C.length; A < e; A++) {
                        z.push(C[A])
                    }
                } else {
                    for (; C[A]; A++) {
                        z.push(C[A])
                    }
                }
            }
            return z
        }
    }
    var p, m;
    if (document.documentElement.compareDocumentPosition) {
        p = function (z, e) {
            if (z === e) {
                h = true;
                return 0
            }
            if (!z.compareDocumentPosition || !e.compareDocumentPosition) {
                return z.compareDocumentPosition ? -1 : 1
            }
            return z.compareDocumentPosition(e) & 4 ? -1 : 1
        }
    } else {
        p = function (G, F) {
            if (G === F) {
                h = true;
                return 0
            } else {
                if (G.sourceIndex && F.sourceIndex) {
                    return G.sourceIndex - F.sourceIndex
                }
            }
            var D, z, A = [],
                e = [],
                C = G.parentNode,
                E = F.parentNode,
                H = C;
            if (C === E) {
                return m(G, F)
            } else {
                if (!C) {
                    return -1
                } else {
                    if (!E) {
                        return 1
                    }
                }
            }
            while (H) {
                A.unshift(H);
                H = H.parentNode
            }
            H = E;
            while (H) {
                e.unshift(H);
                H = H.parentNode
            }
            D = A.length;
            z = e.length;
            for (var B = 0; B < D && B < z; B++) {
                if (A[B] !== e[B]) {
                    return m(A[B], e[B])
                }
            }
            return B === D ? m(G, e[B], -1) : m(A[B], F, 1)
        };
        m = function (z, e, A) {
            if (z === e) {
                return A
            }
            var B = z.nextSibling;
            while (B) {
                if (B === e) {
                    return -1
                }
                B = B.nextSibling
            }
            return 1
        }
    }(function () {
        var z = document.createElement("div"),
            A = "script" + (new Date()).getTime(),
            e = document.documentElement;
        z.innerHTML = "<a name='" + A + "'/>";
        e.insertBefore(z, e.firstChild);
        if (document.getElementById(A)) {
            k.find.ID = function (C, D, E) {
                if (typeof D.getElementById !== "undefined" && !E) {
                    var B = D.getElementById(C[1]);
                    return B ? B.id === C[1] || typeof B.getAttributeNode !== "undefined" && B.getAttributeNode("id").nodeValue === C[1] ? [B] : undefined : []
                }
            };
            k.filter.ID = function (D, B) {
                var C = typeof D.getAttributeNode !== "undefined" && D.getAttributeNode("id");
                return D.nodeType === 1 && C && C.nodeValue === B
            }
        }
        e.removeChild(z);
        e = z = null
    })();
    (function () {
        var e = document.createElement("div");
        e.appendChild(document.createComment(""));
        if (e.getElementsByTagName("*").length > 0) {
            k.find.TAG = function (z, D) {
                var C = D.getElementsByTagName(z[1]);
                if (z[1] === "*") {
                    var B = [];
                    for (var A = 0; C[A]; A++) {
                        if (C[A].nodeType === 1) {
                            B.push(C[A])
                        }
                    }
                    C = B
                }
                return C
            }
        }
        e.innerHTML = "<a href='#'></a>";
        if (e.firstChild && typeof e.firstChild.getAttribute !== "undefined" && e.firstChild.getAttribute("href") !== "#") {
            k.attrHandle.href = function (z) {
                return z.getAttribute("href", 2)
            }
        }
        e = null
    })();
    if (document.querySelectorAll) {
        (function () {
            var e = d,
                B = document.createElement("div"),
                A = "__sizzle__";
            B.innerHTML = "<p class='TEST'></p>";
            if (B.querySelectorAll && B.querySelectorAll(".TEST").length === 0) {
                return
            }
            d = function (M, D, H, L) {
                D = D || document;
                if (!L && !d.isXML(D)) {
                    var K = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(M);
                    if (K && (D.nodeType === 1 || D.nodeType === 9)) {
                        if (K[1]) {
                            return l(D.getElementsByTagName(M), H)
                        } else {
                            if (K[2] && k.find.CLASS && D.getElementsByClassName) {
                                return l(D.getElementsByClassName(K[2]), H)
                            }
                        }
                    }
                    if (D.nodeType === 9) {
                        if (M === "body" && D.body) {
                            return l([D.body], H)
                        } else {
                            if (K && K[3]) {
                                var G = D.getElementById(K[3]);
                                if (G && G.parentNode) {
                                    if (G.id === K[3]) {
                                        return l([G], H)
                                    }
                                } else {
                                    return l([], H)
                                }
                            }
                        }
                        try {
                            return l(D.querySelectorAll(M), H)
                        } catch (I) {}
                    } else {
                        if (D.nodeType === 1 && D.nodeName.toLowerCase() !== "object") {
                            var E = D,
                                F = D.getAttribute("id"),
                                C = F || A,
                                O = D.parentNode,
                                N = /^\s*[+~]/.test(M);
                            if (!F) {
                                D.setAttribute("id", C)
                            } else {
                                C = C.replace(/'/g, "\\$&")
                            }
                            if (N && O) {
                                D = D.parentNode
                            }
                            try {
                                if (!N || O) {
                                    return l(D.querySelectorAll("[id='" + C + "'] " + M), H)
                                }
                            } catch (J) {} finally {
                                if (!F) {
                                    E.removeAttribute("id")
                                }
                            }
                        }
                    }
                }
                return e(M, D, H, L)
            };
            for (var z in e) {
                d[z] = e[z]
            }
            B = null
        })()
    }(function () {
        var e = document.documentElement,
            A = e.matchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.msMatchesSelector;
        if (A) {
            var C = !A.call(document.createElement("div"), "div"),
                z = false;
            try {
                A.call(document.documentElement, "[test!='']:sizzle")
            } catch (B) {
                z = true
            }
            d.matchesSelector = function (E, G) {
                G = G.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                if (!d.isXML(E)) {
                    try {
                        if (z || !k.match.PSEUDO.test(G) && !/!=/.test(G)) {
                            var D = A.call(E, G);
                            if (D || !C || E.document && E.document.nodeType !== 11) {
                                return D
                            }
                        }
                    } catch (F) {}
                }
                return d(G, null, null, [E]).length > 0
            }
        }
    })();
    (function () {
        var e = document.createElement("div");
        e.innerHTML = "<div class='test e'></div><div class='test'></div>";
        if (!e.getElementsByClassName || e.getElementsByClassName("e").length === 0) {
            return
        }
        e.lastChild.className = "e";
        if (e.getElementsByClassName("e").length === 1) {
            return
        }
        k.order.splice(1, 0, "CLASS");
        k.find.CLASS = function (z, A, B) {
            if (typeof A.getElementsByClassName !== "undefined" && !B) {
                return A.getElementsByClassName(z[1])
            }
        };
        e = null
    })();

    function a(z, E, D, H, F, G) {
        for (var B = 0, A = H.length; B < A; B++) {
            var e = H[B];
            if (e) {
                var C = false;
                e = e[z];
                while (e) {
                    if (e[i] === D) {
                        C = H[e.sizset];
                        break
                    }
                    if (e.nodeType === 1 && !G) {
                        e[i] = D;
                        e.sizset = B
                    }
                    if (e.nodeName.toLowerCase() === E) {
                        C = e;
                        break
                    }
                    e = e[z]
                }
                H[B] = C
            }
        }
    }

    function t(z, E, D, H, F, G) {
        for (var B = 0, A = H.length; B < A; B++) {
            var e = H[B];
            if (e) {
                var C = false;
                e = e[z];
                while (e) {
                    if (e[i] === D) {
                        C = H[e.sizset];
                        break
                    }
                    if (e.nodeType === 1) {
                        if (!G) {
                            e[i] = D;
                            e.sizset = B
                        }
                        if (typeof E !== "string") {
                            if (e === E) {
                                C = true;
                                break
                            }
                        } else {
                            if (d.filter(E, [e]).length > 0) {
                                C = e;
                                break
                            }
                        }
                    }
                    e = e[z]
                }
                H[B] = C
            }
        }
    }
    if (document.documentElement.contains) {
        d.contains = function (z, e) {
            return z !== e && (z.contains ? z.contains(e) : true)
        }
    } else {
        if (document.documentElement.compareDocumentPosition) {
            d.contains = function (z, e) {
                return !!(z.compareDocumentPosition(e) & 16)
            }
        } else {
            d.contains = function () {
                return false
            }
        }
    }
    d.isXML = function (e) {
        var z = (e ? e.ownerDocument || e : 0).documentElement;
        return z ? z.nodeName !== "HTML" : false
    };
    var s = function (A, e, E) {
        var D, F = [],
            C = "",
            G = e.nodeType ? [e] : e;
        while ((D = k.match.PSEUDO.exec(A))) {
            C += D[0];
            A = A.replace(k.match.PSEUDO, "")
        }
        A = k.relative[A] ? A + "*" : A;
        for (var B = 0, z = G.length; B < z; B++) {
            d(A, G[B], F, E)
        }
        return d.filter(C, F)
    };
    window.Sizzle = d
})();
vim.dom = (function () {
    var d = Sizzle;

    function a(g, i) {
        var h = new RegExp("(^|\\s)" + i + "(\\s|$)");
        if (typeof g === "string") {
            g = d(g)[0]
        }
        return h.test(g.className)
    }

    function c(g, h) {
        if (typeof g === "string") {
            g = d(g)[0]
        }
        if (!a(g, h)) {
            g.className += " " + h
        }
    }

    function e(g, i) {
        var h = new RegExp("(^|\\s)" + i + "(\\s|$)");
        if (typeof g === "string") {
            g = d(g)[0]
        }
        g.className = g.className.replace(h, " ")
    }

    function f(h, i, g) {
        if (typeof h === "string") {
            h = d(h)[0]
        }
        if (h.addEventListener) {
            h.addEventListener(i, g, false)
        } else {
            if (h.attachEvent) {
                h.attachEvent("on" + i, g)
            }
        }
    }

    function b(h, i, g) {
        if (typeof h === "string") {
            h = d(h)[0]
        }
        if (h.removeEventListener) {
            h.removeEventListener(i, g, false)
        } else {
            if (h.detachEvent) {
                h.detachEvent("on" + i, g)
            }
        }
    }
    return {
        $: d,
        hasClass: a,
        addClass: c,
        removeClass: e,
        bind: f,
        unbind: b
    }
})();
vim.audio = (function () {
    var b, i = false,
        g;

    function f() {
        i = true;
        b = {};
        g = 50
    }

    function e(j) {
        if (!i) {
            return
        }
        var k = document.createElement("audio");
        if (k.canPlayType("audio/mpeg") || k.canPlayType("audio/mp3")) {
            k.setAttribute("src", "https://vim-adventures.com/sounds/" + j + ".mp3")
        } else {
            if (k.canPlayType("audio/ogg")) {
                k.setAttribute("src", "https://vim-adventures.com/sounds/" + j + ".ogg")
            }
        }
        b[j] = k;
        return k
    }

    function h(j) {
        return !i ? undefined : b[j] ? b[j] : e(j)
    }

    function d(k, m) {
        var j = vim.view;
        if (!i) {
            return
        }
        if (m === true && j && j.isFadeIn()) {
            j.scheduleSoundAfterFadeIn(k);
            return
        }
        var l = h(k);
        if (!l) {
            console.log("Can't find " + k);
            return
        }
        l.volume = g / 100;
        if (l.paused) {
            l.play()
        }
    }

    function a() {
        return g
    }

    function c(j) {
        g = j
    }
    return {
        initialize: f,
        play: d,
        getVolume: a,
        setVolume: c
    }
})();
vim.game = (function () {
    var b = vim.dom,
        a = b.$;

    function c(f) {
        var e = a("#game .screen.active")[0],
            d = a("#" + f)[0];
        if (e) {
            b.removeClass(e, "active");
            if (vim.screens[e.id] && vim.screens[e.id].done) {
                vim.screens[e.id].done()
            }
        }
        b.addClass(d, "active");
        if (vim.screens[f] && vim.screens[f].run) {
            vim.screens[f].run()
        }
    }
    return {
        showScreen: c
    }
})();
vim.screens["splash-screen"] = (function () {
    var f = vim.dom,
        c = f.$,
        e = true;

    function a() {
        var h = c("#splash-screen")[0];

        function g() {
            var i = vim.loader.getProgress() * 100;
            c(".indicator", h)[0].style.width = i + "%";
            if (i !== 100) {
                window.setTimeout(g, 300)
            }
        }
        g()
    }

    function d() {
        if (e) {
            a();
            e = false
        }
    }

    function b() {}
    return {
        run: d,
        done: b
    }
})();
vim.images = (function () {
    var p = vim.spritesImg,
        m = vim.cloudsImg,
        f = vim.explosionImg,
        C, w, k, q, z, g, t = false,
        h = false,
        E = {
            grass: {
                x: 0,
                y: 0,
                w: 37,
                h: 64
            },
            water: {
                x: 0,
                y: 67,
                w: 37,
                h: 64
            },
            stone: {
                x: 0,
                y: 134,
                w: 37,
                h: 64
            },
            plain: {
                x: 0,
                y: 201,
                w: 37,
                h: 64
            },
            cracked: {
                x: 0,
                y: 268,
                w: 37,
                h: 64
            },
            dark: {
                x: 0,
                y: 335,
                w: 37,
                h: 64
            },
            wood: {
                x: 0,
                y: 402,
                w: 37,
                h: 64
            },
            stone_tall: {
                x: 0,
                y: 469,
                w: 37,
                h: 64
            },
            dirt: {
                x: 0,
                y: 536,
                w: 37,
                h: 64
            },
            shadow_east: {
                x: 0,
                y: 603,
                w: 37,
                h: 64
            },
            shadow_west: {
                x: 0,
                y: 670,
                w: 37,
                h: 64
            },
            shadow_north: {
                x: 0,
                y: 737,
                w: 37,
                h: 64
            },
            shadow_south: {
                x: 40,
                y: 0,
                w: 37,
                h: 64
            },
            shadow_north_east: {
                x: 40,
                y: 67,
                w: 37,
                h: 64
            },
            shadow_north_west: {
                x: 40,
                y: 134,
                w: 37,
                h: 64
            },
            shadow_south_east: {
                x: 40,
                y: 201,
                w: 37,
                h: 64
            },
            shadow_south_west: {
                x: 40,
                y: 268,
                w: 37,
                h: 64
            },
            ramp_west: {
                x: 40,
                y: 335,
                w: 37,
                h: 64
            },
            ramp_east: {
                x: 40,
                y: 402,
                w: 37,
                h: 64
            },
            rock: {
                x: 40,
                y: 469,
                w: 37,
                h: 64
            },
            candle: {
                x: 40,
                y: 536,
                w: 37,
                h: 64
            },
            tall_tree: {
                x: 40,
                y: 603,
                w: 37,
                h: 64
            },
            short_tree: {
                x: 40,
                y: 670,
                w: 37,
                h: 64
            },
            ugly_tree: {
                x: 40,
                y: 737,
                w: 37,
                h: 64
            },
            kid: {
                x: 80,
                y: 0,
                w: 37,
                h: 64
            },
            pink_girl: {
                x: 80,
                y: 67,
                w: 37,
                h: 64
            },
            brown_girl: {
                x: 80,
                y: 134,
                w: 37,
                h: 64
            },
            princess: {
                x: 80,
                y: 201,
                w: 37,
                h: 64
            },
            closed_door: {
                x: 80,
                y: 268,
                w: 37,
                h: 64
            },
            blue_closed_door: {
                x: 80,
                y: 335,
                w: 37,
                h: 64
            },
            yellow_key: {
                x: 80,
                y: 402,
                w: 37,
                h: 64
            },
            blue_key: {
                x: 80,
                y: 469,
                w: 37,
                h: 64
            },
            small_brown_key: {
                x: 80,
                y: 536,
                w: 37,
                h: 64
            },
            keyboard_key: {
                x: 80,
                y: 603,
                w: 37,
                h: 64
            },
            closed_chest: {
                x: 80,
                y: 670,
                w: 37,
                h: 64
            },
            open_chest: {
                x: 80,
                y: 737,
                w: 37,
                h: 64
            },
            chest_lid: {
                x: 120,
                y: 0,
                w: 37,
                h: 64
            },
            cat_girl: {
                x: 120,
                y: 67,
                w: 37,
                h: 64
            },
            horn_girl: {
                x: 120,
                y: 134,
                w: 37,
                h: 64
            },
            north_east_roof: {
                x: 120,
                y: 201,
                w: 37,
                h: 64
            },
            north_west_roof: {
                x: 120,
                y: 268,
                w: 37,
                h: 64
            },
            north_roof: {
                x: 120,
                y: 335,
                w: 37,
                h: 64
            },
            south_east_roof: {
                x: 120,
                y: 402,
                w: 37,
                h: 64
            },
            south_west_roof: {
                x: 120,
                y: 469,
                w: 37,
                h: 64
            },
            south_roof: {
                x: 120,
                y: 536,
                w: 37,
                h: 64
            },
            east_roof: {
                x: 120,
                y: 603,
                w: 37,
                h: 64
            },
            west_roof: {
                x: 120,
                y: 670,
                w: 37,
                h: 64
            },
            lava: {
                x: 120,
                y: 737,
                w: 37,
                h: 64
            },
            sand: {
                x: 160,
                y: 0,
                w: 37,
                h: 64
            },
            cloud: {
                x: 160,
                y: 67,
                w: 37,
                h: 64
            },
            white: {
                x: 160,
                y: 134,
                w: 37,
                h: 64
            },
            red_key: {
                x: 160,
                y: 201,
                w: 37,
                h: 64
            },
            red_closed_door: {
                x: 160,
                y: 268,
                w: 37,
                h: 64
            },
            red_bug_right: {
                x: 160,
                y: 335,
                w: 37,
                h: 64
            },
            red_bug_left: {
                x: 160,
                y: 402,
                w: 37,
                h: 64
            },
            green_kid: {
                x: 160,
                y: 469,
                w: 37,
                h: 64
            },
            blond_kid: {
                x: 160,
                y: 536,
                w: 37,
                h: 64
            },
            star_key: {
                x: 160,
                y: 603,
                w: 37,
                h: 64
            },
            selector: {
                x: 160,
                y: 670,
                w: 37,
                h: 64
            },
            speech: {
                x: 200,
                y: 0,
                w: 101,
                h: 171
            },
            cursor_speech: {
                x: 200,
                y: 180,
                w: 101,
                h: 171
            },
            text_speech: {
                x: 200,
                y: 360,
                w: 101,
                h: 171
            },
            text_speech_line: {
                x: 200,
                y: 540,
                w: 101,
                h: 171
            },
            big_bug_right: {
                x: 320,
                y: 0,
                w: 180,
                h: 140
            },
            big_bug_left: {
                x: 320,
                y: 150,
                w: 180,
                h: 140
            },
            cloud1: {
                x: 0,
                y: 0,
                w: 216,
                h: 86,
                img: "clouds"
            },
            cloud1b: {
                x: 226,
                y: 0,
                w: 216,
                h: 86,
                img: "clouds"
            },
            cloud4: {
                x: 0,
                y: 96,
                w: 200,
                h: 143,
                img: "clouds"
            },
            cloud4b: {
                x: 210,
                y: 96,
                w: 200,
                h: 143,
                img: "clouds"
            },
            cloud2: {
                x: 0,
                y: 249,
                w: 386,
                h: 207,
                img: "clouds"
            },
            cloud2b: {
                x: 0,
                y: 466,
                w: 386,
                h: 207,
                img: "clouds"
            },
            cloud3: {
                x: 0,
                y: 683,
                w: 460,
                h: 204,
                img: "clouds"
            },
            cloud3b: {
                x: 0,
                y: 897,
                w: 460,
                h: 204,
                img: "clouds"
            },
            explosion1: {
                x: 0,
                y: 0,
                w: 37,
                h: 64,
                img: "explosion"
            },
            explosion2: {
                x: 0,
                y: 67,
                w: 37,
                h: 64,
                img: "explosion"
            },
            explosion3: {
                x: 0,
                y: 134,
                w: 37,
                h: 64,
                img: "explosion"
            },
            explosion4: {
                x: 0,
                y: 201,
                w: 37,
                h: 64,
                img: "explosion"
            },
            explosion5: {
                x: 0,
                y: 268,
                w: 37,
                h: 64,
                img: "explosion"
            },
            explosion6: {
                x: 0,
                y: 335,
                w: 37,
                h: 64,
                img: "explosion"
            },
            explosion7: {
                x: 0,
                y: 402,
                w: 37,
                h: 64,
                img: "explosion"
            },
            explosion8: {
                x: 0,
                y: 469,
                w: 37,
                h: 64,
                img: "explosion"
            },
            explosion9: {
                x: 0,
                y: 536,
                w: 37,
                h: 64,
                img: "explosion"
            }
        },
        v = [{
            str: "Level",
            x: 0,
            w: 90
        }, {
            str: "1",
            x: 90,
            w: 30
        }, {
            str: "2",
            x: 120,
            w: 30
        }, {
            str: "3",
            x: 150,
            w: 30
        }, {
            str: "4",
            x: 180,
            w: 30
        }, {
            str: "5",
            x: 210,
            w: 30
        }, {
            str: "6",
            x: 250,
            w: 30
        }, {
            str: "7",
            x: 280,
            w: 30
        }, {
            str: "8",
            x: 310,
            w: 30
        }, {
            str: "9",
            x: 340,
            w: 30
        }, {
            str: "10",
            x: 370,
            w: 50
        }, {
            str: "11",
            x: 420,
            w: 50
        }, {
            str: "12",
            x: 470,
            w: 50
        }, {
            str: "13",
            x: 520,
            w: 50
        }, {
            str: "14",
            x: 570,
            w: 50
        }];

    function u(F) {
        return typeof E[F] !== "undefined"
    }

    function l(P, W) {
        var M = h ? "#313726" : "#a36d36",
            L = h ? "3f5d57" : "#d2ba7c",
            H = h ? "34454c" : "#ae894c",
            V = h ? "0646a7" : "#158cef",
            N = h ? "447eb3" : "#e2fbff",
            K = h ? "4761b3" : "#5bc2ff",
            G = 0,
            F = 5,
            U = 50,
            J = 25,
            X = 25,
            Q = 18,
            R = h ? "#fff" : "#fff",
            I = h ? "#000" : "#000",
            O, T, S;
        P.clearRect(0, 0, g.width, g.height);
        P.fillStyle = M;
        P.fillRect(G, F, 4, U);
        P.fillStyle = L;
        P.fillRect(G + 1, F + 1, 1, U - 2);
        P.fillStyle = H;
        P.fillRect(G + 2, F + 1, 1, U - 2);
        P.fillStyle = V;
        P.fillRect(G + 3, F + 3, J, X);
        P.fillStyle = K;
        P.fillRect(G + 4, F + 4, J - 2, X - 2);
        P.fillStyle = N;
        P.fillRect(G + 4, F + 4, J - 2, 1);
        P.font = Q + "px Curier New";
        O = P.measureText(W).width;
        P.fillStyle = I;
        for (T = 0; T < 3; ++T) {
            for (S = 0; S < 3; ++S) {
                P.fillText(W, G + 15 + S - Math.round(O / 2), F + 21 + T)
            }
        }
        P.fillStyle = R;
        P.fillText(W, G + 16 - Math.round(O / 2), F + 22)
    }

    function d() {
        var F, H, G;
        if (!C && !q && p.complete && m.complete && !z && f.complete) {
            C = document.createElement("canvas");
            C.width = p.width;
            C.height = p.height;
            C.getContext("2d").drawImage(p, 0, 0);
            q = document.createElement("canvas");
            q.width = m.width;
            q.height = m.height;
            q.getContext("2d").drawImage(m, 0, 0);
            z = document.createElement("canvas");
            z.width = f.width;
            z.height = f.height;
            z.getContext("2d").drawImage(f, 0, 0);
            G = C.getContext("2d").getImageData(0, 0, p.width, p.height);
            for (F = 0; F < G.data.length; F += 4) {
                H = Math.floor(G.data[F] * 0.3 + G.data[F + 1] * 0.59 + G.data[F + 2] * 0.11);
                G.data[F] = G.data[F + 1] = G.data[F + 2] = H
            }
            w = document.createElement("canvas");
            w.width = p.width;
            w.height = p.height;
            w.getContext("2d").putImageData(G, 0, 0);
            G = C.getContext("2d").getImageData(0, 0, p.width, p.height);
            for (F = 0; F < G.data.length; F += 4) {
                G.data[F] = Math.floor(G.data[F] * 0.4);
                G.data[F + 1] = Math.floor(G.data[F + 1] * 0.6);
                G.data[F + 2] = Math.floor(G.data[F + 2] * 0.8)
            }
            k = document.createElement("canvas");
            k.width = p.width;
            k.height = p.height;
            k.getContext("2d").putImageData(G, 0, 0);
            g = document.createElement("canvas");
            g.width = 50;
            g.height = 60;
            E.selector_on = E.selector
        }
    }

    function i(F, H) {
        var G = C;
        if (typeof F === "undefined") {
            G = !t ? !h ? C : k : w
        } else {
            if (F === "clouds") {
                G = q
            } else {
                if (F === "explosion") {
                    G = f
                }
            }
        }
        if (H === "selector" || H === "selector_on" || H === "star_key") {
            G = C
        }
        return G
    }

    function s(F) {
        if (typeof F === "undefined") {
            return C && p.complete
        } else {
            if (F === "clouds") {
                return q && m.complete
            } else {
                if (F === "explosion") {
                    return f && f.complete
                }
            }
        }
        return false
    }

    function e(H, I, F, K, G, J) {
        if (typeof E[I] !== "undefined") {
            d();
            if (s(E[I].img)) {
                H.drawImage(i(E[I].img, I), E[I].x, E[I].y, E[I].w, E[I].h, F, K, G, J)
            }
        }
    }

    function B(G, H, F, K, I, J) {
        if (typeof E[H] !== "undefined") {
            d();
            if (s(E[H].img)) {
                G.drawImage(i(E[H].img, H), E[H].x, E[H].y, E[H].w, E[H].h, F, K, E[H].w * I, E[H].h * J)
            }
        }
    }

    function n(H, J, G, M, K) {
        var F, L = E[J],
            I;
        if (typeof L === "undefined") {
            return
        }
        I = L.cachedCanvas;
        if (!I) {
            d();
            if (s(L.img)) {
                I = document.createElement("canvas");
                I.width = L.w;
                I.height = L.h;
                I.getContext("2d").drawImage(i(L.img, J), L.x, L.y, L.w, L.h, 0, 0, L.w, L.h);
                L.cachedCanvas = I
            }
        }
        if (I) {
            if (typeof K === "undefined") {
                H.drawImage(I, G, M)
            } else {
                F = L.h;
                if (K !== undefined && M + F > K) {
                    F = Math.max(0, K - M)
                }
                if (F > 0) {
                    H.drawImage(I, 0, 0, L.w, F, G | 0, M | 0, L.w, F)
                }
            }
        }
    }

    function j(N, F, K, J, O, M, H, G, I, L) {
        if (typeof E[F] !== "undefined") {
            d();
            if (s(E[F].img)) {
                N.drawImage(i(E[F].img, F), E[F].x + K, E[F].y + J, O, M, H, G, I, L)
            }
        }
    }

    function c() {
        for (var F in E) {
            if (E.hasOwnProperty(F)) {
                delete E[F].cachedCanvas
            }
        }
    }

    function a() {
        t = true;
        h = false;
        c()
    }

    function b() {
        h = true;
        c()
    }

    function o() {
        t = false;
        h = false;
        c()
    }

    function A(R, J, I, ac) {
        var ab = 6,
            H = 3,
            V = 150,
            aa = 25,
            Z = -0.1,
            K = 25,
            W = 35,
            X, P, N, Y, F, U, L, ae, T, S, M, G, O, Q, ad;
        if (typeof g === "undefined") {
            d()
        }
        X = g.getContext("2d");
        l(X, ac);
        P = X.getImageData(3, 5, K, W).data;
        N = X.getImageData(0, 0, K, W);
        Y = N.data;
        F = new Date() / V;
        for (U = 0; U < W; ++U) {
            L = 0;
            ae = 0;
            T = (U - W / 2) * Z;
            for (S = 0; S < K; ++S) {
                M = (U * K + S) * 4;
                G = S / K;
                O = Math.sin(S / ab - F) * H * G;
                Q = (U + (O + T * G)) << 0;
                ad = (Q * K + S) * 4;
                ae = (O - L) * aa;
                Y[M] = P[ad] + ae;
                Y[M + 1] = P[ad + 1] + ae;
                Y[M + 2] = P[ad + 2] + ae;
                Y[M + 3] = P[ad + 3];
                L = O
            }
        }
        X.putImageData(N, 3, 5);
        R.drawImage(g, 0, 0, g.width, g.height, J, I, g.width, g.height)
    }

    function D(N, M, L) {
        var I = M,
            G = L + 5,
            H = h ? "#f00" : "#f00",
            K = h ? "#600" : "#600",
            J = 10,
            F = 0,
            O = 30;
        N.save();
        N.beginPath();
        N.lineWidth = 5;
        N.lineCap = "round";
        N.strokeStyle = K;
        N.moveTo(I + F, G + O + J);
        N.lineTo(I + F + J, G + O);
        N.moveTo(I + F, G + O);
        N.lineTo(I + F + J, G + O + J);
        N.stroke();
        N.beginPath();
        N.strokeStyle = H;
        N.moveTo(I + 1 + F, G + O + 1 + J);
        N.lineTo(I + 1 + F + J, G + 1 + O);
        N.moveTo(I + 1 + F, G + 1 + O);
        N.lineTo(I + 1 + F + J, G + 1 + O + J);
        N.stroke();
        N.restore()
    }

    function r(G) {
        var J = vim.model.getLevel(),
            H = v[J],
            F = v[0],
            I = r.canvas,
            O, N, L, K, M;
        if (!J || !H) {
            return
        }
        if (!I) {
            I = document.createElement("canvas");
            I.width = 620;
            I.height = 40;
            O = I.getContext("2d");
            O.font = "30px Arial";
            for (M = 0; M <= 14; ++M) {
                O.fillStyle = "#000";
                for (L = -2; L < 3; L += 1) {
                    for (K = -2; K < 3; K += 1) {
                        O.fillText(v[M].str, v[M].x + K + 7, 30 + L)
                    }
                }
                O.fillStyle = "#fff";
                O.fillText(v[M].str, v[M].x + 7, 30)
            }
            r.canvas = I;
            H = v[J]
        }
        G.drawImage(I, F.x, 0, F.w, 40, 43, 20, F.w, 40);
        G.drawImage(I, H.x, 0, H.w, 40, 43 + F.w, 20, H.w, 40)
    }
    return {
        exists: u,
        draw: n,
        drawScale: e,
        drawMulScale: B,
        drawPartScale: j,
        drawFlag: A,
        drawToBeRemovedSign: D,
        drawLevelNumber: r,
        toGrayScale: a,
        toDark: b,
        toNormalColor: o,
        drawTest: function () {
            var G = document.getElementById("screen"),
                F = G.getContext("2d"),
                J = 100,
                L = 10000,
                I = 0,
                K, H;
            while (J--) {
                L = 10000;
                H = window.performance.now();
                while (L--) {
                    n(F, "water", 0, 0)
                }
                K = window.performance.now();
                I = I + (K - H)
            }
            return (I / 100) | 0
        }
    }
})();
vim.inventory = (function () {
    var e = {};

    function h() {
        e.yellow = 0;
        e.small_brown = 0;
        e.blue = 0;
        e.red = 0;
        e.star = 0
    }

    function a() {
        return {
            yellowKeys: e.yellow,
            blueKeys: e.blue,
            redKeys: e.red,
            smallBrownKeys: e.small_brown,
            starKeys: e.star
        }
    }

    function d(i) {
        e.yellow = i.yellowKeys || 0;
        e.blue = i.blueKeys || 0;
        e.red = i.redKeys || 0;
        e.small_brown = i.smallBrownKeys || 0;
        e.star = i.starKeys || 0
    }

    function f(i) {
        e[i] += 1
    }

    function g(i) {
        if (e[i] > 0) {
            e[i] -= 1
        }
    }

    function c(i) {
        return e[i] > 0
    }

    function b(i) {
        return e[i]
    }
    return {
        init: h,
        addKey: f,
        useKey: g,
        hasKey: c,
        getNumberOfKeys: b,
        getData: a,
        restore: d
    }
})();
vim.validKeys = (function () {
    var a, f, o;

    function h() {
        return {
            validKeys: a,
            topics: o,
            disabledKeys: f
        }
    }

    function q(t) {
        a = t.validKeys;
        o = typeof t.topics !== "undefined" ? t.topics : [];
        f = typeof t.disabledKeys !== "undefined" ? t.disabledKeys : ""
    }

    function j(t) {
        a = t;
        o.length = 0
    }

    function n() {
        o = [];
        f = "";
        j("hjkl:")
    }

    function m(u) {
        var v, t;
        if (u === "CTRL-R") {
            u = "\\redo"
        }
        if (u.charAt(0) !== "\\") {
            v = a.indexOf(u) !== -1;
            if (!v) {
                if ("DXFTGNPYIASCO".indexOf(u) !== -1 && a.indexOf(u.toLowerCase()) !== -1) {
                    v = true
                }
            }
        } else {
            u = u.substr(1);
            for (t = 0; t < o.length; ++t) {
                if (o[t] === u) {
                    v = true;
                    break
                }
            }
        }
        return v
    }

    function i(u) {
        var t;
        if (typeof f === "undefined") {
            f = ""
        }
        t = f.indexOf(u) !== -1;
        if (!t) {
            if ("DXFTGNPYIASCO".indexOf(u) !== -1 && f.indexOf(u.toLowerCase()) !== -1) {
                t = true
            }
        }
        return t
    }

    function l(t) {
        var u = a.indexOf(t);
        if (u !== -1) {
            a = a.substring(0, u) + a.substring(u + 1)
        }
    }

    function r(t) {
        var u = f.indexOf(t);
        if (u !== -1) {
            f = f.substring(0, u) + f.substring(u + 1)
        }
    }

    function k(u) {
        var t, v;
        if (u === "CTRL-R") {
            u = "\\redo"
        }
        if (u.charAt(0) !== "\\") {
            for (t = 0; t < u.length; ++t) {
                v = u.charAt(t);
                if (a.indexOf(v) === -1) {
                    a = a + v;
                    if (v === "1") {
                        a = a + "234567890"
                    }
                }
                if (i(v)) {
                    r(v);
                    if (v === "1") {
                        r("2");
                        r("3");
                        r("4");
                        r("5");
                        r("6");
                        r("7");
                        r("8");
                        r("9")
                    }
                }
                if (v === "u") {
                    f = ""
                }
            }
        } else {
            u = u.substr(1);
            for (t = 0; t < o.length; ++t) {
                if (o[t] === u) {
                    return
                }
            }
            o.push(u)
        }
    }

    function b() {
        return a
    }

    function g(u) {
        var t;
        if (typeof g.descMap === "undefined") {
            g.freesearchCmdDesc = {
                cmd: "/, ?",
                type: "Motion",
                desc: "Search forward '/' or backward '?' for the [count]'th occurrence of pattern (not restricted to whole words).\n/pattern - Search forward for pattern<BR>/ - Search forward for last pattern<BR>?pattern - Search backward for pattern<BR>? - Search backwards for last pattern\n'n' and 'N' also work with '/' and '?'.",
                example: [{
                    text: "O<span class='cursor'>n</span>e fish\nTwo fish\nRed fish\nBlue fish",
                    command: "<span class='command-cursor'>/Bl&lt;CR&gt;</span>3?fis&lt;CR&gt;/&lt;CR&gt;nd?&lt;CR&gt;"
                }, {
                    text: "One fish\nTwo fish\nRed fish\n<span class='cursor'>B</span><span class='select'>l</span>ue fish",
                    command: "<span class='command-cursor'>3?fis&lt;CR&gt;</span>/&lt;CR&gt;nd?&lt;CR&gt;"
                }, {
                    text: "One <span class='cursor'>f</span><span class='select'>is</span>h\nTwo <span class='select'>fis</span>h\nRed <span class='select'>fis</span>h\nBlue <span class='select'>fis</span>h",
                    command: "<span class='command-cursor'>/&lt;CR&gt;</span>nd?&lt;CR&gt;"
                }, {
                    text: "One <span class='select'>fis</span>h\nTwo <span class='cursor'>f</span><span class='select'>is</span>h\nRed <span class='select'>fis</span>h\nBlue <span class='select'>fis</span>h",
                    command: "<span class='command-cursor'>n</span>d?&lt;CR&gt;"
                }, {
                    text: "One <span class='select'>fis</span>h\nTwo <span class='select'>fis</span>h\nRed <span class='cursor'>f</span><span class='select'>is</span>h\nBlue <span class='select'>fis</span>h",
                    command: "<span class='command-cursor'>d?&lt;CR&gt;</span>"
                }, {
                    text: "One <span class='select'>fis</span>h\nTwo <span class='cursor'>f</span><span class='select'>is</span>h\nBlue <span class='select'>fis</span>h",
                    command: "<span class='command-cursor'></span>"
                }]
            };
            g.setnuDesc = {
                cmd: "nu, nonu",
                type: "Boolean option",
                desc: "Show the line number in front of each line in the text. Off by default.\nMakes it really easy to jump to a specific line using ':' and the line number, or the line number followed by G or gg.\n:set nu - shows line numbers.<BR>:set nonu - hides line numbers.<BR>:set nu! - toggle line numbers.<BR>:set nonu! - toggle line numbers."
            };
            g.zCmdDesc = {
                cmd: "zt, zz, zb",
                type: "",
                desc: "Redraw, cursor line at\nzt - Top of window\nzz - Center of window\nzb - Bottom of window",
                example: [{
                    text: "Line one\nLine two\nLine three\nLine four\nLine <span class='cursor'>f</span>ive",
                    command: "<span class='command-cursor'>zt</span>zzzb"
                }, {
                    text: "Line <span class='cursor'>f</span>ive\nLine six\nLine seven\nLine eight\nLine nine",
                    command: "<span class='command-cursor'>zz</span>zb"
                }, {
                    text: "Line three\nLine four\nLine <span class='cursor'>f</span>ive\nLine six\nLine seven",
                    command: "<span class='command-cursor'>zb</span>"
                }, {
                    text: "Line one\nLine two\nLine three\nLine four\nLine <span class='cursor'>f</span>ive",
                    command: "<span class='command-cursor'></span>"
                }]
            };
            g.gCmdDesc = {
                cmd: "gg",
                type: "Motion",
                desc: "Goto line [count], default first line, on the first non-blank character.",
                example: [{
                    text: " &nbsp; &nbsp; Title\n &nbsp; &nbsp; -----\n\n<span class='cursor'>F</span>irst sentence.\nSecond sentence.\nLast sentence.\n\n &nbsp; &nbsp; &nbsp; &nbsp; Signature",
                    command: "<span class='command-cursor'>gg</span>5gg2gg"
                }, {
                    text: " &nbsp; &nbsp; <span class='cursor'>T</span>itle\n &nbsp; &nbsp; -----\n\nFirst sentence.\nSecond sentence.\nLast sentence.\n\n &nbsp; &nbsp; &nbsp; &nbsp; Signature",
                    command: "<span class='command-cursor'>5gg</span>2gg"
                }, {
                    text: " &nbsp; &nbsp; Title\n &nbsp; &nbsp; -----\n\nFirst sentence.\n<span class='cursor'>S</span>econd sentence.\nLast sentence.\n\n &nbsp; &nbsp; &nbsp; &nbsp; Signature",
                    command: "<span class='command-cursor'>2gg</span>"
                }, {
                    text: " &nbsp; &nbsp; Title\n &nbsp; &nbsp; <span class='cursor'>-</span>----\n\nFirst sentence.\nSecond sentence.\nLast sentence.\n\n &nbsp; &nbsp; &nbsp; &nbsp; Signature",
                    command: "<span class='command-cursor'></span>"
                }]
            };
            g.countCmdDesc = {
                cmd: "[count]",
                type: "",
                desc: "An optional number that may precede the command to multiply or iterate the command.  If no number is given, a count of one is used, unless otherwise noted.\nYou can use &lt;Del&gt; to erase the last digit.\nTo see examples on the usage of [count] for a specific command or motion, refer to the relevant help page."
            };
            g.colonReg = {
                type: "",
                cmd: ":reg[isters] {arg}",
                desc: "Display the content of the numbered and named registers that are mentioned in [arg], or list all of them if arg is not supplied.\nFor example: ':reg 1a' will display registers '1' and 'a'.\nSpaces are allowed in [arg]."
            };
            g.numberedRegs1to9 = {
                cmd: '"1 - "9',
                type: "",
                desc: "Numbered register 1 contains the text deleted by the most recent delete or change command, unless the command specified another register or the text is less than one line (the small delete register is used then). In VIM (but not in this game) an exception is made for delete with these movement commands: %, (, ), `, /, ?, n, N, { and }.\nWith each successive deletion or change, VIM shifts the previous contents of register 1 into register 2, 2 into 3, and so forth, losing the previous contents of register 9."
            };
            g.namedRegisters = {
                cmd: '"a - "z',
                type: "",
                desc: "VIM fills these registers only when you say so. Specify them as lowercase letters to replace their previous contents or as uppercase letters to append to their previous contents."
            };
            g.unmatchedBracket = {
                cmd: "[{<span class='caption'>,</span> [(<span class='caption'>,</span> ])<span class='caption'>,</span> ]}",
                type: "Motions",
                desc: "Go to [count] previous (or next) unmatched '{' (or ')') starting at, but not including, cursor position.\n\nExample: <span class='caption'>(check destinations of different motions)</span>\n<span class='code'>&nbsp;<BR>var myModule = <span class='target-location'>(<span class='target-location-tip three-letters'>2[(</span></span>function() <span class='target-location'>{<span class='target-location-tip three-letters'>3[{</span></span><BR>&nbsp; &nbsp; var privateVar = 3;<BR>&nbsp; &nbsp; function privateFunc() <span class='target-location'>{<span class='target-location-tip three-letters'>2[{</span></span><BR>&nbsp; &nbsp; &nbsp; &nbsp; var i;<BR>&nbsp; &nbsp; &nbsp; &nbsp; for (i = 0; i < 5; ++i) <span class='target-location'>{<span class='target-location-tip two-letters'>[{</span></span><BR>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; privateVar += <span class='target-location'>(<span class='target-location-tip-down two-letters'>[(</span></span>i <span class='cursor'>*</span> 2 + 3<span class='target-location'>)<span class='target-location-tip two-letters'>])</span></span>;<BR>&nbsp; &nbsp; &nbsp; &nbsp; <span class='target-location'>}<span class='target-location-tip two-letters'>]}</span></span><BR>&nbsp; &nbsp; <span class='target-location'>}<span class='target-location-tip three-letters'>2]}</span></span><BR>&nbsp; &nbsp; return {<BR>&nbsp; &nbsp; &nbsp; &nbsp; doMath : privateFunc<BR>&nbsp; &nbsp; };<BR><span class='target-location'>}<span class='target-location-tip-down three-letters'>3]}</span></span>()<span class='target-location'>)<span class='target-location-tip-down three-letters'>2])</span></span>;<BR>&nbsp;<BR></span>"
            };
            g.colonMarks = {
                cmd: ":marks {args}",
                type: "",
                desc: "List all the current marks.\nIf {args} is specified, lists the marks that are mentioned in {args}. For example: :marks aB lists the marks 'a' and 'B'.\nMark order is constant: a-z followed by A-Z and then other special marks.\nThe first column is numbered 0.\nWhen in the current buffer, the line in which the mark is located is shown. When in another buffer, the buffer name is displayed."
            };
            g.colonDelmarks = {
                cmd: ":delm[arks] {args}<BR>:del[marks]!",
                type: "",
                desc: "Delete the specified marks.\nMarks that can be deleted include a-z and A-Z (there are additional marks, but they are currently not supported in the game).\nIf '!' is used all existing a-z marks in the current text are deleted.\nNot all marks in the game can be deleted (for example some marks are crucial for the player to finish the level)."
            };
            g.undo = {
                cmd: "u, :u[ndo]",
                type: "Command",
                desc: "Undo [count] changes.<BR>:undo - undo only one change.",
                example: [{
                    text: "All <span class='cursor'>y</span>our base are belong to us.",
                    command: "<span class='command-cursor'>iof&nbsp;&lt;ESC&gt;</span>2eas&lt;ESC&gt;wcwnow&lt;ESC&gt;<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;u2u"
                }, {
                    text: "All of<span class='cursor'>&nbsp;</span>your base are belong to us.",
                    command: "<span class='command-cursor'>2e</span>as&lt;ESC&gt;wcwnow&lt;ESC&gt;u2u<BR>"
                }, {
                    text: "All of your bas<span class='cursor'>e</span> are belong to us.",
                    command: "<span class='command-cursor'>as&lt;ESC&gt;</span>wcwnow&lt;ESC&gt;u2u<BR>"
                }, {
                    text: "All of your base<span class='cursor'>s</span> are belong to us.",
                    command: "<span class='command-cursor'>w</span>cwnow&lt;ESC&gt;u2u<BR>"
                }, {
                    text: "All of your bases <span class='cursor'>a</span>re belong to us.",
                    command: "<span class='command-cursor'>cwnow&lt;ESC&gt;</span>u2u<BR>"
                }, {
                    text: "All of your bases no<span class='cursor'>w</span> belong to us.",
                    command: "<span class='command-cursor'>u</span>2u<BR>"
                }, {
                    text: "All of your bases <span class='cursor'>a</span>re belong to us.",
                    command: "<span class='command-cursor'>2u</span><BR>"
                }, {
                    text: "All <span class='cursor'>y</span>our base are belong to us.",
                    command: "<span class='command-cursor'></span><BR>"
                }]
            };
            g.redo = {
                cmd: "CTRL-R, :red[o]",
                type: "command",
                desc: "Redo [count] changes that were undone.<BR>:redo - redo one change that was undone.\nNote that the r can be either lowercase or uppercase.",
                example: [{
                    text: "All <span class='cursor'>y</span>our base are belong to us.",
                    command: "<span class='command-cursor'>iof&nbsp;&lt;ESC&gt;</span>2eas&lt;ESC&gt;wcwnow&lt;ESC&gt;<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;u2u&lt;CTRL-R&gt;2&lt;CTRL-R&gt;"
                }, {
                    text: "All of<span class='cursor'>&nbsp;</span>your base are belong to us.",
                    command: "<span class='command-cursor'>2e</span>as&lt;ESC&gt;wcwnow&lt;ESC&gt;u2u<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;CTRL-R&gt;2&lt;CTRL-R&gt;"
                }, {
                    text: "All of your bas<span class='cursor'>e</span> are belong to us.",
                    command: "<span class='command-cursor'>as&lt;ESC&gt;</span>wcwnow&lt;ESC&gt;u2u<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;CTRL-R&gt;2&lt;CTRL-R&gt;"
                }, {
                    text: "All of your base<span class='cursor'>s</span> are belong to us.",
                    command: "<span class='command-cursor'>w</span>cwnow&lt;ESC&gt;u2u&lt;CTRL-R&gt;<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2&lt;CTRL-R&gt;"
                }, {
                    text: "All of your bases <span class='cursor'>a</span>re belong to us.",
                    command: "<span class='command-cursor'>cwnow&lt;ESC&gt;</span>u2u&lt;CTRL-R&gt;2&lt;CTRL-R&gt;<BR>"
                }, {
                    text: "All of your bases no<span class='cursor'>w</span> belong to us.",
                    command: "<span class='command-cursor'>u</span>2u&lt;CTRL-R&gt;2&lt;CTRL-R&gt;<BR>"
                }, {
                    text: "All of your bases <span class='cursor'>a</span>re belong to us.",
                    command: "<span class='command-cursor'>2u</span>&lt;CTRL-R&gt;2&lt;CTRL-R&gt;<BR>"
                }, {
                    text: "All <span class='cursor'>y</span>our base are belong to us.",
                    command: "<span class='command-cursor'>&lt;CTRL-R&gt;</span>2&lt;CTRL-R&gt;<BR>"
                }, {
                    text: "All <span class='cursor'>o</span>f your base are belong to us.",
                    command: "<span class='command-cursor'>2&lt;CTRL-R&gt;</span><BR>"
                }, {
                    text: "All of your bases <span class='cursor'>n</span>ow belong to us.",
                    command: "<span class='command-cursor'></span><BR>"
                }]
            };
            g.descMap = {
                h: {
                    type: "Motion",
                    desc: "Left or [count] characters to the left\nIn VIM, you can't go left beyond the beginning of the line.\nWhen you do this in the game, you leave the text area.\nIn the game, when used with a [count], the cursor won't cross text area bounderies.",
                    example: [{
                        text: "A short sente<span class='cursor'>n</span>ce.",
                        command: "<span class='command-cursor'>h</span>h4h"
                    }, {
                        text: "A short sent<span class='cursor'>e</span>nce.",
                        command: "<span class='command-cursor'>h</span>4h"
                    }, {
                        text: "A short sen<span class='cursor'>t</span>ence.",
                        command: "<span class='command-cursor'>4h</span>"
                    }, {
                        text: "A short<span class='cursor'>&nbsp;</span>sentence.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                j: {
                    type: "Motion",
                    desc: "Down or [count] lines down\nWhen moving down to a shorter line if the cursor can't stay in the same column, the column will be remembered to be restored when a subsequent line becomes long enough.\nIn the game, when not on a text area, water denote the end of a line.",
                    example: [{
                        text: "abcd<span class='cursor'>e</span>fg\nabcde\na\nabcd\nabcdefg",
                        command: "<span class='command-cursor'>j</span>j2j"
                    }, {
                        text: "abcdefg\nabcd<span class='cursor'>e</span>\na\nabcd\nabcdefg",
                        command: "<span class='command-cursor'>j</span>2j"
                    }, {
                        text: "abcdefg\nabcde\n<span class='cursor'>a</span>\nabcd\nabcdefg",
                        command: "<span class='command-cursor'>2j</span>"
                    }, {
                        text: "abcdefg\nabcde\na\nabcd\nabcd<span class='cursor'>e</span>fg",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                k: {
                    type: "Motion",
                    desc: "Up or [count] lines up\nWhen moving up to a shorter line if the cursor can't stay in the same column, the column will be remembered to be restored when a subsequent line becomes long enough.\nIn the game, when not on a text area, water denote the end of a line.",
                    example: [{
                        text: "abcdefg\nabcd\na\nabcde\nabcd<span class='cursor'>e</span>fg",
                        command: "<span class='command-cursor'>k</span>k2k"
                    }, {
                        text: "abcdefg\nabcd\na\nabcd<span class='cursor'>e</span>\nabcdefg",
                        command: "<span class='command-cursor'>k</span>2k"
                    }, {
                        text: "abcdefg\nabcd\n<span class='cursor'>a</span>\nabcde\nabcdefg",
                        command: "<span class='command-cursor'>2k</span>"
                    }, {
                        text: "abcd<span class='cursor'>e</span>fg\nabcd\na\nabcde\nabcdefg",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                l: {
                    type: "Motion",
                    desc: "Right or [count] characters to the right\nIn VIM, you can't go right beyond the end of the line.\nWhen you do this in the game, you leave the text area.\nIn the game, when used with a [count], the cursor won't cross text area bounderies.",
                    example: [{
                        text: "A <span class='cursor'>s</span>hort sentence.",
                        command: "<span class='command-cursor'>l</span>l4l"
                    }, {
                        text: "A s<span class='cursor'>h</span>ort sentence.",
                        command: "<span class='command-cursor'>l</span>4l"
                    }, {
                        text: "A sh<span class='cursor'>o</span>rt sentence.",
                        command: "<span class='command-cursor'>4l</span>"
                    }, {
                        text: "A short <span class='cursor'>s</span>entence.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                w: {
                    type: "Motion",
                    desc: "[count] words forward.\nPosition the cursor at the beginning of the word.\nA word (see :help word) consists of a sequence of letters, digits and underscores, or a sequence of other non-blank characters, separated with white space (spaces, tabs, EOL). An empty line is also considered to be a word.",
                    example: [{
                        text: "<span class='cursor'>T</span>wo words. One_word.",
                        command: "<span class='command-cursor'>w</span>www"
                    }, {
                        text: "Two <span class='cursor'>w</span>ords. One_word.",
                        command: "<span class='command-cursor'>w</span>ww"
                    }, {
                        text: "Two words<span class='cursor'>.</span> One_word.",
                        command: "<span class='command-cursor'>w</span>w"
                    }, {
                        text: "Two words. <span class='cursor'>O</span>ne_word.",
                        command: "<span class='command-cursor'>w</span>"
                    }, {
                        text: "Two words. One_word<span class='cursor'>.</span>",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                W: {
                    type: "Motion",
                    desc: "[count] WORDs forward.\nPosition the cursor at the beginning of the WORD.\nA WORD (see :help WORD) consists of a sequence of non-blank characters, separated with white space (spaces, tabs, EOL). An empty line is also considered to be a WORD.",
                    example: [{
                        text: "<span class='cursor'>T</span>wo words...! One_word.",
                        command: "<span class='command-cursor'>W</span>W"
                    }, {
                        text: "Two <span class='cursor'>w</span>ords...! One_word.",
                        command: "<span class='command-cursor'>W</span>"
                    }, {
                        text: "Two words...! <span class='cursor'>O</span>ne_word.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                e: {
                    type: "Motion",
                    desc: "Forward to the end of word [count].\nPosition the cursor at the end of the word.\nDoes not stop in an empty line.\nA word (see :help word) consists of a sequence of letters, digits and underscores, or a sequence of other non-blank characters, separated with white space (spaces, tabs, EOL). An empty line is also considered to be a word.",
                    example: [{
                        text: "<span class='cursor'>T</span>wo words. One_word.",
                        command: "<span class='command-cursor'>e</span>eeee"
                    }, {
                        text: "Tw<span class='cursor'>o</span> words. One_word.",
                        command: "<span class='command-cursor'>e</span>eee"
                    }, {
                        text: "Two word<span class='cursor'>s</span>. One_word.",
                        command: "<span class='command-cursor'>e</span>ee"
                    }, {
                        text: "Two words<span class='cursor'>.</span> One_word.",
                        command: "<span class='command-cursor'>e</span>e"
                    }, {
                        text: "Two words. One_wor<span class='cursor'>d</span>.",
                        command: "<span class='command-cursor'>e</span>"
                    }, {
                        text: "Two words. One_word<span class='cursor'>.</span>",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                E: {
                    type: "Motion",
                    desc: "Forward to the end of WORD [count].\nPosition the cursor at the end of the WORD.\nDoes not stop in an empty line.\nA WORD (see :help WORD) consists of a sequence of non-blank characters, separated with white space (spaces, tabs, EOL). An empty line is also considered to be a WORD.",
                    example: [{
                        text: "<span class='cursor'>T</span>wo words...! One_word.",
                        command: "<span class='command-cursor'>E</span>EE"
                    }, {
                        text: "Tw<span class='cursor'>o</span> words...! One_word.",
                        command: "<span class='command-cursor'>E</span>E"
                    }, {
                        text: "Two words...<span class='cursor'>!</span> One_word.",
                        command: "<span class='command-cursor'>E</span>"
                    }, {
                        text: "Two words...! One_word<span class='cursor'>.</span>",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                b: {
                    type: "Motion",
                    desc: "[count] words backward.\nPosition the cursor at the beginning of the word.\nA word (see :help word) consists of a sequence of letters, digits and underscores, or a sequence of other non-blank characters, separated with white space (spaces, tabs, EOL). An empty line is also considered to be a word.",
                    example: [{
                        text: "Two words. One_word<span class='cursor'>.</span>",
                        command: "<span class='command-cursor'>b</span>bbb"
                    }, {
                        text: "Two words. <span class='cursor'>O</span>ne_word.",
                        command: "<span class='command-cursor'>b</span>bb"
                    }, {
                        text: "Two words<span class='cursor'>.</span> One_word.",
                        command: "<span class='command-cursor'>b</span>b"
                    }, {
                        text: "Two <span class='cursor'>w</span>ords. One_word.",
                        command: "<span class='command-cursor'>b</span>"
                    }, {
                        text: "<span class='cursor'>T</span>wo words. One_word.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                B: {
                    type: "Motion",
                    desc: "[count] WORDS backward.\nPosition the cursor at the beginning of the WORD.\nA WORD (see :help WORD) consists of a sequence of non-blank characters, separated with white space (spaces, tabs, EOL). An empty line is also considered to be a WORD.",
                    example: [{
                        text: "That's, erm, no-1@there.co<span class='cursor'>m</span>",
                        command: "<span class='command-cursor'>B</span>BB"
                    }, {
                        text: "That's, erm, <span class='cursor'>n</span>o-1@there.com",
                        command: "<span class='command-cursor'>B</span>B"
                    }, {
                        text: "That's, <span class='cursor'>e</span>rm, no-1@there.com",
                        command: "<span class='command-cursor'>B</span>"
                    }, {
                        text: "<span class='cursor'>T</span>hat's, erm, no-1@there.com",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                x: {
                    type: "Command",
                    desc: "Delete [count] characters under and after the cursor in the current line [into a register if specified]. Does the same as 'dl'.",
                    example: [{
                        text: "Two words. One<span class='cursor'>_</span>word.",
                        command: "<span class='command-cursor'>x</span>xx2x"
                    }, {
                        text: "Two words. One<span class='cursor'>w</span>ord.",
                        command: "<span class='command-cursor'>x</span>x2x"
                    }, {
                        text: "Two words. One<span class='cursor'>o</span>rd.",
                        command: "<span class='command-cursor'>x</span>2x"
                    }, {
                        text: "Two words. One<span class='cursor'>r</span>d.",
                        command: "<span class='command-cursor'>2x</span>"
                    }, {
                        text: "Two words. One<span class='cursor'>.</span>",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                X: {
                    type: "Command",
                    desc: "Delete [count] characters before the cursor in the current line [into a register if specified]. Does the same as 'dh'.",
                    example: [{
                        text: "Two words. One_<span class='cursor'>w</span>ord.",
                        command: "<span class='command-cursor'>X</span>X2X"
                    }, {
                        text: "Two words. One<span class='cursor'>w</span>ord.",
                        command: "<span class='command-cursor'>X</span>2X"
                    }, {
                        text: "Two words. On<span class='cursor'>w</span>ord.",
                        command: "<span class='command-cursor'>2X</span>"
                    }, {
                        text: "Two words. <span class='cursor'>w</span>ord.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                r: {
                    cmd: "r{char}",
                    type: "Command",
                    desc: "Replace the character under the cursor with {char}.\nIf you give a [count], VIM replaces [count] characters with [count] {char}s.",
                    example: [{
                        text: "This should be <span class='cursor'>C</span>ENSORED.",
                        command: "<span class='command-cursor'>rX</span>rX6rX"
                    }, {
                        text: "This should be X<span class='cursor'>E</span>NSORED.",
                        command: "<span class='command-cursor'>rX</span>6rX"
                    }, {
                        text: "This should be XX<span class='cursor'>N</span>SORED.",
                        command: "<span class='command-cursor'>6rX</span>"
                    }, {
                        text: "This should be XXXXXXXX<span class='cursor'>.</span>",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                d: {
                    cmd: "d{motion}",
                    type: "Operator",
                    desc: 'Delete text that {motion} moves over [into a register if specified].\nSee also help on "dd".',
                    example: [{
                        text: "To <span class='cursor'>b</span>e deleted.",
                        command: "<span class='command-cursor'>dw</span>dbd7l"
                    }, {
                        text: "To <span class='cursor'>d</span>eleted.",
                        command: "<span class='command-cursor'>db</span>d7l"
                    }, {
                        text: "<span class='cursor'>d</span>eleted.",
                        command: "<span class='command-cursor'>d7l</span>"
                    }, {
                        text: "<span class='cursor'>.</span>",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                dd: {
                    type: "Command",
                    desc: "Delete [count] whole lines [into a register].\nRegardless of the cursor position in the line, the entire line is deleted.",
                    example: [{
                        text: "First Line\nSecond <span class='cursor'>L</span>ine\nThird Line\nForth Line\nFifth Line",
                        command: "<span class='command-cursor'>dd</span>dd2dd"
                    }, {
                        text: "First Line\n<span class='cursor'>T</span>hird Line\nForth Line\nFifth Line",
                        command: "<span class='command-cursor'>dd</span>2dd"
                    }, {
                        text: "First Line\n<span class='cursor'>F</span>orth Line\nFifth Line",
                        command: "<span class='command-cursor'>2dd</span>"
                    }, {
                        text: "<span class='cursor'>F</span>irst Line",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                D: {
                    type: "Command",
                    desc: 'Delete the characters under the cursor until the end of the line and [count]-1 more lines [into a register]; synonym for "d$".',
                    example: [{
                        text: "First Line\nSecond<span class='cursor'>&nbsp;</span>Line\nThird Line\nForth Line\nFifth Line",
                        command: "<span class='command-cursor'>D</span>j3D"
                    }, {
                        text: "First Line\nSecon<span class='cursor'>d</span>\nThird Line\nForth Line\nFifth Line",
                        command: "<span class='command-cursor'>j</span>3D"
                    }, {
                        text: "First Line\nSecond\nThird<span class='cursor'>&nbsp;</span>Line\nForth Line\nFifth Line",
                        command: "<span class='command-cursor'>3D</span>"
                    }, {
                        text: "First Line\nSecond\nThir<span class='cursor'>d</span>",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                "~": {
                    type: "Command",
                    desc: "Switch case of the character under the cursor and move the cursor to the right.\nIf a [count] is given, do that many characters.",
                    example: [{
                        text: "<span class='cursor'>d</span>ON'T USE ALL CAPS.",
                        command: "<span class='command-cursor'>~</span>~99~"
                    }, {
                        text: "D<span class='cursor'>O</span>N'T USE ALL CAPS.",
                        command: "<span class='command-cursor'>~</span>99~"
                    }, {
                        text: "Do<span class='cursor'>N</span>'T USE ALL CAPS.",
                        command: "<span class='command-cursor'>99~</span>"
                    }, {
                        text: "Don't use all caps<span class='cursor'>.</span>",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                "0": {
                    type: "Motion",
                    desc: "To the first character of the line.",
                    example: [{
                        text: "&nbsp;&nbsp;&nbsp;Line begins with 3 <span class='cursor'>s</span>paces.",
                        command: "<span class='command-cursor'>0</span>"
                    }, {
                        text: "<span class='cursor'>&nbsp;</span>&nbsp;&nbsp;Line begins with 3 spaces.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                "^": {
                    type: "Motion",
                    desc: "To the first non-blank character of the line.",
                    example: [{
                        text: "&nbsp;&nbsp;&nbsp;Line begins with 3 <span class='cursor'>s</span>paces.",
                        command: "<span class='command-cursor'>^</span>"
                    }, {
                        text: "&nbsp;&nbsp;&nbsp;<span class='cursor'>L</span>ine begins with 3 spaces.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                $: {
                    type: "Motion",
                    desc: "To the end of the line.\nWhen a count is given also go [count - 1] lines downward.",
                    example: [{
                        text: "<span class='cursor'>L</span>ine one.\nLine two.\nLine three.",
                        command: "<span class='command-cursor'>$</span>w2$"
                    }, {
                        text: "Line one<span class='cursor'>.</span>\nLine two.\nLine three.",
                        command: "<span class='command-cursor'>w</span>2$"
                    }, {
                        text: "Line one.\n<span class='cursor'>L</span>ine two.\nLine three.",
                        command: "<span class='command-cursor'>2$</span>"
                    }, {
                        text: "Line one.\nLine two.\nLine three<span class='cursor'>.</span>",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                f: {
                    cmd: "f{char}",
                    type: "Motion",
                    desc: "To [count]'th occurrence of {char} to the right.\nThe cursor is placed on {char}.",
                    example: [{
                        text: "<span class='cursor'>B</span>etty bought a bit of butter.",
                        command: "<span class='command-cursor'>fo</span>fh3ft"
                    }, {
                        text: "Betty b<span class='cursor'>o</span>ught a bit of butter.",
                        command: "<span class='command-cursor'>fh</span>3ft"
                    }, {
                        text: "Betty boug<span class='cursor'>h</span>t a bit of butter.",
                        command: "<span class='command-cursor'>3ft</span>"
                    }, {
                        text: "Betty bought a bit of bu<span class='cursor'>t</span>ter.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                F: {
                    cmd: "F{char}",
                    type: "Motion",
                    desc: "To the [count]'th occurrence of {char} to the left.\nThe cursor is placed on {char}.",
                    example: [{
                        text: "Betty bought a bit of butte<span class='cursor'>r</span>.",
                        command: "<span class='command-cursor'>Fu</span>Fi3Ft"
                    }, {
                        text: "Betty bought a bit of b<span class='cursor'>u</span>tter.",
                        command: "<span class='command-cursor'>Fi</span>3Ft"
                    }, {
                        text: "Betty bought a b<span class='cursor'>i</span>t of butter.",
                        command: "<span class='command-cursor'>3Ft</span>"
                    }, {
                        text: "Be<span class='cursor'>t</span>ty bought a bit of butter.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                ":": {
                    cmd: ": {command}",
                    type: "",
                    desc: "Enter command line mode and execute commands. The following commands are supported in the game:<BR>login<BR>logout<BR>help [topic] - Help on [topic]<BR>keyboard - Show known keys<BR>e[!] [name] - Restore game<BR>w[!] [name] - Save game<BR>!ls - List saved games<BR>!rm {name} - Delete saved game<BR>q[!] - Exit to title screen<BR>reg [regs] - Display registers<BR>ls - list buffers<BR>b [nameOrIndex] - change buffer<BR>marks [spec] - list marks<BR>u[ndo]<BR>red[o]"
                },
                z: g.zCmdDesc,
                zt: g.zCmdDesc,
                zz: g.zCmdDesc,
                zb: g.zCmdDesc,
                G: {
                    cmd: "G",
                    type: "Motion",
                    desc: "Goto line [count], default last line, on the first non-blank character.",
                    example: [{
                        text: " &nbsp; &nbsp; Title\n &nbsp; &nbsp; -----\n\n<span class='cursor'>F</span>irst sentence.\nSecond sentence.\nLast sentence.\n\n &nbsp; &nbsp; &nbsp; &nbsp; Signature",
                        command: "<span class='command-cursor'>G</span>5G2G"
                    }, {
                        text: " &nbsp; &nbsp; Title\n &nbsp; &nbsp; -----\n\nFirst sentence.\nSecond sentence.\nLast sentence.\n\n &nbsp; &nbsp; &nbsp; &nbsp; <span class='cursor'>S</span>ignature",
                        command: "<span class='command-cursor'>5G</span>2G"
                    }, {
                        text: " &nbsp; &nbsp; Title\n &nbsp; &nbsp; -----\n\nFirst sentence.\n<span class='cursor'>S</span>econd sentence.\nLast sentence.\n\n &nbsp; &nbsp; &nbsp; &nbsp; Signature",
                        command: "<span class='command-cursor'>2G</span>"
                    }, {
                        text: " &nbsp; &nbsp; Title\n &nbsp; &nbsp; <span class='cursor'>-</span>----\n\nFirst sentence.\nSecond sentence.\nLast sentence.\n\n &nbsp; &nbsp; &nbsp; &nbsp; Signature",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                gg: g.gCmdDesc,
                g: g.gCmdDesc,
                "1": g.countCmdDesc,
                "2": g.countCmdDesc,
                "3": g.countCmdDesc,
                "4": g.countCmdDesc,
                "5": g.countCmdDesc,
                "6": g.countCmdDesc,
                "7": g.countCmdDesc,
                "8": g.countCmdDesc,
                "9": g.countCmdDesc,
                count: g.countCmdDesc,
                "[count]": g.countCmdDesc,
                t: {
                    cmd: "t{char}",
                    type: "Motion",
                    desc: "Till before [count]'th occurrence of {char} to the right.\nThe cursor is placed on the character left of {char}.",
                    example: [{
                        text: "<span class='cursor'>B</span>etty bought a bit of butter.",
                        command: "<span class='command-cursor'>to</span>th3tt"
                    }, {
                        text: "Betty <span class='cursor'>b</span>ought a bit of butter.",
                        command: "<span class='command-cursor'>th</span>3tt"
                    }, {
                        text: "Betty bou<span class='cursor'>g</span>ht a bit of butter.",
                        command: "<span class='command-cursor'>3tt</span>"
                    }, {
                        text: "Betty bought a bit of b<span class='cursor'>u</span>tter.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                T: {
                    cmd: "T{char}",
                    type: "Motion",
                    desc: "Till after [count]'th occurrence of {char} to the left.\nThe cursor is placed on the character right of {char}.",
                    example: [{
                        text: "Betty bought a bit of but<span class='cursor'>t</span>er.",
                        command: "<span class='command-cursor'>Ti</span>Ti3Tt"
                    }, {
                        text: "Betty bought a bi<span class='cursor'>t</span> of butter.",
                        command: "<span class='command-cursor'>Ti</span>3Tt"
                    }, {
                        text: "Betty bought a bi<span class='cursor'>t</span> of butter.",
                        command: "<span class='command-cursor'>3Tt</span>"
                    }, {
                        text: "Bet<span class='cursor'>t</span>y bought a bit of butter.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                ";": {
                    type: "Motion",
                    desc: "Repeat latest f, t, F or T [count] times.",
                    example: [{
                        text: "<span class='cursor'>B</span>etty bought a bit of butter.",
                        command: "<span class='command-cursor'>fu</span>;Tt3;"
                    }, {
                        text: "Betty bo<span class='cursor'>u</span>ght a bit of butter.",
                        command: "<span class='command-cursor'>;</span>Tt3;"
                    }, {
                        text: "Betty bought a bit of b<span class='cursor'>u</span>tter.",
                        command: "<span class='command-cursor'>Tt</span>3;"
                    }, {
                        text: "Betty bought a bit<span class='cursor'>&nbsp;</span>of butter.",
                        command: "<span class='command-cursor'>3</span>;"
                    }, {
                        text: "Bett<span class='cursor'>y</span> bought a bit of butter.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                ",": {
                    type: "Motion",
                    desc: "Repeat latest f, t, F or T in opposite direction.",
                    example: [{
                        text: "Betty bought a bi<span class='cursor'>t</span> of butter.",
                        command: "<span class='command-cursor'>fu</span>,tt2,"
                    }, {
                        text: "Betty bought a bit of b<span class='cursor'>u</span>tter.",
                        command: "<span class='command-cursor'>,</span>tt2,"
                    }, {
                        text: "Betty bo<span class='cursor'>u</span>ght a bit of butter.",
                        command: "<span class='command-cursor'>tt</span>2,"
                    }, {
                        text: "Betty boug<span class='cursor'>h</span>t a bit of butter.",
                        command: "<span class='command-cursor'>2,</span>"
                    }, {
                        text: "Bet<span class='cursor'>t</span>y bought a bit of butter.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                "%": {
                    type: "Motion",
                    desc: "Find the next item in this line after or under the cursor and jump to its match.\nItems can be: ( [ { } ] ) /* */ #if #ifdef #else #elif #endif.\nNo count is allowed, {count}% jumps to a line {count} percentage down the file (isn't supported in the game).",
                    example: [{
                        text: "<span class='cursor'>i</span>f (max(2*(3+5), 4) &gt; 15) {\n&nbsp;&nbsp;// Do something!\n}",
                        command: "<span class='command-cursor'>%</span>%$%"
                    }, {
                        text: "if (max(2*(3+5), 4) &gt; 15<span class='cursor'>)</span> {\n&nbsp;&nbsp;// Do something!\n}",
                        command: "<span class='command-cursor'>%</span>$%"
                    }, {
                        text: "if <span class='cursor'>(</span>max(2*(3+5), 4) &gt; 15) {\n&nbsp;&nbsp;// Do something!\n}",
                        command: "<span class='command-cursor'>$</span>%"
                    }, {
                        text: "if (max(2*(3+5), 4) &gt; 15) <span class='cursor'>{</span>\n&nbsp;&nbsp;// Do something!\n}",
                        command: "<span class='command-cursor'>%</span>"
                    }, {
                        text: "if (max(2*(3+5), 4) &gt; 15) {\n&nbsp;&nbsp;// Do something!\n<span class='cursor'>}</span>",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                "*": {
                    type: "Motion",
                    desc: "Search forward for the [count]'th occurrence of the whole word nearest to the cursor in the current line.\nThe word used for the search is the first of:<br>1. the keyword (A-Za-z0-9_@) under the cursor<br>2. the first keyword after the cursor<br>3. the non-blank word under the cursor<br>4. the first non-blank word after the cursor",
                    example: [{
                        text: "for<span class='cursor'>&nbsp;</span>(i=0; i&lt;10; ++i) {\n&nbsp; &nbsp; sum += i;\n}",
                        command: "<span class='command-cursor'>*</span>2*"
                    }, {
                        text: "for (<span class='select'>i</span>=0; <span class='cursor'>i</span>&lt;10; ++<span class='select'>i</span>) {\n&nbsp; &nbsp; sum += <span class='select'>i</span>;\n}",
                        command: "<span class='command-cursor'>2*</span>"
                    }, {
                        text: "for (<span class='select'>i</span>=0; <span class='select'>i</span>&lt;10; ++<span class='select'>i</span>) {\n&nbsp; &nbsp; sum += <span class='cursor'>i</span>;\n}",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                "#": {
                    type: "Motion",
                    desc: 'Same as "*", but search backward.',
                    example: [{
                        text: "for (i=0; i&lt;10; ++i) {\n&nbsp; &nbsp; sum <span class='cursor'>+</span>= i;\n}",
                        command: "<span class='command-cursor'>#</span>2#"
                    }, {
                        text: "for (<span class='select'>i</span>=0; <span class='select'>i</span>&lt;10; ++<span class='cursor'>i</span>) {\n&nbsp; &nbsp; sum += <span class='select'>i</span>;\n}",
                        command: "<span class='command-cursor'>2#</span>"
                    }, {
                        text: "for (<span class='cursor'>i</span>=0; <span class='select'>i</span>&lt;10; ++<span class='select'>i</span>) {\n&nbsp; &nbsp; sum += <span class='select'>i</span>;\n}",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                n: {
                    type: "Motion",
                    desc: 'Repeat the latest "/" or "?" [count] times.\n"*" and "#" searches are also considered "/" and "?" repectively.',
                    example: [{
                        text: "for<span class='cursor'>&nbsp;</span>(i=0; i&lt;10; ++i) {\n&nbsp; &nbsp; sum += i;\n}",
                        command: "<span class='command-cursor'>*</span>2n"
                    }, {
                        text: "for (<span class='select'>i</span>=0; <span class='cursor'>i</span>&lt;10; ++<span class='select'>i</span>) {\n&nbsp; &nbsp; sum += <span class='select'>i</span>;\n}",
                        command: "<span class='command-cursor'>2n</span>"
                    }, {
                        text: "for (<span class='select'>i</span>=0; <span class='select'>i</span>&lt;10; ++<span class='select'>i</span>) {\n&nbsp; &nbsp; sum += <span class='cursor'>i</span>;\n}",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                N: {
                    type: "Motion",
                    desc: 'Repeat the latest "/" or "?" [count] times in opposite direction.\n"*" and "#" searches are also considered "/" and "?" repectively.',
                    example: [{
                        text: "for (i=0; <span class='cursor'>i</span>&lt;10; ++i) {\n&nbsp; &nbsp; sum += i;\n}",
                        command: "<span class='command-cursor'>#</span>3N"
                    }, {
                        text: "for (<span class='cursor'>i</span>=0; <span class='select'>i</span>&lt;10; ++<span class='select'>i</span>) {\n&nbsp; &nbsp; sum += <span class='select'>i</span>;\n}",
                        command: "<span class='command-cursor'>3N</span>"
                    }, {
                        text: "for (<span class='select'>i</span>=0; <span class='select'>i</span>&lt;10; ++<span class='select'>i</span>) {\n&nbsp; &nbsp; sum += <span class='cursor'>i</span>;\n}",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                p: {
                    type: "Command",
                    desc: 'Put the text [from the specified register] after the cursor [count] times.\nWhen no register is specified, use the unnamed register (") which contains the last text deleted (d, x), changed (c, s), or yanked (y).',
                    example: [{
                        text: "T<span class='cursor'>i</span>hs it.",
                        command: "<span class='command-cursor'>x</span>pdwh2p"
                    }, {
                        text: "T<span class='cursor'>h</span>s it.",
                        command: "<span class='command-cursor'>p</span>dwh2p"
                    }, {
                        text: "Th<span class='cursor'>i</span>s it.",
                        command: "<span class='command-cursor'>dw</span>h2p"
                    }, {
                        text: "Th<span class='cursor'>i</span>t.",
                        command: "<span class='command-cursor'>h</span>2p"
                    }, {
                        text: "T<span class='cursor'>h</span>it.",
                        command: "<span class='command-cursor'>2p</span>"
                    }, {
                        text: "This is<span class='cursor'>&nbsp;</span>it.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                P: {
                    type: "Command",
                    desc: 'Put the text [from the specified register] before the cursor [count] times.\nWhen no register is specified, use the unnamed register (") which contains the last text deleted (d, x), changed (c, s), or yanked (y).',
                    example: [{
                        text: "his<span class='cursor'>T</span> it.",
                        command: "<span class='command-cursor'>x</span>0Pw3X2P"
                    }, {
                        text: "his<span class='cursor'>&nbsp;</span>it.",
                        command: "<span class='command-cursor'>0</span>Pw3X2P"
                    }, {
                        text: "<span class='cursor'>h</span>is it.",
                        command: "<span class='command-cursor'>P</span>w3X2P"
                    }, {
                        text: "<span class='cursor'>T</span>his it.",
                        command: "<span class='command-cursor'>w</span>3X2P"
                    }, {
                        text: "This <span class='cursor'>i</span>t.",
                        command: "<span class='command-cursor'>3X</span>2P"
                    }, {
                        text: "Th<span class='cursor'>i</span>t.",
                        command: "<span class='command-cursor'>2P</span>"
                    }, {
                        text: "This is<span class='cursor'>&nbsp;</span>it.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                '"': {
                    type: "Register Specification",
                    desc: 'Use register {a-zA-Z0-9.%#:-"} for next delete, yank or put (i.e. paste).\nUse uppercase character to append with delete and yank.\n{.%#:} only work with put and are currently not supported in the game.\nType :reg to see the register\'s content.\nType :help "{a-zA-Z0-9-_"} to get help on a specific register.'
                },
                y: {
                    type: "Operator",
                    cmd: "y{motion}",
                    desc: 'Yank {motion} text [into a register].\nText is stored into "0 register unless another register is specified.',
                    example: [{
                        text: "<span class='cursor'>T</span>his is it. not.",
                        command: "<span class='command-cursor'>y2w</span>fnP"
                    }, {
                        text: "<span class='cursor'>T</span>his is it. not.",
                        command: "<span class='command-cursor'>fn</span>P"
                    }, {
                        text: "This is it. <span class='cursor'>n</span>ot.",
                        command: "<span class='command-cursor'>P</span>"
                    }, {
                        text: "This is it. This is<span class='cursor'>&nbsp;</span>not.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                yy: {
                    type: "Command",
                    desc: "Yank [count] lines [into a register].\nThe cursor position in the line doesn't matter.\nText is stored into \"0 register unless another register is specified.",
                    example: [{
                        text: "Another line.\nA <span class='cursor'>L</span>ine.",
                        command: "<span class='command-cursor'>yy</span>kP"
                    }, {
                        text: "Another line.\nA <span class='cursor'>L</span>ine.",
                        command: "<span class='command-cursor'>k</span>P"
                    }, {
                        text: "An<span class='cursor'>o</span>ther line.\nA Line.",
                        command: "<span class='command-cursor'>P</span>"
                    }, {
                        text: "<span class='cursor'>A</span> line.\nAnother line.\nA Line.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                Y: {
                    type: "Command",
                    desc: "Yank [count] lines [into a register]. Synonym for yy.\nThe cursor position in the line doesn't matter.\nText is stored into \"0 register unless another register is specified.",
                    example: [{
                        text: "Another line.\nA <span class='cursor'>L</span>ine.",
                        command: "<span class='command-cursor'>Y</span>kP"
                    }, {
                        text: "Another line.\nA <span class='cursor'>L</span>ine.",
                        command: "<span class='command-cursor'>k</span>P"
                    }, {
                        text: "An<span class='cursor'>o</span>ther line.\nA Line.",
                        command: "<span class='command-cursor'>P</span>"
                    }, {
                        text: "<span class='cursor'>A</span> Line.\nAnother line.\nA Line.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                reg: g.colonReg,
                ":reg": g.colonReg,
                ":registers": g.colonReg,
                registers: {
                    type: "",
                    desc: 'There are nine types of registers:\n1. The unnamed register ""<br>2. numbered registers "0 to "9<br>3. Small delete register "-<br>4. Named registers "a to "z<br>5. Black hole register "_<br>6. Four read-only registers ":, "., "% and "#<br>7. The expression register "=<br>8. The selection and drop registers "*, "+ and "~<br>9. Last search pattern "/\nOnly the first 5 are currently supported in the game.\nType :help followed by register name for help.'
                },
                '""': {
                    type: "Unnamed Register",
                    desc: 'VIM fills this register with text deleted with the "d", "c", "s", "x" commands or copied with the yank "y" command, regardless of whether or not a specific register was used (an exception is the "_ register). This is like the unnamed register is pointing to the last used register. Thus when appending using an uppercase register name, the unnamed register contains the same text as the named register. The unnamed register is the default for put commands which does not specify a register. You can access it with the name \'"\' (using two double quotes).'
                },
                '"-': {
                    type: "Small Delete Register",
                    desc: 'This register contains text from commands that delete less than one line, except when the command specifies a register with ["x].'
                },
                '"_': {
                    type: "Black Hole Register",
                    desc: "When writing to this register, nothing happens. This can be used to delete text without affecting the normal registers. When reading from this register, nothing is returned."
                },
                '"0': {
                    type: "",
                    desc: 'Numbered register 0 contains the text from the most recent yank command, unless the command specified another register with ["x].'
                },
                '"1': g.numberedRegs1to9,
                '"2': g.numberedRegs1to9,
                '"3': g.numberedRegs1to9,
                '"4': g.numberedRegs1to9,
                '"5': g.numberedRegs1to9,
                '"6': g.numberedRegs1to9,
                '"7': g.numberedRegs1to9,
                '"8': g.numberedRegs1to9,
                '"9': g.numberedRegs1to9,
                i: {
                    type: "Command",
                    desc: "Insert text before the cursor [count] times.\nUse Esc to exit insert mode.\nIn the game, you can't add text that is longer than the missing text. When a count is specified and the total length exceeds the length of the missing text, the count will be ignored resulting in a single text addition.",
                    example: [{
                        text: "This <span class='cursor'>a</span>wesome.",
                        command: "<span class='command-cursor'>i</span>is &lt;Esc&gt;$3i!&lt;Esc&gt;"
                    }, {
                        text: "This <span class='insert-cursor'>a</span>wesome.",
                        command: "<span class='command-cursor'>i</span>s &lt;Esc&gt;$3i!&lt;Esc&gt;"
                    }, {
                        text: "This i<span class='insert-cursor'>a</span>wesome.",
                        command: "<span class='command-cursor'>s</span> &lt;Esc&gt;$3i!&lt;Esc&gt;"
                    }, {
                        text: "This is<span class='insert-cursor'>a</span>wesome.",
                        command: "<span class='command-cursor'>&nbsp;</span>&lt;Esc&gt;$3i!&lt;Esc&gt;"
                    }, {
                        text: "This is <span class='insert-cursor'>a</span>wesome.",
                        command: "<span class='command-cursor'>&lt;Esc&gt;</span>$3i!&lt;Esc&gt;"
                    }, {
                        text: "This is<span class='cursor'>&nbsp;</span>awesome.",
                        command: "<span class='command-cursor'>$</span>3i!&lt;Esc&gt;"
                    }, {
                        text: "This is awesome<span class='cursor'>.</span>",
                        command: "<span class='command-cursor'>3i</span>!&lt;Esc&gt;"
                    }, {
                        text: "This is awesome<span class='insert-cursor'>.</span>",
                        command: "<span class='command-cursor'>!</span>&lt;Esc&gt;"
                    }, {
                        text: "This is awesome!<span class='insert-cursor'>.</span>",
                        command: "<span class='command-cursor'>&lt;Esc&gt;</span>"
                    }, {
                        text: "This is awesome!!<span class='cursor'>!</span>.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                I: {
                    type: "Command",
                    desc: "Insert text before the first non-blank in the line [count] times.\nUse Esc to exit insert mode.\nIn the game, you can't add text that is longer than the missing text. If [count] causes such an overflow, it will be ignored.",
                    example: [{
                        text: "if (condition) {\n &nbsp; &nbsp;is a <span class='cursor'>c</span>omment\n &nbsp; &nbsp;doThatThingy();\n}",
                        command: "<span class='command-cursor'>I</span>This &lt;Esc&gt;2I/&lt;Esc&gt;"
                    }, {
                        text: "if (condition) {\n &nbsp; &nbsp;<span class='insert-cursor'>i</span>s a comment\n &nbsp; &nbsp;doThatThingy();\n}",
                        command: "<span class='command-cursor'>T</span>his &lt;Esc&gt;2I/&lt;Esc&gt;"
                    }, {
                        text: "if (condition) {\n &nbsp; &nbsp;T<span class='insert-cursor'>i</span>s a comment\n &nbsp; &nbsp;doThatThingy();\n}",
                        command: "<span class='command-cursor'>h</span>is &lt;Esc&gt;2I/&lt;Esc&gt;"
                    }, {
                        text: "if (condition) {\n &nbsp; &nbsp;Th<span class='insert-cursor'>i</span>s a comment\n &nbsp; &nbsp;doThatThingy();\n}",
                        command: "<span class='command-cursor'>i</span>s &lt;Esc&gt;2I/&lt;Esc&gt;"
                    }, {
                        text: "if (condition) {\n &nbsp; &nbsp;Thi<span class='insert-cursor'>i</span>s a comment\n &nbsp; &nbsp;doThatThingy();\n}",
                        command: "<span class='command-cursor'>s</span> &lt;Esc&gt;2I/&lt;Esc&gt;"
                    }, {
                        text: "if (condition) {\n &nbsp; &nbsp;This<span class='insert-cursor'>i</span>s a comment\n &nbsp; &nbsp;doThatThingy();\n}",
                        command: "<span class='command-cursor'>&nbsp;</span>&lt;Esc&gt;2I/&lt;Esc&gt;"
                    }, {
                        text: "if (condition) {\n &nbsp; &nbsp;This <span class='insert-cursor'>i</span>s a comment\n &nbsp; &nbsp;doThatThingy();\n}",
                        command: "<span class='command-cursor'>&lt;Esc&gt;</span>2I/&lt;Esc&gt;"
                    }, {
                        text: "if (condition) {\n &nbsp; &nbsp;This<span class='cursor'>&nbsp;</span>is a comment\n &nbsp; &nbsp;doThatThingy();\n}",
                        command: "<span class='command-cursor'>2I</span>/&lt;Esc&gt;"
                    }, {
                        text: "if (condition) {\n &nbsp; &nbsp;<span class='insert-cursor'>T</span>his is a comment\n &nbsp; &nbsp;doThatThingy();\n}",
                        command: "<span class='command-cursor'>/</span>&lt;Esc&gt;"
                    }, {
                        text: "if (condition) {\n &nbsp; &nbsp;/<span class='insert-cursor'>T</span>his is a comment\n &nbsp; &nbsp;doThatThingy();\n}",
                        command: "<span class='command-cursor'>&lt;Esc&gt;</span>"
                    }, {
                        text: "if (condition) {\n &nbsp; &nbsp;/<span class='cursor'>/</span>This is a comment\n &nbsp; &nbsp;doThatThingy();\n}",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                a: {
                    type: "Command",
                    desc: "Append text after the cursor [count] times.\nIf the cursor is in the first column of an empty line Insert starts there.\nUse Esc to exit insert mode.\nIn the game, you can't add text that is longer than the missing text. If [count] causes such an overflow, it will be ignored.",
                    example: [{
                        text: "myArray = <span class='cursor'>[</span> ];",
                        command: "<span class='command-cursor'>a</span> 1&lt;Esc&gt;3a, 0&lt;Esc&gt;"
                    }, {
                        text: "myArray = [<span class='insert-cursor'> </span>];",
                        command: "<span class='command-cursor'>&nbsp;</span>1&lt;Esc&gt;3a, 0&lt;Esc&gt;"
                    }, {
                        text: "myArray = [ <span class='insert-cursor'>&nbsp;</span>];",
                        command: "<span class='command-cursor'>1</span>&lt;Esc&gt;3a, 0&lt;Esc&gt;"
                    }, {
                        text: "myArray = [ 1<span class='insert-cursor'> </span>];",
                        command: "<span class='command-cursor'>&lt;Esc&gt;</span>3a, 0&lt;Esc&gt;"
                    }, {
                        text: "myArray = [ <span class='cursor'>1</span> ];",
                        command: "<span class='command-cursor'>3a</span>, 0&lt;Esc&gt;"
                    }, {
                        text: "myArray = [ 1<span class='insert-cursor'> </span>];",
                        command: "<span class='command-cursor'>,</span> 0&lt;Esc&gt;"
                    }, {
                        text: "myArray = [ 1,<span class='insert-cursor'> </span>];",
                        command: "<span class='command-cursor'>&nbsp;</span>0&lt;Esc&gt;"
                    }, {
                        text: "myArray = [ 1, <span class='insert-cursor'>&nbsp;</span>];",
                        command: "<span class='command-cursor'>0</span>&lt;Esc&gt;"
                    }, {
                        text: "myArray = [ 1, 0<span class='insert-cursor'> </span>];",
                        command: "<span class='command-cursor'>&lt;Esc&gt;</span>"
                    }, {
                        text: "myArray = [ 1, 0, 0, <span class='cursor'>0</span> ];",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                A: {
                    type: "Command",
                    desc: "Append text at the end of the line [count] times.\nUse Esc to exit insert mode.\nIn the game, you can't add text that is longer than the missing text. When a count is specified and the total length exceeds the length of the missing text, the count will be ignored resulting in a single text addition.",
                    example: [{
                        text: "Hip<span class='cursor'>,</span> Hip,",
                        command: "<span class='command-cursor'>3A</span> Hooray!&lt;Esc&gt;"
                    }, {
                        text: "Hip, Hip,<span class='insert-cursor'>&nbsp</span>",
                        command: "<span class='command-cursor'>&nbsp;</span>Hooray!&lt;Esc&gt;"
                    }, {
                        text: "Hip, Hip, <span class='insert-cursor'>&nbsp</span>",
                        command: "<span class='command-cursor'>H</span>ooray!&lt;Esc&gt;"
                    }, {
                        text: "Hip, Hip, H<span class='insert-cursor'>&nbsp</span>",
                        command: "<span class='command-cursor'>o</span>oray!&lt;Esc&gt;"
                    }, {
                        text: "Hip, Hip, Ho<span class='insert-cursor'>&nbsp</span>",
                        command: "<span class='command-cursor'>o</span>ray!&lt;Esc&gt;"
                    }, {
                        text: "Hip, Hip, Hoo<span class='insert-cursor'>&nbsp</span>",
                        command: "<span class='command-cursor'>r</span>ay!&lt;Esc&gt;"
                    }, {
                        text: "Hip, Hip, Hoor<span class='insert-cursor'>&nbsp</span>",
                        command: "<span class='command-cursor'>a</span>y!&lt;Esc&gt;"
                    }, {
                        text: "Hip, Hip, Hoora<span class='insert-cursor'>&nbsp</span>",
                        command: "<span class='command-cursor'>y</span>!&lt;Esc&gt;"
                    }, {
                        text: "Hip, Hip, Hooray<span class='insert-cursor'>&nbsp</span>",
                        command: "<span class='command-cursor'>!</span>&lt;Esc&gt;"
                    }, {
                        text: "Hip, Hip, Hooray!<span class='insert-cursor'>&nbsp</span>",
                        command: "<span class='command-cursor'>&lt;Esc&gt;</span>"
                    }, {
                        text: "Hip, Hip, Hooray! Hooray! Hooray<span class='cursor'>!</span>",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                c: {
                    cmd: "c{motion}",
                    type: "Operator",
                    desc: 'Delete (change) {motion} text [into the specified register] and start insert.\nType Esc to leave insert mode.\n"cw" and "cW" are treated like "ce" and "cE" if the cursor is on a non-blank. This is because "cw" is interpreted as change-word, and a word does not include the following white space.',
                    example: [{
                        text: "That was <span class='cursor'>v</span>ery nice...",
                        command: "<span class='command-cursor'>cw</span>reall&lt;Esc&gt;wcWAWESOME!&lt;Esc&gt;"
                    }, {
                        text: "That was <span class='insert-cursor'>&nbsp;</span>nice...",
                        command: "<span class='command-cursor'>r</span>eally&lt;Esc&gt;wcWAWESOME!&lt;Esc&gt;"
                    }, {
                        text: "That was r<span class='insert-cursor'>&nbsp;</span>nice...",
                        command: "<span class='command-cursor'>e</span>ally&lt;Esc&gt;wcWAWESOME!&lt;Esc&gt;"
                    }, {
                        text: "That was re<span class='insert-cursor'>&nbsp;</span>nice...",
                        command: "<span class='command-cursor'>a</span>lly&lt;Esc&gt;wcWAWESOME!&lt;Esc&gt;"
                    }, {
                        text: "That was rea<span class='insert-cursor'>&nbsp;</span>nice...",
                        command: "<span class='command-cursor'>l</span>ly&lt;Esc&gt;wcWAWESOME!&lt;Esc&gt;"
                    }, {
                        text: "That was real<span class='insert-cursor'>&nbsp;</span>nice...",
                        command: "<span class='command-cursor'>l</span>y&lt;Esc&gt;wcWAWESOME!&lt;Esc&gt;"
                    }, {
                        text: "That was reall<span class='insert-cursor'>&nbsp;</span>nice...",
                        command: "<span class='command-cursor'>y</span>&lt;Esc&gt;wcWAWESOME!&lt;Esc&gt;"
                    }, {
                        text: "That was really<span class='insert-cursor'>&nbsp;</span>nice...",
                        command: "<span class='command-cursor'>&lt;Esc&gt;</span>wcWAWESOME!&lt;Esc&gt;"
                    }, {
                        text: "That was reall<span class='cursor'>y</span> nice...",
                        command: "<span class='command-cursor'>w</span>cWAWESOME!&lt;Esc&gt;"
                    }, {
                        text: "That was really <span class='cursor'>n</span>ice...",
                        command: "<span class='command-cursor'>cW</span>AWESOME!&lt;Esc&gt;"
                    }, {
                        text: "That was really <span class='insert-cursor'>&nbsp</span>",
                        command: "<span class='command-cursor'>A</span>WESOME!&lt;Esc&gt;"
                    }, {
                        text: "That was really A<span class='insert-cursor'>&nbsp</span>",
                        command: "<span class='command-cursor'>W</span>ESOME!&lt;Esc&gt;"
                    }, {
                        text: "That was really AW<span class='insert-cursor'>&nbsp</span>",
                        command: "<span class='command-cursor'>E</span>SOME!&lt;Esc&gt;"
                    }, {
                        text: "That was really AWE<span class='insert-cursor'>&nbsp</span>",
                        command: "<span class='command-cursor'>S</span>OME!&lt;Esc&gt;"
                    }, {
                        text: "That was really AWES<span class='insert-cursor'>&nbsp</span>",
                        command: "<span class='command-cursor'>O</span>ME!&lt;Esc&gt;"
                    }, {
                        text: "That was really AWESO<span class='insert-cursor'>&nbsp</span>",
                        command: "<span class='command-cursor'>M</span>E!&lt;Esc&gt;"
                    }, {
                        text: "That was really AWESOM<span class='insert-cursor'>&nbsp</span>",
                        command: "<span class='command-cursor'>E</span>!&lt;Esc&gt;"
                    }, {
                        text: "That was really AWESOME<span class='insert-cursor'>&nbsp</span>",
                        command: "<span class='command-cursor'>!</span>&lt;Esc&gt;"
                    }, {
                        text: "That was really AWESOME!<span class='insert-cursor'>&nbsp</span>",
                        command: "<span class='command-cursor'>&lt;Esc&gt;</span>"
                    }, {
                        text: "That was really AWESOME<span class='cursor'>!</span>",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                C: {
                    type: "Command",
                    desc: "Delete (change) from the cursor position to the end of the line and [count]-1 more lines [into the specified register], and start insert.\nSynonym for c$ (not linewise).\nType Esc to exit insert mode.",
                    example: [{
                        text: "That's <span class='cursor'>q</span>uite good.\nCan be better though.",
                        command: "<span class='command-cursor'>C</span>nice.&lt;Esc&gt;B2Cgreat!&lt;Esc&gt;"
                    }, {
                        text: "That's <span class='insert-cursor'>&nbsp;</span>\nCan be better though.",
                        command: "<span class='command-cursor'>n</span>ice.&lt;Esc&gt;B2Cgreat!&lt;Esc&gt;"
                    }, {
                        text: "That's n<span class='insert-cursor'>&nbsp;</span>\nCan be better though.",
                        command: "<span class='command-cursor'>i</span>ce.&lt;Esc&gt;B2Cgreat!&lt;Esc&gt;"
                    }, {
                        text: "That's ni<span class='insert-cursor'>&nbsp;</span>\nCan be better though.",
                        command: "<span class='command-cursor'>c</span>e.&lt;Esc&gt;B2Cgreat!&lt;Esc&gt;"
                    }, {
                        text: "That's nic<span class='insert-cursor'>&nbsp;</span>\nCan be better though.",
                        command: "<span class='command-cursor'>e</span>.&lt;Esc&gt;B2Cgreat!&lt;Esc&gt;"
                    }, {
                        text: "That's nice<span class='insert-cursor'>&nbsp;</span>\nCan be better though.",
                        command: "<span class='command-cursor'>.</span>&lt;Esc&gt;B2Cgreat!&lt;Esc&gt;"
                    }, {
                        text: "That's nice.<span class='insert-cursor'>&nbsp;</span>\nCan be better though.",
                        command: "<span class='command-cursor'>&lt;Esc&gt;</span>B2Cgreat!&lt;Esc&gt;"
                    }, {
                        text: "That's nice<span class='cursor'>.</span>\nCan be better though.",
                        command: "<span class='command-cursor'>B</span>2Cgreat!&lt;Esc&gt;"
                    }, {
                        text: "That's <span class='cursor'>n</span>ice.\nCan be better though.",
                        command: "<span class='command-cursor'>2C</span>great!&lt;Esc&gt;"
                    }, {
                        text: "That's <span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>g</span>reat!&lt;Esc&gt;"
                    }, {
                        text: "That's g<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>r</span>eat!&lt;Esc&gt;"
                    }, {
                        text: "That's gr<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>e</span>at!&lt;Esc&gt;"
                    }, {
                        text: "That's gre<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>a</span>t!&lt;Esc&gt;"
                    }, {
                        text: "That's grea<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>t</span>!&lt;Esc&gt;"
                    }, {
                        text: "That's great<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>!</span>&lt;Esc&gt;"
                    }, {
                        text: "That's great!<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>&lt;Esc&gt;</span>"
                    }, {
                        text: "That's great<span class='cursor'>!</span>",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                cc: {
                    type: "Command",
                    desc: "Delete (change) [count] lines [into the specified register] and start insert (linewise).\nSynonym for S.\nType Esc to exit insert mode.",
                    example: [{
                        text: "One\nSe<span class='cursor'>c</span>ond\nThree\nOne more\nTwo more",
                        command: "<span class='command-cursor'>cc</span>Two&lt;Esc&gt;2j2ccFour&lt;Esc&gt;"
                    }, {
                        text: "One\n<span class='insert-cursor'>&nbsp;</span>\nThree\nOne more\nTwo more",
                        command: "<span class='command-cursor'>T</span>wo&lt;Esc&gt;2j2ccFour&lt;Esc&gt;"
                    }, {
                        text: "One\nT<span class='insert-cursor'>&nbsp;</span>\nThree\nOne more\nTwo more",
                        command: "<span class='command-cursor'>w</span>o&lt;Esc&gt;2j2ccFour&lt;Esc&gt;"
                    }, {
                        text: "One\nTw<span class='insert-cursor'>&nbsp;</span>\nThree\nOne more\nTwo more",
                        command: "<span class='command-cursor'>o</span>&lt;Esc&gt;2j2ccFour&lt;Esc&gt;"
                    }, {
                        text: "One\nTwo<span class='insert-cursor'>&nbsp;</span>\nThree\nOne more\nTwo more",
                        command: "<span class='command-cursor'>&lt;Esc&gt;</span>2j2ccFour&lt;Esc&gt;"
                    }, {
                        text: "One\nTw<span class='cursor'>o</span>\nThree\nOne more\nTwo more",
                        command: "<span class='command-cursor'>2j</span>2ccFour&lt;Esc&gt;"
                    }, {
                        text: "One\nTwo\nThree\nOn<span class='cursor'>e</span> more\nTwo more",
                        command: "<span class='command-cursor'>2cc</span>Four&lt;Esc&gt;"
                    }, {
                        text: "One\nTwo\nThree\n<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>F</span>our&lt;Esc&gt;"
                    }, {
                        text: "One\nTwo\nThree\nF<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>o</span>ur&lt;Esc&gt;"
                    }, {
                        text: "One\nTwo\nThree\nFo<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>u</span>r&lt;Esc&gt;"
                    }, {
                        text: "One\nTwo\nThree\nFou<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>r</span>&lt;Esc&gt;"
                    }, {
                        text: "One\nTwo\nThree\nFour<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>&lt;Esc&gt;</span>"
                    }, {
                        text: "One\nTwo\nThree\nFou<span class='cursor'>r</span>",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                S: {
                    type: "Command",
                    desc: "Delete (substitute) [count] lines [into the specified register] and start insert (linewise).\nSynonym for cc.\nType Esc to exit insert mode.",
                    example: [{
                        text: "One\nSe<span class='cursor'>c</span>ond\nThree\nOne more\nTwo more",
                        command: "<span class='command-cursor'>S</span>Two&lt;Esc&gt;2j2SFour&lt;Esc&gt;"
                    }, {
                        text: "One\n<span class='insert-cursor'>&nbsp;</span>\nThree\nOne more\nTwo more",
                        command: "<span class='command-cursor'>T</span>wo&lt;Esc&gt;2j2SFour&lt;Esc&gt;"
                    }, {
                        text: "One\nT<span class='insert-cursor'>&nbsp;</span>\nThree\nOne more\nTwo more",
                        command: "<span class='command-cursor'>w</span>o&lt;Esc&gt;2j2SFour&lt;Esc&gt;"
                    }, {
                        text: "One\nTw<span class='insert-cursor'>&nbsp;</span>\nThree\nOne more\nTwo more",
                        command: "<span class='command-cursor'>o</span>&lt;Esc&gt;2j2SFour&lt;Esc&gt;"
                    }, {
                        text: "One\nTwo<span class='insert-cursor'>&nbsp;</span>\nThree\nOne more\nTwo more",
                        command: "<span class='command-cursor'>&lt;Esc&gt;</span>2j2SFour&lt;Esc&gt;"
                    }, {
                        text: "One\nTw<span class='cursor'>o</span>\nThree\nOne more\nTwo more",
                        command: "<span class='command-cursor'>2j</span>2SFour&lt;Esc&gt;"
                    }, {
                        text: "One\nTwo\nThree\nOn<span class='cursor'>e</span> more\nTwo more",
                        command: "<span class='command-cursor'>2S</span>Four&lt;Esc&gt;"
                    }, {
                        text: "One\nTwo\nThree\n<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>F</span>our&lt;Esc&gt;"
                    }, {
                        text: "One\nTwo\nThree\nF<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>o</span>ur&lt;Esc&gt;"
                    }, {
                        text: "One\nTwo\nThree\nFo<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>u</span>r&lt;Esc&gt;"
                    }, {
                        text: "One\nTwo\nThree\nFou<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>r</span>&lt;Esc&gt;"
                    }, {
                        text: "One\nTwo\nThree\nFour<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>&lt;Esc&gt;</span>"
                    }, {
                        text: "One\nTwo\nThree\nFou<span class='cursor'>r</span>",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                s: {
                    type: "Command",
                    desc: 'Delete (substitute) [count] characters [into the specified register] and start insert (s stands for Substitute).\nSynonym for "cl" (not linewise).\nType Esc to exit insert mode.',
                    example: [{
                        text: "for (i = <span class='cursor'>0</span>; i < 10; ++i) {\n &nbsp; &nbsp;// Do somthing\n}",
                        command: "<span class='command-cursor'>s</span>11&lt;Esc&gt;f12s35&lt;Esc&gt;"
                    }, {
                        text: "for (i = <span class='insert-cursor'>;</span> i < 10; ++i) {\n &nbsp; &nbsp;// Do somthing\n}",
                        command: "<span class='command-cursor'>1</span>1&lt;Esc&gt;f12s35&lt;Esc&gt;"
                    }, {
                        text: "for (i = 1<span class='insert-cursor'>;</span> i < 10; ++i) {\n &nbsp; &nbsp;// Do somthing\n}",
                        command: "<span class='command-cursor'>1</span>&lt;Esc&gt;f12s35&lt;Esc&gt;"
                    }, {
                        text: "for (i = 11<span class='insert-cursor'>;</span> i < 10; ++i) {\n &nbsp; &nbsp;// Do somthing\n}",
                        command: "<span class='command-cursor'>&lt;Esc&gt;</span>f12s35&lt;Esc&gt;"
                    }, {
                        text: "for (i = 1<span class='cursor'>1</span>; i < 10; ++i) {\n &nbsp; &nbsp;// Do somthing\n}",
                        command: "<span class='command-cursor'>f1</span>2s35&lt;Esc&gt;"
                    }, {
                        text: "for (i = 11; i < <span class='cursor'>1</span>0; ++i) {\n &nbsp; &nbsp;// Do somthing\n}",
                        command: "<span class='command-cursor'>2s</span>35&lt;Esc&gt;"
                    }, {
                        text: "for (i = 11; i < <span class='insert-cursor'>;</span> ++i) {\n &nbsp; &nbsp;// Do somthing\n}",
                        command: "<span class='command-cursor'>3</span>5&lt;Esc&gt;"
                    }, {
                        text: "for (i = 11; i < 3<span class='insert-cursor'>;</span> ++i) {\n &nbsp; &nbsp;// Do somthing\n}",
                        command: "<span class='command-cursor'>5</span>&lt;Esc&gt;"
                    }, {
                        text: "for (i = 11; i < 35<span class='insert-cursor'>;</span> ++i) {\n &nbsp; &nbsp;// Do somthing\n}",
                        command: "<span class='command-cursor'>&lt;Esc&gt;</span>"
                    }, {
                        text: "for (i = 11; i < 3<span class='cursor'>5</span>; ++i) {\n &nbsp; &nbsp;// Do somthing\n}",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                o: {
                    type: "Command",
                    desc: "Begin a new line below the cursor and insert text, repeat [count] times.\nType Esc to exit insert mode.",
                    example: [{
                        text: "&lt;u<span class='cursor'>l</span>&gt;",
                        command: "<span class='command-cursor'>3o</span>&lt;li&gt;&lt;/li&gt;&lt;Esc&gt;o&lt;/ul&gt;&lt;Esc&gt;"
                    }, {
                        text: "&lt;ul&gt;\n<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>&lt;</span>li&gt;&lt;/li&gt;&lt;Esc&gt;o&lt;/ul&gt;&lt;Esc&gt;"
                    }, {
                        text: "&lt;ul&gt;\n&lt;<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>l</span>i&gt;&lt;/li&gt;&lt;Esc&gt;o&lt;/ul&gt;&lt;Esc&gt;"
                    }, {
                        text: "&lt;ul&gt;\n&lt;l<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>i</span>&gt;&lt;/li&gt;&lt;Esc&gt;o&lt;/ul&gt;&lt;Esc&gt;"
                    }, {
                        text: "&lt;ul&gt;\n&lt;li<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>&gt;</span>&lt;/li&gt;&lt;Esc&gt;o&lt;/ul&gt;&lt;Esc&gt;"
                    }, {
                        text: "&lt;ul&gt;\n&lt;li&gt;<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>&lt;</span>/li&gt;&lt;Esc&gt;o&lt;/ul&gt;&lt;Esc&gt;"
                    }, {
                        text: "&lt;ul&gt;\n&lt;li&gt;&lt;<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>/</span>li&gt;&lt;Esc&gt;o&lt;/ul&gt;&lt;Esc&gt;"
                    }, {
                        text: "&lt;ul&gt;\n&lt;li&gt;&lt;/<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>l</span>i&gt;&lt;Esc&gt;o&lt;/ul&gt;&lt;Esc&gt;"
                    }, {
                        text: "&lt;ul&gt;\n&lt;li&gt;&lt;/l<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>i</span>&gt;&lt;Esc&gt;o&lt;/ul&gt;&lt;Esc&gt;"
                    }, {
                        text: "&lt;ul&gt;\n&lt;li&gt;&lt;/li<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>&gt;</span>&lt;Esc&gt;o&lt;/ul&gt;&lt;Esc&gt;"
                    }, {
                        text: "&lt;ul&gt;\n&lt;li&gt;&lt;/li&gt;<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>&lt;Esc&gt;</span>o&lt;/ul&gt;&lt;Esc&gt;"
                    }, {
                        text: "&lt;ul&gt;\n&lt;li&gt;&lt;/li&gt;\n&lt;li&gt;&lt;/li&gt;\n&lt;li&gt;&lt;/li<span class='cursor'>&gt;</span>",
                        command: "<span class='command-cursor'>o</span>&lt;/ul&gt;&lt;Esc&gt;"
                    }, {
                        text: "&lt;ul&gt;\n&lt;li&gt;&lt;/li&gt;\n&lt;li&gt;&lt;/li&gt;\n&lt;li&gt;&lt;/li&gt;\n<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>&lt;</span>/ul&gt;&lt;Esc&gt;"
                    }, {
                        text: "&lt;ul&gt;\n&lt;li&gt;&lt;/li&gt;\n&lt;li&gt;&lt;/li&gt;\n&lt;li&gt;&lt;/li&gt;\n&lt;<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>/</span>ul&gt;&lt;Esc&gt;"
                    }, {
                        text: "&lt;ul&gt;\n&lt;li&gt;&lt;/li&gt;\n&lt;li&gt;&lt;/li&gt;\n&lt;li&gt;&lt;/li&gt;\n&lt;/<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>u</span>l&gt;&lt;Esc&gt;"
                    }, {
                        text: "&lt;ul&gt;\n&lt;li&gt;&lt;/li&gt;\n&lt;li&gt;&lt;/li&gt;\n&lt;li&gt;&lt;/li&gt;\n&lt;/u<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>l</span>&gt;&lt;Esc&gt;"
                    }, {
                        text: "&lt;ul&gt;\n&lt;li&gt;&lt;/li&gt;\n&lt;li&gt;&lt;/li&gt;\n&lt;li&gt;&lt;/li&gt;\n&lt;/ul<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>&gt;</span>&lt;Esc&gt;"
                    }, {
                        text: "&lt;ul&gt;\n&lt;li&gt;&lt;/li&gt;\n&lt;li&gt;&lt;/li&gt;\n&lt;li&gt;&lt;/li&gt;\n&lt;/ul&gt;<span class='insert-cursor'>&nbsp;</span>",
                        command: "<span class='command-cursor'>&lt;Esc&gt;</span>"
                    }, {
                        text: "&lt;ul&gt;\n&lt;li&gt;&lt;/li&gt;\n&lt;li&gt;&lt;/li&gt;\n&lt;li&gt;&lt;/li&gt;\n&lt;/ul<span class='cursor'>&gt;</span>",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                O: {
                    type: "Command",
                    desc: "Begin a new line above the cursor and insert text, repeat [count] times.\nType Esc to exit insert mode.",
                    example: [{
                        text: "<span class='cursor'>&nbsp;</span>\nA rectangle.",
                        command: "<span class='command-cursor'>2O</span>#####&lt;Esc&gt;3O# &nbsp; #&lt;Esc&gt;"
                    }, {
                        text: "<span class='insert-cursor'>&nbsp;</span>\n\nA rectangle.",
                        command: "<span class='command-cursor'>#</span>####&lt;Esc&gt;3O# &nbsp; #&lt;Esc&gt;"
                    }, {
                        text: "#<span class='insert-cursor'>&nbsp;</span>\n\nA rectangle.",
                        command: "<span class='command-cursor'>#</span>###&lt;Esc&gt;3O# &nbsp; #&lt;Esc&gt;"
                    }, {
                        text: "##<span class='insert-cursor'>&nbsp;</span>\n\nA rectangle.",
                        command: "<span class='command-cursor'>#</span>##&lt;Esc&gt;3O# &nbsp; #&lt;Esc&gt;"
                    }, {
                        text: "###<span class='insert-cursor'>&nbsp;</span>\n\nA rectangle.",
                        command: "<span class='command-cursor'>#</span>#&lt;Esc&gt;3O# &nbsp; #&lt;Esc&gt;"
                    }, {
                        text: "####<span class='insert-cursor'>&nbsp;</span>\n\nA rectangle.",
                        command: "<span class='command-cursor'>#</span>&lt;Esc&gt;3O# &nbsp; #&lt;Esc&gt;"
                    }, {
                        text: "#####<span class='insert-cursor'>&nbsp;</span>\n\nA rectangle.",
                        command: "<span class='command-cursor'>&lt;Esc&gt;</span>3O# &nbsp; #&lt;Esc&gt;"
                    }, {
                        text: "#####\n####<span class='cursor'>#</span>\n\nA rectangle.",
                        command: "<span class='command-cursor'>3O</span># &nbsp; #&lt;Esc&gt;"
                    }, {
                        text: "#####\n<span class='insert-cursor'>&nbsp;</span>\n#####\n\nA rectangle.",
                        command: "<span class='command-cursor'>#</span> &nbsp; #&lt;Esc&gt;"
                    }, {
                        text: "#####\n#<span class='insert-cursor'>&nbsp;</span>\n#####\n\nA rectangle.",
                        command: "<span class='command-cursor'>&nbsp;</span>&nbsp; #&lt;Esc&gt;"
                    }, {
                        text: "#####\n# <span class='insert-cursor'>&nbsp;</span>\n#####\n\nA rectangle.",
                        command: "<span class='command-cursor'>&nbsp;</span> #&lt;Esc&gt;"
                    }, {
                        text: "#####\n# &nbsp;<span class='insert-cursor'>&nbsp;</span>\n#####\n\nA rectangle.",
                        command: "<span class='command-cursor'>&nbsp;</span>#&lt;Esc&gt;"
                    }, {
                        text: "#####\n# &nbsp; <span class='insert-cursor'>&nbsp;</span>\n#####\n\nA rectangle.",
                        command: "<span class='command-cursor'>#</span>&lt;Esc&gt;"
                    }, {
                        text: "#####\n# &nbsp; #<span class='insert-cursor'>&nbsp;</span>\n#####\n\nA rectangle.",
                        command: "<span class='command-cursor'>&lt;Esc&gt;</span>"
                    }, {
                        text: "#####\n# &nbsp; #\n# &nbsp; #\n# &nbsp; <span class='cursor'>#</span>\n#####\n\nA rectangle.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                word: {
                    type: "Text Object (w)",
                    desc: "A word consists of a sequence of letters, digits and underscores, or a sequence of other non-blank characters, separated with white space (spaces, tabs, &lt;EOL&gt;). An empty line is also considered to be a word.\nUse 'w', 'e', and 'b' to navigate words.\nSpecial case: \"cw\" is treated like \"ce\" if the cursor is on a non-blank. This is because \"cw\" is interpreted as change-word, and a word does not include the following white space.\n\nExample: <span class='caption'>(each word is surrounded by a rectangle)</span>\n<span class='word'>while</span> <span class='word'>(</span><span class='word'>next_line1</span> <span class='word'>!==</span> <span class='word'>\"</span><span class='word'>The</span> <span class='word'>END</span><span class='word'>!\")</span> <span class='word'>do</span> <span class='word'>{</span><BR>&nbsp; <span class='word'>next_line1</span> <span class='word'>=</span> <span class='word'>readNextLine</span><span class='word'>();</span><BR><span class='word'>}</span>"
                },
                WORD: {
                    type: "Text Object (W)",
                    desc: "A WORD consists of a sequence of non-blank characters, separated with white space. An empty line is also considered to be a WORD.\nUse 'W', 'E', and 'B' to navigate WORDs.\nSpecial case: \"cW\" is treated like \"cE\" if the cursor is on a non-blank. This is because \"cW\" is interpreted as change-WORD, and a WORD does not include the following white space.\n\nExample: <span class='caption'>(each WORD is surrounded by a rectangle)</span>\n<span class='word'>while</span> <span class='word'>(next_line1</span> <span class='word'>!==</span> <span class='word'>\"The</span> <span class='word'>END!\")</span> <span class='word'>do</span> <span class='word'>{</span><BR>&nbsp; <span class='word'>next_line1</span> <span class='word'>=</span> <span class='word'>readNextLine();</span><BR><span class='word'>}</span>"
                },
                sentence: {
                    type: "Text Object (s)",
                    desc: "A sentence is defined as ending at a '.', '!' or '?' followed by either the end of a line, or by a space or tab. Any number of closing ')', ']', '\"' and ''' characters may appear after the '.', '!' or '?' before the spaces, tabs or end of line. A paragraph boundary is also a sentence boundary.\nExample: <span class='caption'>(each sentence is surrounded by a rectangle)</span>\n<span class='sentence'>This is the first sentence.</span> <span class='sentence'>Is it followed by a question?</span> <span class='sentence'>Then he said: \"Some not so long quote.\"</span> <span class='sentence'>And it all ended with a BANG!</span> <span class='sentence'>True dat.</span>\nUse '(' and ')' to navigate sentences. Sentence text object is denoted by 's'."
                },
                paragraph: {
                    type: "Text Object (p)",
                    desc: "A paragraph begins after each empty line. A blank line (only containing white space) is NOT a paragraph boundary.\nUse '{' and '}' to navigate paragraphs. Paragraph text objects are denoted with 'p'.\nExample: <span class='caption'>(each paragraph is surrounded by a rectangle)</span>\n<div class='paragraph'>The following paragraph will describe the correct structure of a paragraph. Here goes:</div>&nbsp;<div class='paragraph'>Topic sentence. Supporting sentence number 1. Another supporting sentence. Yet another supporting sentence. Concluding sentence.</div>"
                },
                "{": {
                    type: "Motion",
                    desc: "[count] paragraphs backward.\nMove the cursor to the empty line before the current paragraph, or before the previous paragraph if the cursor isn't in a paragraph. See :help paragraph .",
                    example: [{
                        text: "This is a paragraph. It has nothing unusual in it. And then it ends.\n\nIt's followed by a bit of code:\n\nfunction doThatThing() {\n&nbsp; // TODO Do something\n\n&nbsp; ret<span class='cursor'>u</span>rn;\n}",
                        command: "<span class='command-cursor'>{</span>2{{"
                    }, {
                        text: "This is a paragraph. It has nothing unusual in it. And then it ends.\n\nIt's followed by a bit of code:\n\nfunction doThatThing() {\n&nbsp; // TODO Do something\n<span class='cursor'>&nbsp;</span>\n&nbsp; return;\n}",
                        command: "<span class='command-cursor'>2{</span>{"
                    }, {
                        text: "This is a paragraph. It has nothing unusual in it. And then it ends.\n<span class='cursor'>&nbsp;</span>\nIt's followed by a bit of code:\n\nfunction doThatThing() {\n&nbsp; // TODO Do something\n\n&nbsp; return;\n}",
                        command: "<span class='command-cursor'>{</span>"
                    }, {
                        text: "<span class='cursor'>T</span>his is a paragraph. It has nothing unusual in it. And then it ends.\n\nIt's followed by a bit of code:\n\nfunction doThatThing() {\n&nbsp; // TODO Do something\n\n&nbsp; return;\n}",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                "}": {
                    type: "Motion",
                    desc: "[count] paragraphs forward.\nMove the cursor to the empty line after the current paragraph, or after the next paragraph if the cursor isn't in a paragraph. See :help paragraph .",
                    example: [{
                        text: "This is a paragraph. It h<span class='cursor'>a</span>s nothing unusual in it. And then it ends.\n\nIt's followed by a bit of code:\n\nfunction doThatThing() {\n&nbsp; // TODO Do something\n\n&nbsp; return;\n} // End of awesome code",
                        command: "<span class='command-cursor'>}</span>2}}"
                    }, {
                        text: "This is a paragraph. It has nothing unusual in it. And then it ends.\n<span class='cursor'>&nbsp;</span>\nIt's followed by a bit of code:\n\nfunction doThatThing() {\n&nbsp; // TODO Do something\n\n&nbsp; return;\n} // End of awesome code",
                        command: "<span class='command-cursor'>2}</span>}"
                    }, {
                        text: "This is a paragraph. It has nothing unusual in it. And then it ends.\n\nIt's followed by a bit of code:\n\nfunction doThatThing() {\n&nbsp; // TODO Do something\n<span class='cursor'>&nbsp;</span>\n&nbsp; return;\n} // End of awesome code",
                        command: "<span class='command-cursor'>}</span>"
                    }, {
                        text: "This is a paragraph. It has nothing unusual in it. And then it ends.\n\nIt's followed by a bit of code:\n\nfunction doThatThing() {\n&nbsp; // TODO Do something\n\n&nbsp; return;\n} // End of awesome cod<span class='cursor'>e</span>",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                ")": {
                    type: "Motion",
                    desc: "[count] sentences forward.\nA sentence (see :help sentence) is defined as ending at a '.', '!' or '?' followed by either the end of a line, or by a space or tab. Any number of closing ')', ']', '\"' and ''' characters may appear after the '.', '!' or '?' before the spaces, tabs or end of line.\nA paragraph boundary (an empty line) is also a sentence boundary.",
                    example: [{
                        text: "This is the f<span class='cursor'>i</span>rst sentence. Is it followed by a question? Then he said: \"Some not so long quote.\" And it all ended with a BANG! True dat.",
                        command: "<span class='command-cursor'>2)</span>)"
                    }, {
                        text: "This is the first sentence. Is it followed by a question? <span class='cursor'>T</span>hen he said: \"Some not so long quote.\" And it all ended with a BANG! True dat.",
                        command: "<span class='command-cursor'>)</span>"
                    }, {
                        text: "This is the first sentence. Is it followed by a question? Then he said: \"Some not so long quote.\" <span class='cursor'>A</span>nd it all ended with a BANG! True dat.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                "(": {
                    type: "Motion",
                    desc: "[count] sentences backward.\nA sentence (see :help sentence) is defined as ending at a '.', '!' or '?' followed by either the end of a line, or by a space or tab. Any number of closing ')', ']', '\"' and ''' characters may appear after the '.', '!' or '?' before the spaces, tabs or end of line.\nA paragraph boundary (an empty line) is also a sentence boundary.",
                    example: [{
                        text: "This is the first sentence. Is it followed by a question? Then he said: \"Some not so long quote.\" And it all ended with a B<span class='cursor'>A</span>NG! True dat.",
                        command: "<span class='command-cursor'>(</span>2("
                    }, {
                        text: "This is the first sentence. Is it followed by a question? Then he said: \"Some not so long quote.\" <span class='cursor'>A</span>nd it all ended with a BANG! True dat.",
                        command: "<span class='command-cursor'>2(</span>"
                    }, {
                        text: "This is the first sentence. <span class='cursor'>I</span>s it followed by a question? Then he said: \"Some not so long quote.\" And it all ended with a BANG! True dat.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                "[{": g.unmatchedBracket,
                "[(": g.unmatchedBracket,
                "]}": g.unmatchedBracket,
                "])": g.unmatchedBracket,
                "text-objects": {
                    cmd: "text-objects",
                    type: "",
                    desc: "Text objects are two characters used after an operator ('d', 'y', 'c' etc.) to select a range to operate on. The first character is either 'a' (for \"an object\", including white space) or 'i' (for \"inner\" object, without surrounding white space, or only the white space). The second character denotes the object type and is one of the following:\n<span class='abbr'>w</span>ord, <span class='abbr'>W</span>ORD, <span class='abbr'>s</span>entence, <span class='abbr'>p</span>aragraph, <span class='abbr'><BR>\"</span> or <span class='abbr'>'</span> or <span class='abbr'>`</span> - a \", ', or ` quoted string<BR><span class='abbr'>{</span>, <span class='abbr'>}</span>, or <span class='abbr'>B</span> - A { } block<BR><span class='abbr'>(</span>, <span class='abbr'>)</span>, or <span class='abbr'>b</span> - A ( ) block<BR><span class='abbr'>[</span> or <span class='abbr'>]</span> - A [ ] block<BR><span class='abbr'>&lt;</span> or <span class='abbr'>&gt;</span> - A &lt; &gt; block<BR><span class='abbr'>t</span> - A HTML or XML tag block\nType :help followed by any text object (e.g. ap, a{, i' etc.) for examples."
                },
                aw: {
                    cmd: "aw",
                    type: "a word",
                    desc: "Text object to select [count] words (see :help word). Leading or trailing white space is included, but not counted.\nAs in all non-block text object, selection includes the word and the white space after it. If there is no white space after it, or when the cursor was in the white space before the word, the white space before the word is included.\n\nExamples: <span class='caption'>(selected text is surrounded by square)</span>\n\naw : <span class='text-object-range'>se<span class='cursor'>l</span>ect </span>a word.<BR>aw : no trailing<span class='text-object-range'> spa<span class='cursor'>c</span>es</span>.<BR>aw : on a leading<span class='text-object-range'>&nbsp;<span class='cursor'>&nbsp;</span>white</span> space.<BR>3aw : now <span class='text-object-range'>wit<span class='cursor'>h</span> a count </span>of 3."
                },
                iw: {
                    cmd: "iw",
                    type: "inner word",
                    desc: "Text object to select [count] words (see :help word). White space between words is counted too.\n\nAs in all non-block inner text objects, if the cursor was on the word, the selection applies to the word and if the cursor was on white space, the selection applies to the white space.\n\nExamples: <span class='caption'>(selected text is surrounded by square)</span>\n\niw : <span class='text-object-range'>se<span class='cursor'>l</span>ect</span> inner word.<BR>iw : on&nbsp;&nbsp;&nbsp;a<span class='text-object-range'>&nbsp;<span class='cursor'>&nbsp;</span>&nbsp;</span>space.<BR>3iw : white <span class='text-object-range'>spac<span class='cursor'>e</span>s are</span> also counted.<BR>3iw : now<span class='text-object-range'>&nbsp;<span class='cursor'>&nbsp</span>on </span>a leading white space."
                },
                aW: {
                    cmd: "aW",
                    type: "a WORD",
                    desc: "Text object to select [count] WORDs (see :help WORD). Leading or trailing white space is included, but not counted.\nAs in all non-block text objects, selection includes the WORD and the white space after it. If there is no white space after it, or when the cursor was in the white space before the WORD, the white space before the WORD is included.\n\nExamples: <span class='caption'>(selected text is surrounded by square)</span>\n\naW : <span class='text-object-range'>se<span class='cursor'>l</span>ect(!) </span>a WORD.<BR>aW : no trailing<span class='text-object-range'> spa<span class='cursor'>c</span>es.</span><BR>aW : on a leading<span class='text-object-range'>&nbsp;<span class='cursor'>&nbsp;</span>white-space.</span> Yeah.<BR>3aW : <span class='text-object-range'>wit<span class='cursor'>h</span> a-too-accurate count </span>of 3."
                },
                iW: {
                    cmd: "iW",
                    type: "inner WORD",
                    desc: "Text object to select [count] WORDs (see :help WORD). White space between WORDs is counted too.\n\nAs in all non-block inner text objects, if the cursor was on the WORD, the selection applies to the WORD and if the cursor was on white space, the selection applies to the white space.\n\nExamples: <span class='caption'>(selected text is surrounded by square)</span>\n\niW : <span class='text-object-range'>se<span class='cursor'>l</span>ect?!</span> inner WORD.<BR>iW : on&nbsp;&nbsp;&nbsp;a<span class='text-object-range'>&nbsp;<span class='cursor'>&nbsp;</span>&nbsp;</span>space.<BR>3iW : the <span class='text-object-range'>white-spac<span class='cursor'>e</span>s are</span> also counted.<BR>3iW : now <span class='text-object-range'>&nbsp;<span class='cursor'>&nbsp</span> *on* </span>a leading white space."
                },
                as: {
                    cmd: "as",
                    type: "a sentence",
                    desc: "Text object to select [count] sentences (see :help sentence).\nAs in all non-block text objects, selection includes the sentence and the white space after it. If there is no white space after it, or when the cursor was in the white space before the sentence, the white space before the sentence is included.\n\nExamples: <span class='caption'>(selected text is surrounded by square)</span>\n\nas : Hello! <span class='text-object-range'>I am <span class='cursor'>a</span> sentence. </span>Bye.<BR>as : Hello! I am a sentence.<span class='text-object-range'> By<span class='cursor'>e</span>.</span><BR>as : Hello!<span class='text-object-range'>&nbsp;<span class='cursor'>&nbsp;</span>I am a sentence.</span> Bye.<BR>2as : <span class='text-object-range'>Hell<span class='cursor'>o</span>! I am a sentence. </span>Bye."
                },
                is: {
                    cmd: "is",
                    type: "inner sentence",
                    desc: "Text object to select [count] sentences (see :help sentence).\nAs in all non-block inner text objects, if the cursor was on the sentence, the selection applies to the sentence and if the cursor was on white space, the selection applies to the white space.\n\nExamples: <span class='caption'>(selected text is surrounded by square)</span>\n\nis : Hello! <span class='text-object-range'>I am <span class='cursor'>a</span> sentence.</span> Bye.<BR>is : Hello! I am a sentence. <span class='text-object-range'>By<span class='cursor'>e</span>.</span><BR>is : Hello!<span class='text-object-range'>&nbsp;<span class='cursor'>&nbsp;</span></span>I am a sentence. Bye.<BR>2is : <span class='text-object-range'>Hell<span class='cursor'>o</span>! </span>I am a sentence. Bye."
                },
                ap: {
                    cmd: "ap",
                    type: "a paragraph",
                    desc: "Text object to select [count] paragraphs (see :help paragraph).\nA blank line (only containing white space) is also a paragraph boundary.\nExamples: <span class='caption'>(selected text is surrounded by square)</span>\n<div class='text-object-range'>This paragraph is selected with <span class='abbr'>ap</span>. It a<span class='cursor'>l</span>so includes the trailing white space (the blank link).<BR><BR></div>Very short paragraph.<BR><div class='text-object-range'><span class='cursor'>&nbsp;</span><BR>This paragraph, the next one, and the preceding white space were all selected with <span class='abbr'>2ap</span>. The white space was included because the cursor was in it, but also because there is no white space after the second paragraph.<BR><BR>Yet another paragraph.</div>"
                },
                ip: {
                    cmd: "ip",
                    type: "inner paragraph",
                    desc: "Text object to select [count] paragraphs (see :help paragraph).\nA blank line (only containing white space) is also a paragraph boundary.\nExamples: <span class='caption'>(selected text is surrounded by square)</span>\n<div class='text-object-range'>This paragraph is selected with <span class='abbr'>ip</span>. It d<span class='cursor'>o</span>esn't include the trailing white space (the blank link).</div><BR>Very short paragraph.<BR><div class='text-object-range'><span class='cursor'>&nbsp;</span><BR></div>The empty line above was selected using <span class='abbr'>ip</span> and includes only the white space.<BR><BR><div class='text-object-range'>This paragraph, the following white space, and <span class='cursor'>t</span>he paragraph after that are all selected with <span class='abbr'>3ip</span>.<BR><BR>Yet another paragraph.</div>"
                },
                "a[": {
                    cmd: "a[<span class='caption'>,</span> a]",
                    type: "a [] block",
                    desc: "Text object to select [count] '[' ']' blocks. This goes backwards to the [count] unclosed '[', and finds the matching ']'. The enclosed text is selected, including the '[' and ']'.\nExamples: <span class='caption'>(selected text is surrounded by square)</span>\n// Block selected with <span class='abbr'>a[</span><BR>var vowels = <span class='text-object-range'>['a','e'<span class='cursor'>,</span>'i','o','u']</span>;<BR><BR>// The following was selected with <span class='abbr'>2a]</span><BR>var multiArr = <span class='text-object-range'>[<BR>&nbsp; [ \"x\", \"o\", \"x\" ],<BR>&nbsp; [ \"o\", \"<span class='cursor'>x</span>\", \"o\" ],<BR>&nbsp; [ \"x\", \"o\", \"x\" ]<BR>]</span>;"
                },
                "i[": {
                    cmd: "i[<span class='caption'>,</span> i]",
                    type: "inner [] block",
                    desc: "Text object to select [count] '[' ']' blocks. This goes backwards to the [count] unclosed '[', and finds the matching ']'. The enclosed text is selected, excluding the '[' and ']'.\nExamples: <span class='caption'>(selected text is surrounded by square)</span>\n// Block selected with <span class='abbr'>i[</span><BR>var vowels = [<span class='text-object-range'>'a','e'<span class='cursor'>,</span>'i','o','u'</span>];<BR><BR>// The following was selected with <span class='abbr'>2i]</span><BR>var multiArr = [<BR><span class='text-object-range'>&nbsp; [ \"x\", \"o\", \"x\" ],<BR>&nbsp; [ \"o\", \"<span class='cursor'>x</span>\", \"o\" ],<BR>&nbsp; [ \"x\", \"o\", \"x\" ]</span><BR>];"
                },
                "a(": {
                    cmd: "a(<span class='caption'>,</span> a)<span class='caption'>,</span> ab",
                    type: "a block",
                    desc: "Text object to select [count] blocks, from \"[count] [(\" to the matching ')', including the '(' and ')' (see ':help [('). Does not include white space outside of the parenthesis.\nExamples: <span class='caption'>(selected text is surrounded by square)</span>\n// Condition below is selected with <span class='abbr'>a(</span><BR>while <span class='text-object-range'>(a<3 && b>5<span class='cursor'>&nbsp;</span>|| c==7)</span> {<BR>&nbsp console.log('Something is fishy!');<BR>}<BR><BR>// The following was selected with <span class='abbr'>3a)</span><BR><span class='text-object-range'>(function execRightAway() {<BR>&nbsp; alert('Password is ' + (2<span class='cursor'>+</span>5)*3);<BR>}())</span>;"
                },
                "i(": {
                    cmd: "i(<span class='caption'>,</span> i)<span class='caption'>,</span> ib",
                    type: "inner block",
                    desc: "Text object to select [count] blocks, from \"[count] [(\" to the matching ')', excluding the '(' and ')' (see ':help [(').\nExamples: <span class='caption'>(selected text is surrounded by square)</span>\n// Condition below is selected with <span class='abbr'>i(</span><BR>while (<span class='text-object-range'>a<3 && b>5<span class='cursor'>&nbsp;</span>|| c==7</span>) {<BR>&nbsp console.log('Something is fishy!');<BR>}<BR><BR>// The following was selected with <span class='abbr'>3i)</span><BR>(<span class='text-object-range'>function execRightAway() {<BR>&nbsp; alert('Password is ' + (2<span class='cursor'>+</span>5)*3);<BR>}()</span>);"
                },
                "a<": {
                    cmd: "a&lt;<span class='caption'>,</span> a&gt;",
                    type: "a &lt;&gt; block",
                    desc: "Text object to select [count] &lt;&gt; blocks, from the [count]'th unmatched '&lt;' backwards to the matching '&gt;', including the '&lt;' and '&gt;'.\nFor more convenient editing of HTML &amp; XML, check out the help for the tag text object ('it' or 'at').\nExamples: <span class='caption'>(selected text is surrounded by square)</span>\n// The following was selected with <span class='abbr'>a&gt;</span><BR>m = std::map<span class='text-object-range'>&lt;int, <span class='cursor'>s</span>tring&gt;</span>;<BR><BR>The following was selected with <span class='abbr'>2a&lt;</span><BR><span class='text-object-range'>&lt;!--<BR>&nbsp; &lt;script&gt;<BR>&nbsp; &nbsp; // Here goes the script!<BR>&nbsp; &lt;/scri<span class='cursor'>p</span>t&gt;<BR> --&gt;</span><BR>"
                },
                "i<": {
                    cmd: "i&lt;<span class='caption'>,</span> i&gt;",
                    type: "inner &lt;&gt; block",
                    desc: "Text object to select [count] &lt;&gt; blocks, from the [count]'th unmatched '&lt;' backwards to the matching '&gt;', excluding the '&lt;' and '&gt;'.\nFor more convenient editing of HTML &amp; XML, check out the help for the tag text object ('it' or 'at').\nExamples: <span class='caption'>(selected text is surrounded by square)</span>\n// The following was selected with <span class='abbr'>i&gt;</span><BR>m = std::map&lt;<span class='text-object-range'>int, <span class='cursor'>s</span>tring</span>&gt;;<BR><BR>The following was selected with <span class='abbr'>2i&lt;</span><BR>&lt;<span class='text-object-range'>!--<BR>&nbsp; &lt;script&gt;<BR>&nbsp; &nbsp; // Here goes the script!<BR>&nbsp; &lt;/scri<span class='cursor'>p</span>t&gt;<BR> --</span>&gt;<BR>"
                },
                at: {
                    type: "a tag block",
                    desc: "Text object to select [count] tag blocks, from the [count]'th unmatched \"&lt;aaa&gt;\" backwards to the matching \"&lt;/aaa&gt;\", including the \"&lt;aaa&gt;\" and \"&lt;/aaa&gt;\". Not implemented in this game.\nExamples: <span class='caption'>(selected text is surrounded by square)</span>\n<div style='font-size: 0.9em; line-height: 160%;'>&lt;dialog&gt;<BR>&nbsp; <span class='text-object-range'>&lt;movie&gt;<BR>&nbsp; &nbsp; &lt;name&gt;Pul<span class='cursor'>p</span> Fi<span class='tobj-range-tip-location'>c<span class='tobj-range-tip'>2at</span></span>tion&lt;/name&gt;<BR>&nbsp; &nbsp; &lt;year&gt;1994&lt;/year&gt;<BR>&nbsp; &lt;/movie&gt;</span><BR>&nbsp; &lt;line&gt;Whose motorcycle is this?&lt;/line&gt;<BR>&nbsp; &lt;line&gt;It's a chopper, baby.&lt;/line&gt;<BR>&nbsp; <span class='text-object-range'>&lt;line&gt;Whose chopper <span class='cursor'>i</span>s t<span class='tobj-range-tip-location'>h<span class='tobj-range-tip-down'>at</span></span>is?&lt;/line&gt;</span><BR>&nbsp; &lt;line&gt;It's Zed's.&lt;/line&gt;<BR>&nbsp; &lt;line&gt;Who's Zed?&lt;/line&gt;<BR>&nbsp; &lt;line&gt;Zed's dead, baby. Zed's dead.&lt;/line&gt;<BR>&lt;/dialog&gt;</div>"
                },
                it: {
                    type: "inner tag block",
                    desc: "Text object to select [count] tag blocks, from the [count]'th unmatched \"&lt;aaa&gt;\" backwards to the matching \"&lt;/aaa&gt;\", excluding the \"&lt;aaa&gt;\" and \"&lt;/aaa&gt;\". Not implemented in this game.\nExamples: <span class='caption'>(selected text is surrounded by square)</span>\n<div style='font-size: 0.9em; line-height: 160%;'>&lt;dialog&gt;<BR>&nbsp; &lt;movie&gt;<span class='text-object-range'>&nbsp;<BR>&nbsp; &nbsp; &lt;name&gt;Pul<span class='cursor'>p</span> Fi<span class='tobj-range-tip-location'>c<span class='tobj-range-tip'>2it</span></span>tion&lt;/name&gt;<BR>&nbsp; &nbsp; &lt;year&gt;1994&lt;/year&gt;<BR>&nbsp; </span>&lt;/movie&gt;<BR>&nbsp; &lt;line&gt;Whose motorcycle is this?&lt;/line&gt;<BR>&nbsp; &lt;line&gt;It's a chopper, baby.&lt;/line&gt;<BR>&nbsp; &lt;line&gt;<span class='text-object-range'>Whose chopper <span class='cursor'>i</span>s t<span class='tobj-range-tip-location'>h<span class='tobj-range-tip-down'>it</span></span>is?</span>&lt;/line&gt;<BR>&nbsp; &lt;line&gt;It's Zed's.&lt;/line&gt;<BR>&nbsp; &lt;line&gt;Who's Zed?&lt;/line&gt;<BR>&nbsp; &lt;line&gt;Zed's dead, baby. Zed's dead.&lt;/line&gt;<BR>&lt;/dialog&gt;</div>"
                },
                "a{": {
                    cmd: "a{<span class='caption'>,</span> a}<span class='caption'>,</span> aB",
                    type: "a Block",
                    desc: "Text object to select [count] Blocks, from \"[count] [{\" to the matching '}', including the '{' and '}' (see ':help [{').\nExamples: <span class='caption'>(selected text is surrounded by square)</span>\nvar myModule = (function() {<BR>&nbsp; &nbsp; var privateVar = 3;<BR>&nbsp; &nbsp; function privateFunc() <span class='text-object-range'>{<BR>&nbsp; &nbsp; &nbsp; &nbsp; var i;<BR>&nbsp; &nbsp; &nbsp; &nbsp; for (i = 0; i < 5; ++i) {<BR>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; privateVar += (i <span class='cursor'>*</span> <span class='tobj-range-tip-location'>2<span class='tobj-range-tip-down'>2a{</span></span> + 3);<BR>&nbsp; &nbsp; &nbsp; &nbsp; }<BR>&nbsp; &nbsp; }</span><BR>&nbsp; &nbsp; return <span class='text-object-range'>{<BR>&nbsp; &nbsp; &nbsp; &nbsp; doMath <span class='cursor'>:</span> pri<span class='tobj-range-tip-location'>v<span class='tobj-range-tip'>a}</span></span>ateFunc<BR>&nbsp; &nbsp; }</span>;<BR>}());"
                },
                "i{": {
                    cmd: "i{<span class='caption'>,</span> i}<span class='caption'>,</span> iB",
                    type: "inner Block",
                    desc: "Text object to select [count] Blocks, from \"[count] [{\" to the matching '}', excluding the '{' and '}' (see ':help [{').\nExamples: <span class='caption'>(selected text is surrounded by square)</span>\nvar myModule = (function() {<BR>&nbsp; &nbsp; var privateVar = 3;<BR>&nbsp; &nbsp; function privateFunc() {<span class='text-object-range'>&nbsp;<BR>&nbsp; &nbsp; &nbsp; &nbsp; var i;<BR>&nbsp; &nbsp; &nbsp; &nbsp; for (i = 0; i < 5; ++i) {<BR>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; privateVar += (i <span class='cursor'>*</span> <span class='tobj-range-tip-location'>2<span class='tobj-range-tip-down'>2i{</span></span> + 3);<BR>&nbsp; &nbsp; &nbsp; &nbsp; }<BR>&nbsp; &nbsp; </span>}<BR>&nbsp; &nbsp; return {<span class='text-object-range'>&nbsp;<BR>&nbsp; &nbsp; &nbsp; &nbsp; doMath <span class='cursor'>:</span> pri<span class='tobj-range-tip-location'>v<span class='tobj-range-tip'>i}</span></span>ateFunc<BR>&nbsp; &nbsp; </span>};<BR>}());"
                },
                'a"': {
                    cmd: "a\"<span class='caption'>,</span> a'<span class='caption'>,</span> a`",
                    type: "a quoted string",
                    desc: "Selects the text from the previous quote until the next quote.\nOnly works within one line. A count is currently not used. If a quote can't be found before or under the cursor, one is searched for down the line. When the cursor starts on a quote, Vim will figure out which quote pairs form a string by searching from the start of the line. Any trailing white space is included, unless there is none, then leading white space is included.\nExamples: <span class='caption'>(selected text is surrounded by square)</span>\na\" : a<span class='cursor'>l</span>ert(<span class='text-object-range'>\"What's up doc\" </span>+ \"?\");<BR>a' : alert('Hip Hip<span class='text-object-range'>' <span class='cursor'>+</span> ' </span>Horray!');<BR>a' : alert(<span class='text-object-range'>'Hip Hip<span class='cursor'>'</span>&nbsp;</span>+ ' Horray!');<BR>a` : echo<span class='text-object-range'> `se<span class='cursor'>q</span> 1 5`</span>?"
                },
                'i"': {
                    cmd: "i\"<span class='caption'>,</span> i'<span class='caption'>,</span> i`",
                    type: "inner<BR>quoted string",
                    desc: "Just like a\", a' and a`, but excludes the quotes.\nUnlike a\", a' and a` count is supported in VIM, but not in this game.\nExamples: <span class='caption'>(selected text is surrounded by square)</span>\ni\" : a<span class='cursor'>l</span>ert(\"<span class='text-object-range'>What's up doc</span>\" + \"?\");<BR>a' : alert('Hip Hip'<span class='text-object-range'>&nbsp<span class='cursor'>+</span>&nbsp;</span>' Horray!');<BR>i' : alert('<span class='text-object-range'>Hip Hip</span><span class='cursor'>'</span> + ' Horray!');<BR>a` : echo `<span class='text-object-range'>se<span class='cursor'>q</span> 1 5</span>`?"
                },
                ".": {
                    type: "Command",
                    desc: "Repeat the last simple change. Without a count, the count of the last change is used. If you enter a count, it will replace the last one.\nIf the last change included a specification of a numbered register, the register number will be incremented.\nDoes not repeat a command-line command.",
                    example: [{
                        text: "function <span class='cursor'>a</span>Func();\nfunction anotherOne();",
                        command: "<span class='command-cursor'>A</span>&lt;Backspace&gt; {&lt;Enter&gt;}&lt;Esc&gt;j."
                    }, {
                        text: "function aFunc();<span class='insert-cursor'>&nbsp;</span>\nfunction anotherOne();",
                        command: "<span class='command-cursor'>&lt;Backspace&gt;</span> {&lt;Enter&gt;}&lt;Esc&gt;j."
                    }, {
                        text: "function aFunc()<span class='insert-cursor'>&nbsp;</span>\nfunction anotherOne();",
                        command: "<span class='command-cursor'>&nbsp;</span>{&lt;Enter&gt;}&lt;Esc&gt;j."
                    }, {
                        text: "function aFunc() <span class='insert-cursor'>&nbsp;</span>\nfunction anotherOne();",
                        command: "<span class='command-cursor'>{</span>&lt;Enter&gt;}&lt;Esc&gt;j."
                    }, {
                        text: "function aFunc() {<span class='insert-cursor'>&nbsp;</span>\nfunction anotherOne();",
                        command: "<span class='command-cursor'>&lt;Enter&gt;</span>}&lt;Esc&gt;j."
                    }, {
                        text: "function aFunc() {\n<span class='insert-cursor'>&nbsp;</span>\nfunction anotherOne();",
                        command: "<span class='command-cursor'>}</span>&lt;Esc&gt;j."
                    }, {
                        text: "function aFunc() {\n}<span class='insert-cursor'>&nbsp;</span>\nfunction anotherOne();",
                        command: "<span class='command-cursor'>&lt;Esc&gt;</span>}j."
                    }, {
                        text: "function aFunc() {\n<span class='cursor'>}</span>\nfunction anotherOne();",
                        command: "<span class='command-cursor'>j</span>."
                    }, {
                        text: "function aFunc() {\n}\n<span class='cursor'>f</span>unction anotherOne();",
                        command: "<span class='command-cursor'>.</span>"
                    }, {
                        text: "function aFunc() {\n}\nfunction anotherOne() {\n<span class='cursor'>}</span>",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                H: {
                    type: "Motion",
                    desc: "To line [count] from first line on the window (<span class='target-location'>H</span>igh) on the first non-blank character (linewise), without scrolling the screen.\nIn this game, if the first line of the text is visible on the screen use it instead of the first line on the window.",
                    example: [{
                        text: "This is a very <span class='cursor'>l</span>ong file.\nIt has a lot more than four lines.\nThese are only the first four.\nForth line, more below...",
                        command: "<span class='command-cursor'>3H</span>GH"
                    }, {
                        text: "This is a very long file.\nIt has a lot more than four lines.\n<span class='cursor'>T</span>hese are only the first four.\nForth line, more below...",
                        command: "<span class='command-cursor'>G</span>H"
                    }, {
                        text: "The last four lines in the file.\nThird from last.\nAlmost there.\n<span class='cursor'>T</span>here. Last.",
                        command: "<span class='command-cursor'>H</span>"
                    }, {
                        text: "<span class='cursor'>T</span>he last four lines in the file.\nThird from last.\nAlmost there.\nThere. Last.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                M: {
                    type: "Motion",
                    desc: "To <span class='target-location'>M</span>iddle line of window, on the first non-blank character (linewise), without scrolling the screen.\nIn this game, if either of the first line of the text, the last line of the text, or both are visible on the screen use them instead of the first and last line of the window for calculating the middle.",
                    example: [{
                        text: "This is a very <span class='cursor'>l</span>ong file.\nIt has a lot more than five lines.\nThese are only the first five.\nForth line.\nMore below...",
                        command: "<span class='command-cursor'>M</span>GM"
                    }, {
                        text: "This is a very long file.\nIt has a lot more than five lines.\n<span class='cursor'>T</span>hese are only the first five.\nForth line.\nMore below...",
                        command: "<span class='command-cursor'>G</span>M"
                    }, {
                        text: "The last five lines in the file.\nThird from last.\nAlmost there.\nAlmost there.\n<span class='cursor'>L</span>ast line.",
                        command: "<span class='command-cursor'>M</span>"
                    }, {
                        text: "The last five lines in the file.\nThird from last.\n<span class='cursor'>A</span>lmost there.\nAlmost there.\nLast line.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                L: {
                    type: "Motion",
                    desc: "To line [count] from bottom of the window (<span class='target-location'>L</span>ow) on the first non-blank character (linewise), without scrolling the screen.\nIn this game, if the last line of the text is visible on the screen use it instead of the bottom line on the window.",
                    example: [{
                        text: "<span class='cursor'>T</span>he last four lines in the file.\nThird from last.\nAlmost there.\nThere. Last.",
                        command: "<span class='command-cursor'>2L</span>ggL"
                    }, {
                        text: "The last four lines in the file.\nThird from last.\n<span class='cursor'>A</span>lmost there.\nThere. Last.",
                        command: "<span class='command-cursor'>gg</span>L"
                    }, {
                        text: "<span class='cursor'>T</span>his is a very long file.\nIt has a lot more than four lines.\nThese are only the first four.\nForth line, more below...",
                        command: "<span class='command-cursor'>L</span>"
                    }, {
                        text: "This is a very long file.\nIt has a lot more than four lines.\nThese are only the first four.\n<span class='cursor'>F</span>orth line, more below...",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                nu: g.setnuDesc,
                "\\nu": g.setnuDesc,
                nonu: g.setnuDesc,
                "nu!": g.setnuDesc,
                "nonu!": g.setnuDesc,
                "|": {
                    type: "<span class='caption'>(bar or pipe)</span> Motion",
                    desc: "To column [count] in the current line.",
                    example: [{
                        text: "Where have all the <span class='cursor'>m</span>otions gone?",
                        command: "<span class='command-cursor'>|</span>3|"
                    }, {
                        text: "<span class='cursor'>W</span>here have all the motions gone?",
                        command: "<span class='command-cursor'>3|</span>"
                    }, {
                        text: "Wh<span class='cursor'>e</span>re have all the motions gone?",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                "/": g.freesearchCmdDesc,
                "?": g.freesearchCmdDesc,
                "/?": g.freesearchCmdDesc,
                "`": {
                    cmd: "`{mark}",
                    type: "Motion <span class='caption'>(or movement)</span>",
                    desc: "Jump to the specified mark.\nWith local marks that are found in the current text such as lower case letters, it can be used as a motion in commands.<BR>When used with global marks found in a different text or buffer (such as captial letters), the cursor jumps to the mark, changing texts (buffers) in the process.\n:marks lists all the current marks.",
                    example: [{
                        text: "To und<span class='cursor'>e</span>rstand what recursion is,<BR>you mus<span class='target-location'>t<span class='target-location-tip-down three-letters'>&nbsp;R&nbsp;</span></span> first understand recursion.",
                        command: "<span class='command-cursor'>`D</span>d`b`R"
                    }, {
                        text: "Two &nbsp; roads diverged in a yellow wood,<BR>And <span class='target-location'><span class='cursor'>b</span><span class='target-location-tip three-letters'>&nbsp;D&nbsp;</span></span>oth seemed very very nice,<BR>so <span class='target-location'>s<span class='target-location-tip-down three-letters'>&nbsp;b&nbsp;</span></span>orry I could not travel both",
                        command: "<span class='command-cursor'>d`b</span>`R"
                    }, {
                        text: "Two &nbsp; roads diverged in a yellow wood,<BR>And <span class='target-location'><span class='cursor'>s</span><span class='target-location-tip three-letters'>&nbsp;D&nbsp;</span></span>or<span class='target-location'>r<span class='target-location-tip-down three-letters'>&nbsp;b&nbsp;</span></span>y I could not travel both<BR>And be one traveler, long I stood",
                        command: "<span class='command-cursor'>`R</span>"
                    }, {
                        text: "To understand what recursion is,<BR>you mus<span class='target-location'><span class='cursor'>t</span><span class='target-location-tip-down three-letters'>&nbsp;R&nbsp;</span></span> first understand recursion.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                "'": {
                    cmd: "'{mark}",
                    type: "Motion <span class='caption'>(or movement)</span>",
                    desc: "Jump to the first non-blank character in the line of the specified mark.\nWith local marks that are found in the current text such as lower case letters, it can be used as a <b>linewise</b> motion.<BR>When used with global marks found in a different text or buffer (such as captial letters), the cursor jumps to the mark, changing texts (buffers) in the process.\n:marks lists all the current marks.",
                    example: [{
                        text: "To und<span class='cursor'>e</span>rstand what recursion is,<BR>you mus<span class='target-location'>t<span class='target-location-tip-down three-letters'>&nbsp;R&nbsp;</span></span> first understand recursion.",
                        command: "<span class='command-cursor'>'D</span>d'b'R"
                    }, {
                        text: "Two &nbsp; roads diverged in a yellow wood,<BR><span class='cursor'>A</span>nd <span class='target-location'>b<span class='target-location-tip three-letters'>&nbsp;D&nbsp;</span></span>oth seemed very very nice,<BR>so <span class='target-location'>s<span class='target-location-tip-down three-letters'>&nbsp;b&nbsp;</span></span>orry I could not travel both",
                        command: "<span class='command-cursor'>d'b</span>'R"
                    }, {
                        text: "Two &nbsp; roads diverged in a yellow wood,<BR><span class='cursor'>A</span>nd <span class='target-location'>b<span class='target-location-tip three-letters'>&nbsp;D&nbsp;</span></span>e one traveler, long I stood<BR>And looked down one as far as I could",
                        command: "<span class='command-cursor'>'R</span>"
                    }, {
                        text: "To understand what recursion is,<BR><span class='cursor'>y</span>ou mus<span class='target-location'>t<span class='target-location-tip-down three-letters'>&nbsp;R&nbsp;</span></span> first understand recursion.",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                m: {
                    cmd: "m{mark}",
                    type: "Command",
                    desc: "Set a mark at cursor position (shown as a flag, but is invisible in VIM).\nLocal marks such as lower case a - z are private to the current text and can mark different locations in different texts at the same time.\nGlobal marks, such as capital A - Z are unique and save also the filename or buffer. A new global mark will always replace the existing one if any.",
                    example: [{
                        text: "Always remember: X marks the <span class='cursor'>s</span>pot!",
                        command: "<span class='command-cursor'>mX</span>:b#&lt;Enter&gt;`X"
                    }, {
                        text: "Always remember: X marks the <span class='target-location'><span class='cursor'>s</span><span class='target-location-tip three-letters'>&nbsp;X&nbsp;</span></span>pot!",
                        command: "<span class='command-cursor'>:b#&lt;Enter&gt;</span>`X"
                    }, {
                        text: "Some other file in a<span class='cursor'>n</span>other buffer...",
                        command: "<span class='command-cursor'>`X</span>"
                    }, {
                        text: "Always remember: X marks the <span class='target-location'><span class='cursor'>s</span><span class='target-location-tip three-letters'>&nbsp;X&nbsp;</span></span>pot!",
                        command: "<span class='command-cursor'></span>"
                    }]
                },
                marks: g.colonMarks,
                ":marks": g.colonMarks,
                delm: g.colonDelmarks,
                "delm!": g.colonDelmarks,
                "delmarks!": g.colonDelmarks,
                delmarks: g.colonDelmarks,
                ":delm": g.colonDelmarks,
                ":delm!": g.colonDelmarks,
                ":delmarks!": g.colonDelmarks,
                ":delmarks": g.colonDelmarks,
                u: g.undo,
                ":u": g.undo,
                ":undo": g.undo,
                undo: g.undo,
                "CTRL-R": g.redo,
                "ctrl-r": g.redo,
                "CTRL-r": g.redo,
                "CTRL+R": g.redo,
                "ctrl+r": g.redo,
                "CTRL+r": g.redo,
                ":redo": g.redo,
                redo: g.redo,
                red: g.redo,
                ":red": g.redo
            }
        }
        if (u === "[]") {
            u = "[{"
        }
        if (u === "{}") {
            u = "}"
        }
        if (u === "()") {
            u = ")"
        }
        if (u === "ai" || u === "ia" || u === "\\ia") {
            u = "text-objects"
        }
        if (u.length === 2 && (u.charAt(0) === "a" || u.charAt(0) === "i")) {
            ["[]", "()", "{}", "<>", "(b", "{B", '"`', "\"'"].forEach(function (v) {
                if (u.charAt(1) === v.charAt(1)) {
                    u = u.charAt(0) + v.charAt(0)
                }
            })
        }
        t = g.descMap[u];
        if (u.charAt(0) === '"' && u.length === 2 && ((u.charAt(1) >= "a" && u.charAt(1) <= "z") || (u.charAt(1) >= "A" && u.charAt(1) <= "Z"))) {
            t = g.namedRegisters
        }
        if (t && !t.cmd) {
            t.cmd = u
        }
        return t
    }

    function d(t) {
        return !!g(t)
    }

    function e(A) {
        var z = g(A),
            v = "",
            t, u, w;
        if (!z) {
            return undefined
        }
        return z.example ? z.example.length : 0
    }

    function c(B, w) {
        var A = g(B),
            v = "",
            t, u, z;
        if (!A) {
            return
        }
        w = w || 0;
        v += "<h1>" + A.cmd + "</h1>";
        v += "<p class='key-type'>" + A.type + "</p><div class='clearBoth'></div>";
        t = A.desc.split("\n");
        for (u = 0; u < t.length; ++u) {
            v += "<p>" + t[u] + "</p>"
        }
        v += "<div id='example'>";
        if (A.example && A.example[w] && A.example[w].text) {
            z = A.example[w].text.split("\n");
            v += "<p>Example: <span class='code'>" + A.example[w].command + "</span><br><span class='caption'>(Press '+' or '-' to move through the example)</span></p>";
            v += "<p class='example_text code'>";
            for (u = 0; u < z.length; ++u) {
                v += z[u] + (u !== z.length - 1 ? "<br />" : "")
            }
            v += "</p>"
        }
        v += "</div>";
        return v
    }

    function p(t) {
        switch (t) {
            case "h":
                return "Move one character to the left";
            case "j":
                return "Move one character down";
            case "k":
                return "Move one character up";
            case "l":
                return "Move one character right";
            case "w":
                return "Jump to the next beginning of word";
            case "e":
                return "Jump to the next end of word";
            case "b":
                return "Jump to the previous beginning of word";
            case "B":
                return "Jump to the previous beginning of WORD";
            case "x":
                return "Delete the character under the cursor";
            case "X":
                return "Delete the character before the cursor (Backspace)";
            case "W":
                return "Jump to the next beginning of WORD";
            case "E":
                return "Jump to the next end of WORD";
            case "r":
                return "Replace the character under the cursor with another one";
            case "~":
                return "Flip the case of the character under the cursor";
            case "d":
                return "Delete range indicated by following motion (w, e, etc). dd for the entire line.";
            case "D":
                return "Delete from the current position until the end of the line.";
            case "^":
                return "Move to the first non-space character in the current line";
            case "0":
                return "Move to the beginning of the current line";
            case "$":
                return "Move to the end of the current line";
            case "f":
                return "Move to the next occurence of a given character in the same line";
            case "F":
                return "Move to the previous occurence of a given character in the same line";
            case "t":
                return "Move to one character before the next occurence of a given character in the same line";
            case "T":
                return "Move to one character before the previous occurence of a given character in the same line";
            case "z":
                return "Scroll screen so the cursor current position will be at the top (t), bottom (b) or middle (z)";
            case "%":
                return "Move to the matching bracket or parentheses";
            case ":":
                return "Enter VIM Command line mode. For a full command list, type ':help :' (without the quotes)";
            case ";":
                return "Repeat the last t/T/f/F search";
            case ",":
                return "Reverse the last t/T/f/F search";
            case "G":
                return "Move to the last line of the text (soft beginning of line) or to the given [count] line number";
            case "g":
                return "Use 'gg' to move to the first line of the text (soft beginning of line)";
            case "*":
                return "Search forward for the word nearest to the cursor";
            case "#":
                return "Search backwards for the word nearest to the cursor";
            case "n":
                return "Repeat the last */#/? or / search";
            case "N":
                return "Repeat the last */#/? or / search in the opposite direction";
            case "p":
                return "Paste the last yanked, changed, or deleted text after the current position";
            case "P":
                return "Paste the last yanked, changed, or deleted text before the current position";
            case '"':
                return 'Use register {a-zA-Z0-9.%#:-"} for next delete, yank	or put (use uppercase character to append with delete and yank)';
            case "y":
                return "Yank (copy) text";
            case "Y":
                return "Linewise yank (copy) text";
            case "i":
                return "Insert text before cursor position";
            case "I":
                return "Insert text before first non-space character in the current line";
            case "a":
                return "Append text after cursor position";
            case "A":
                return "Append text at the end of the current line";
            case "c":
                return "Change range indicated by the following motion (w, e, etc.) and enter insert mode. cc for the changing the entire line.";
            case "C":
                return "Change text from current location until the end of the line. Synonym for c$.";
            case "s":
                return "Substitute current char with new text (enters insert mode).";
            case "S":
                return "Substitute current line with new text (enters insert mode). Synonym for cc.";
            case "o":
                return "Open a new line below the current line and enter insert mode.";
            case "O":
                return "Open a new line above the current line and enter insert mode.";
            case "{":
                return "Move to the empty line before the current (or previous) paragraph";
            case "}":
                return "Move to the empty line after the current (or next) paragraph";
            case ")":
                return "Move to the beginning of the next sentence.";
            case "(":
                return "Move to the beginning of the current (or previous) sentence.";
            case "[":
                return "Use [{ or [( to find the first unmatched { or ( going backward from current position";
            case "]":
                return "Use ]} or ]) to find the first unmatched } or ) going forward from current position";
            case ".":
                return "Repeat last change";
            case "H":
                return "To line [count] from top (Home) of window on the first non-blank character";
            case "M":
                return "To Middle line of window, on the first non-blank character";
            case "L":
                return "To line [count] from bottom of window on the first non-blank character";
            case "/":
                return "Search forward for [count]'th occurrence of search pattern specified";
            case "?":
                return "Search backward for [count]'th occurrence of search pattern specified";
            case "|":
                return "Move to column [count] in the current line";
            case "`":
                return "Jump to mark";
            case "'":
                return "Jump to the first non-blank character in the line of the specified mark (linewise motion)";
            case "m":
                return "Set mark {a-zA-Z} at cursor position";
            case "u":
                return "Undo [count] changes";
            case "CTRL-R":
                return "Redo [count] changes that were undone";
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                return "Use as a part of a number [count] before an operation or a motion to repeat it the specified number of times"
        }
        return ""
    }

    function s(t) {
        if (m(t) && f.indexOf(t) === -1) {
            f = (f || "") + t
        }
    }
    return {
        init: n,
        set: j,
        isValid: m,
        add: k,
        DEBUG_remove: l,
        get: b,
        getData: h,
        restore: q,
        getKeyDescription: p,
        hasExtendedDesc: d,
        getExtendedDescHTML: c,
        getNumberOfExampleSteps: e,
        temporarilyDisable: s,
        isDisabled: i
    }
})();
vim.timer = (function () {
    var a, k, b, i = -1;

    function c(m, l) {
        f(b);
        k = m;
        a = Date.now();
        b = l;
        i = window.setTimeout(d, m * 1000)
    }

    function d() {
        if (i !== -1) {
            vim.buffers.getCurrentBuffer().getEntities().getByName(b).timerDone();
            i = -1
        }
    }

    function f(l) {
        if (j(l)) {
            window.clearTimeout(i);
            i = -1;
            k = 0
        }
    }

    function j(l) {
        return (i !== -1 && (typeof timeName === "undefined" || b === l))
    }

    function g() {
        var m, n, l;
        m = k - Math.floor((Date.now() - a) / 1000);
        n = Math.floor(m % 60);
        l = Math.min(Math.floor(m / 60), 59);
        if (l === 59) {
            n = 59
        }
        if (m < 0) {
            return "00 : 00"
        }
        return ((l < 10 ? "0" + l : l) + " : " + (n < 10 ? "0" + n : n))
    }

    function e() {
        var l = i !== -1 ? k - Math.floor((Date.now() - a) / 1000) : null;
        return {
            timerName: b,
            secondsLeft: l
        }
    }

    function h(l) {
        f();
        if (l.secondsLeft !== null && l.secondsLeft >= 0) {
            c(l.secondsLeft, l.timerName)
        }
    }
    return {
        set: c,
        clear: f,
        isActive: j,
        getTimeString: g,
        getData: e,
        restore: h
    }
})();
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (c) {
        var a = "";
        var k, h, f, j, g, e, d;
        var b = 0;
        c = Base64._utf8_encode(c);
        while (b < c.length) {
            k = c.charCodeAt(b++);
            h = c.charCodeAt(b++);
            f = c.charCodeAt(b++);
            j = k >> 2;
            g = ((k & 3) << 4) | (h >> 4);
            e = ((h & 15) << 2) | (f >> 6);
            d = f & 63;
            if (isNaN(h)) {
                e = d = 64
            } else {
                if (isNaN(f)) {
                    d = 64
                }
            }
            a = a + this._keyStr.charAt(j) + this._keyStr.charAt(g) + this._keyStr.charAt(e) + this._keyStr.charAt(d)
        }
        return a
    },
    decode: function (c) {
        var a = "";
        var k, h, f;
        var j, g, e, d;
        var b = 0;
        c = c.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (b < c.length) {
            j = this._keyStr.indexOf(c.charAt(b++));
            g = this._keyStr.indexOf(c.charAt(b++));
            e = this._keyStr.indexOf(c.charAt(b++));
            d = this._keyStr.indexOf(c.charAt(b++));
            k = (j << 2) | (g >> 4);
            h = ((g & 15) << 4) | (e >> 2);
            f = ((e & 3) << 6) | d;
            a = a + String.fromCharCode(k);
            if (e != 64) {
                a = a + String.fromCharCode(h)
            }
            if (d != 64) {
                a = a + String.fromCharCode(f)
            }
        }
        a = Base64._utf8_decode(a);
        return a
    },
    _utf8_encode: function (b) {
        b = b.replace(/\r\n/g, "\n");
        var a = "";
        for (var e = 0; e < b.length; e++) {
            var d = b.charCodeAt(e);
            if (d < 128) {
                a += String.fromCharCode(d)
            } else {
                if (d > 127 && d < 2048) {
                    a += String.fromCharCode((d >> 6) | 192);
                    a += String.fromCharCode((d & 63) | 128)
                } else {
                    a += String.fromCharCode((d >> 12) | 224);
                    a += String.fromCharCode(((d >> 6) & 63) | 128);
                    a += String.fromCharCode((d & 63) | 128)
                }
            }
        }
        return a
    },
    _utf8_decode: function (a) {
        var d = "";
        var f = 0;
        var g = 0,
            e = 0,
            b = 0;
        while (f < a.length) {
            g = a.charCodeAt(f);
            if (g < 128) {
                d += String.fromCharCode(g);
                f++
            } else {
                if (g > 191 && g < 224) {
                    e = a.charCodeAt(f + 1);
                    d += String.fromCharCode(((g & 31) << 6) | (e & 63));
                    f += 2
                } else {
                    e = a.charCodeAt(f + 1);
                    b = a.charCodeAt(f + 2);
                    d += String.fromCharCode(((g & 15) << 12) | ((e & 63) << 6) | (b & 63));
                    f += 3
                }
            }
        }
        return d
    }
};
vim.fetcher = (function () {
    var jQuery = vim.dom.$;

    function ajaxRequest(url, successCB, failCB, element, f, query, method) {
        var ajax = new XMLHttpRequest(),
            dom;
        if (f && typeof f === "string") {
            dom = jQuery(f)[0];
        }

        if (dom) {
            dom.innerHTML = element;
            dom.style.visibility = "visible";
        } else {
            if (typeof f === "function") {
                f(element);
            }
        }

        ajax.open(method, url, true);

        if (typeof query === "string") {
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }

        ajax.onload = function () {
            if (dom) {
                dom.style.visibility = "hidden";
            }
            if (ajax.status >= 200 && ajax.status <= 299) {
                successCB(ajax);
            } else {
                failCB(ajax);
            }
        };
        ajax.send(typeof query === "undefined" ? null : query);
    }
    return {
        ajaxRequest: ajaxRequest
    }
})();
vim.regs = (function () {
    var d = {};

    function g() {
        d = {}
    }

    function h(l) {
        if (!l) {
            return l
        }
        return l.replace(/\n/g, "&lt;NL&gt;")
    }

    function b(m, l) {
        if (l === "_") {
            return
        }
        d['"'] = m;
        if (m.indexOf("\n") === -1) {
            if (typeof l === "undefined") {
                d["-"] = m
            }
        } else {
            d["9"] = d["8"];
            d["8"] = d["7"];
            d["7"] = d["6"];
            d["6"] = d["5"];
            d["5"] = d["4"];
            d["4"] = d["3"];
            d["3"] = d["2"];
            d["2"] = d["1"];
            d["1"] = m
        }
        if (l >= "A" && l <= "Z") {
            d[l.toLowerCase()] = (d[l.toLowerCase()] || "") + m;
            d['"'] = d[l.toLowerCase()]
        } else {
            if (typeof l !== "undefined") {
                d[l.toLowerCase()] = m
            }
        }
    }

    function k(m, l) {
        if (l === "_") {
            return
        }
        d['"'] = m;
        l = l || "0";
        if (l >= "A" && l <= "Z") {
            d[l.toLowerCase()] = (d[l.toLowerCase()] || "") + m;
            d['"'] = d[l.toLowerCase()]
        } else {
            d[l.toLowerCase()] = m
        }
    }

    function c(l) {
        return d[l.toLowerCase()]
    }

    function a(o) {
        var l, n = '"0123456789abcdefghijklmnopqrstuvwxyz-',
            m = "--- Registers ---\n";
        for (l = 0; l < n.length; ++l) {
            if ((typeof o === "undefined" || o.indexOf(n.charAt(l)) !== -1) && typeof d[n.charAt(l)] !== "undefined" && n.charAt(l) !== " ") {
                m += '"' + n.charAt(l) + "   " + h(d[n.charAt(l)]) + "\n"
            }
        }
        return m
    }

    function i(m) {
        var l = m.toLowerCase();
        return ((l >= "a" && l <= "z") || (l >= "A" && l <= "Z") || (l >= "0" && l <= "9") || '"-:.%#=*+~_/'.indexOf(l) !== -1)
    }

    function f(m) {
        var l = m.toLowerCase();
        return ":.%#=*+~/".indexOf(l) !== -1
    }

    function e() {
        var l = {
            regs: d
        };
        return l
    }

    function j(l) {
        d = l.regs
    }
    return {
        doDelete: b,
        doYank: k,
        getRegister: c,
        showRegisters: a,
        getData: e,
        restore: j,
        reset: g,
        isValidRegisterName: i,
        isUnsupportedRegisterName: f
    }
})();
vim.model = (function () {
    var o = false,
        ay = 0,
        ax = 0,
        aD = 0,
        s, h, aB, az, al, ab, a = false,
        n, B = "abcdefghijklmnopqrstuvwxyz",
        af = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        w = B + af,
        z = B + af,
        q, N = {},
        ag = false,
        X;

    function F() {
        return o
    }

    function ad() {
        return ay
    }

    function ac() {
        return ax
    }

    function D() {
        return a
    }

    function G() {
        return ag
    }

    function ak() {
        ag = true
    }

    function v() {
        return Cursor.getX()
    }

    function t() {
        return Cursor.getY()
    }

    function S(aF) {
        ay = aF
    }

    function R(aF) {
        ax = aF
    }

    function aw(aF) {
        vim.view.recalcTopXYWithTextArea(aF)
    }

    function I(aF) {
        o = aF
    }

    function ar() {
        return ab
    }

    function K(aF) {
        ab = aF
    }

    function T(aF) {
        a = aF
    }

    function f(aF, aM) {
        var aL = vim.buffers.getCurrentBuffer(),
            aG = aL.getBoard(),
            aI = aG.getMaxX(),
            aH = aG.getMaxY(),
            aK = aL.getTextAreas(),
            aJ = aL.getEntities();
        this.x = aF;
        this.y = aM;
        this.bg = aG.getBG(aF, aM);
        this.bgHeight = aG.getHeight(aF, aM);
        this.ta = aK.get(aF, aM);
        this.sinked = this.ta && this.ta.getLimit() > 0 && this.ta.isOnSinkList(aF, aM) && this.bgHeight === 1;
        this.sa = this.ta && this.ta.getSpecialArea(aF, aM);
        this.isFallingArea = this.sa && this.sa.type === "M";
        this.entitiesList = aJ.list(aF, aM);
        this.letter = this.ta && this.ta.getLetter(aF, aM);
        this.markObj = (this.ta && this.ta.getLocalMarkForPosition(aF, aM)) || ap(aF, aM);
        if (this.bg !== aG.RAMP_EAST && this.bg !== aG.RAMP_WEST && this.bg !== aG.MISSING && this.bg !== aG.SKY_MISSING) {
            this.shadows = {};
            this.shadows.north = aM > 0 && aG.getHeight(aF, aM - 1) > this.bgHeight;
            this.shadows.south = aM + 1 < aH && aG.getHeight(aF, aM + 1) > this.bgHeight;
            this.shadows.west = aF > 0 && aG.getHeight(aF - 1, aM) > this.bgHeight;
            this.shadows.east = aF + 1 < aI && aG.getHeight(aF + 1, aM) > this.bgHeight;
            this.shadows.nw = aF > 0 && aM > 0 && aG.getHeight(aF - 1, aM - 1) > this.bgHeight;
            this.shadows.ne = aF < aI && aM > 0 && aG.getHeight(aF + 1, aM - 1) > this.bgHeight;
            this.shadows.sw = aF > 0 && aM < aH && aG.getHeight(aF - 1, aM + 1) > this.bgHeight;
            this.shadows.se = aF < aI && aM < aH && aG.getHeight(aF + 1, aM + 1) > this.bgHeight
        }
    }

    function C() {
        var aF = 200,
            aH = 200,
            aG;
        X = new Array(aF);
        while (aF--) {
            aG = aH;
            while (aG--) {
                X[aF] = new Array(aH)
            }
        }
    }

    function av(aI, aG, aK, aH) {
        var aF, aL, aJ;
        if (typeof X === "undefined") {
            C()
        }
        for (aL = aG; aL <= aH; ++aL) {
            for (aF = aI; aF <= aK; ++aF) {
                if (aL >= X.length) {
                    aJ = aL - X.length + 1;
                    while (aJ--) {
                        X.push(new Array(aF + 100))
                    }
                }
                X[aL][aF] = undefined
            }
        }
    }

    function d(aF, aH) {
        var aG;
        if (typeof X === "undefined") {
            C()
        }
        if (aH >= X.length) {
            aG = aH - X.length + 1;
            while (aG--) {
                X.push(new Array(aF + 100))
            }
        }
        X[aH][aF] = new f(aF, aH)
    }

    function aq(aG) {
        var aI = aG.getTopX() - 1,
            aF = aG.getTopY() - 1,
            aJ = aI + aG.getMaxPotentialLineLength() + 30,
            aH = aF + aG.getNumberOfLines() + 30;
        av(aI, aF, aJ, aH)
    }

    function c(aG, aI) {
        var aF, aH;
        if (typeof X === "undefined") {
            C()
        }
        if (aI >= X.length) {
            aH = aI - X.length + 1;
            while (aH--) {
                X.push(new Array(aG + 100))
            }
        }
        aF = X[aI][aG];
        if (aF === undefined) {
            aF = new f(aG, aI);
            X[aI][aG] = aF
        }
        return aF
    }

    function P(aF, aI) {
        var aG = vim.board,
            aH = vim.buffers.getCurrentBuffer().getEntities();
        return ((aG.getHeight(aF, aI) === 1 && aH.noBlockingEntity(aF, aI)) || aG.getBG(aF, aI) === aG.MISSING || aG.getBG(aF, aI) === aG.SKY_MISSING)
    }

    function Z(aF, aK, aJ) {
        var aI = aJ ? vim.buffers.getBuffer(aJ) : vim.buffers.getCurrentBuffer(),
            aG = aI.getBoard(),
            aH = aI.getEntities();
        return (aG.isCodeBG(aF, aK) && aG.getHeight(aF, aK) === 1 && aH.noBlockingEntity(aF, aK) && aG.getBG(aF, aK) !== aG.DARK)
    }

    function Y(aG, aL, aJ) {
        var aI = aJ ? vim.buffers.getBuffer(aJ) : vim.buffers.getCurrentBuffer(),
            aK = aI.getTextAreas(),
            aH = aK.get(aG, aL),
            aF;
        if (typeof aH === "undefined") {
            return false
        }
        aF = aH.getSpecialArea(aG, aL);
        if (typeof aF === "undefined") {
            return false
        }
        return aF.type === "+"
    }

    function at(aF, aK, aJ) {
        var aH, aI = vim.board,
            aG = vim.buffers.getCurrentBuffer().getTextAreas().get(aF, aK);
        for (aH = aG && !aJ ? aG.getTopX() + aG.getLineLength(aK - aG.getTopY()) : aF; aH < aI.getMaxXOnLine(aK) + 1; ++aH) {
            if (!aI.isCodeBG(aH, aK)) {
                break
            }
        }
        return aH
    }

    function ao(aF, aJ) {
        var aH, aI = vim.board,
            aG = vim.buffers.getCurrentBuffer().getTextAreas().get(aF, aJ);
        for (aH = aG ? aG.getTopX() : aF; aH >= 0; --aH) {
            if (!aI.isCodeBG(aH, aJ)) {
                break
            }
        }
        return aH
    }

    function ae(aI) {
        var aK, aF, aH = aI.getTopX(),
            aL = vim.board,
            aJ = aI.getTopX(),
            aG = aI.getTopY();
        for (aF = 0; aF < aI.getNumberOfLines(); ++aF) {
            for (aK = aJ + aI.getLineLength(aF); aK < aL.getMaxXOnLine(aG + aF) + 1; ++aK) {
                if (!aL.isCodeBG(aK, aG + aF)) {
                    break
                }
            }
            if (aK > aH) {
                aH = aK
            }
        }
        return aH
    }

    function L(aH) {
        var aJ, aF, aL = aH.getTopX() - 1,
            aK = vim.board,
            aI = aH.getTopX(),
            aG = aH.getTopY();
        for (aF = 0; aF < aH.getNumberOfLines(); ++aF) {
            for (aJ = aI; aJ >= 0; --aJ) {
                if (!aK.isCodeBG(aJ, aG + aF)) {
                    break
                }
            }
            if (aJ < aL) {
                aL = aJ
            }
        }
        return aL
    }

    function e(aF, aJ) {
        var aH, aI = vim.board,
            aG = vim.buffers.getCurrentBuffer().getTextAreas().get(aF, aJ);
        for (aH = aG ? aG.getTopY() + aG.getNumberOfLines() : aJ; aH < aI.getMaxY(); ++aH) {
            if (!aI.isCodeBG(aF, aH)) {
                break
            }
        }
        return aH
    }

    function an(aF) {
        return aF >= "a" && aF <= "z"
    }

    function ah(aF) {
        return aF >= "A" && aF <= "Z"
    }

    function J(aF) {
        return z.indexOf(aF) !== -1
    }

    function ai(aJ, aP, aN, aT, aG, aI, aH) {
        var aM = aT ? vim.buffers.getBuffer(aT) : vim.buffers.getCurrentBuffer(),
            aK = aG || aM.getTextAreas().get(aP, aN),
            aS = aN - (aK ? aK.getTopY() : 0),
            aF = aP - (aK ? aK.getTopX() : 0),
            aL = N[aJ],
            aR, aQ, aO;
        if (!ah(aJ) || !aK) {
            return
        }
        if (!aL) {
            N[aJ] = {};
            aL = N[aJ]
        } else {
            aR = aL.x;
            aQ = aL.y;
            aO = aL.bufferName
        }
        aL.mark = aJ;
        aL.col = aF;
        aL.row = aS;
        aL.yOffset = typeof aI !== "undefined" ? aI : 10;
        aL.bufferName = aM.getName();
        aL.x = aP;
        aL.y = aN;
        aL.fixed = typeof aH === "undefined" ? false : aH;
        if (typeof aR !== "undefined" && typeof aQ !== "undefined" && aO === aL.bufferName) {
            d(aR, aQ)
        }
        d(aP, aN)
    }

    function M(aG) {
        var aF = N[aG];
        if (aF) {
            delete N[aG];
            if (vim.buffers.getCurrentBuffer().getName() === aF.bufferName) {
                d(aF.x, aF.y)
            }
        }
    }

    function l(aF, aJ) {
        var aG = vim.buffers.getCurrentBuffer().getName(),
            aI, aH;
        for (aH = 0; aH < af.length; ++aH) {
            aI = N[af.charAt(aH)];
            if (aI && aI.x === aF && aI.y === aJ && aI.bufferName === aG) {
                delete N[af.charAt(aH)];
                d(aI.x, aI.y)
            }
        }
    }

    function j(aF, aL, aK) {
        var aG = vim.buffers.getCurrentBuffer().getName(),
            aJ, aH, aI;
        for (aH = 0; aH < af.length; ++aH) {
            aJ = N[af.charAt(aH)];
            if (aJ && aJ.x === aF && aJ.y === aL && aJ.bufferName === aG) {
                aI = aJ.y;
                aJ.y = aK;
                aJ.row = aJ.row + (aK - aL);
                d(aJ.x, aI);
                d(aJ.x, aJ.y)
            }
        }
    }

    function au(aK, aJ, aF, aN) {
        var aI = vim.buffers.getCurrentBuffer().getName(),
            aH, aG, aM, aL;
        for (aG = 0; aG < af.length; ++aG) {
            aH = N[af.charAt(aG)];
            if (aH && aH.x === aK && aH.y === aJ && aH.bufferName === aI) {
                aM = aH.x;
                aL = aH.y;
                aH.y = aN;
                aH.row = aH.row + (aN - aJ);
                aH.x = aF;
                aH.col = aH.col + (aF - aK);
                d(aM, aL);
                d(aH.x, aH.y)
            }
        }
    }

    function ap(aF, aK, aJ) {
        var aG = aJ || vim.buffers.getCurrentBuffer().getName(),
            aI, aH;
        for (aH = 0; aH < af.length; ++aH) {
            aI = N[af.charAt(aH)];
            if (aI && aI.x === aF && aI.y === aK && aI.bufferName === aG) {
                return N[af.charAt(aH)]
            }
        }
        return undefined
    }

    function aj(aF) {
        return N[aF]
    }

    function k(aH, aI) {
        var aG = "",
            aF;
        for (aF = 0; aF < aH - aI.length; ++aF) {
            aG += " "
        }
        aG += aI;
        return aG
    }

    function W(aK) {
        var aO = aK || z,
            aQ = vim.buffers.getCurrentBuffer().getName(),
            aR = "mark   line   col   file / text\n",
            aJ = vim.buffers.getCurrentBuffer().getTextAreas().get(Cursor.getX(), Cursor.getY()),
            aG = {
                marks: aK,
                content: "",
                str: ""
            },
            aH, aI, aL, aF, aN, aP, aM;
        for (aI = 0; aI < z.length; ++aI) {
            aH = z.charAt(aI);
            if (aO.indexOf(aH) === -1) {
                continue
            }
            if (an(aH) && aJ) {
                aL = aJ.getLocalMark(aH);
                if (aL) {
                    aM = aJ.getLine(aL.row);
                    aR += " " + aL.mark + k(9, "" + (aL.row + 1)) + k(6, "" + aL.col) + "   " + aM + "\n";
                    aG.content += aM + " "
                }
            } else {
                if (ah(aH)) {
                    aL = aj(aH);
                    if (aL) {
                        aF = aL.bufferName;
                        aN = vim.buffers.getBuffer(aF);
                        aP = aN.getTextAreas().get(aL.x, aL.y);
                        if (aP) {
                            aM = aF === aQ ? aP.getLine(aL.row) : aF
                        } else {
                            aM = "-invalid-"
                        }
                        aR += " " + aL.mark + k(9, "" + (aL.row + 1)) + k(6, "" + aL.col) + "   " + aM + "\n";
                        aG.content += aM + " "
                    }
                }
            }
        }
        aG.str = aR;
        return aG
    }

    function m(aO) {
        var aT = aO === "!" ? B : aO,
            aM = vim.buffers.getCurrentBuffer().getTextAreas().get(Cursor.getX(), Cursor.getY()),
            aR = "The following marks were left here on purpose so they weren't deleted: ",
            aN = "The following marks can only be deleted from their respective texts: ",
            aF = "The following texts were completed due to mark deletion:\n",
            aV = true,
            aL, aI, aQ, aH = "",
            aK = "",
            aU = "",
            aG, aJ, aS;
        for (aL = 0; aL < aT.length; ++aL) {
            aI = aT.charAt(aL);
            if (an(aI) && aM) {
                aQ = aM.getLocalMark(aI);
                if (aQ) {
                    if (aQ.fixed) {
                        aH += aI
                    } else {
                        aM.deleteLocalMark(aI);
                        if (aM.hasMarkSpecialAreas()) {
                            aM.toBeChecked = true
                        }
                    }
                }
            } else {
                if (ah(aI)) {
                    aQ = aj(aI);
                    if (aQ) {
                        aS = vim.buffers.getBuffer(aQ.bufferName).getTextAreas().get(aQ.x, aQ.y);
                        if (aQ.fixed) {
                            aH += aI
                        } else {
                            if ((aS.getLimit() > 0 || aS.isAlwaysSink()) && aS != aM) {
                                aU += aI
                            } else {
                                M(aI);
                                aS = vim.buffers.getBuffer(aQ.bufferName).getTextAreas().get(aQ.x, aQ.y);
                                if (aS.hasMarkSpecialAreas()) {
                                    aS.toBeChecked = true
                                }
                            }
                        }
                    }
                }
            }
        }
        for (aL = 1; aL < 10; ++aL) {
            aG = vim.buffers.getBuffer(aL);
            if (typeof aG === "string") {
                break
            }
            for (var aP in aG.listTextAreas()) {
                aS = aG.listTextAreas()[aP];
                if (aS.toBeChecked === true) {
                    aJ = Game.testTextCompletion(aS, aG.getName());
                    if (aJ) {
                        aK += "\n" + aG.getName() + " - " + aS.getLine(0).substr(0, 40) + "..."
                    }
                    aS.toBeChecked = false;
                    if (aJ && aS !== aM && aV) {
                        vim.audio.play("text_restored");
                        aV = false
                    }
                }
            }
        }
        if (aH !== "") {
            aH = aR + aH + "\n"
        }
        if (aU !== "") {
            aU = aN + aU + "\n"
        }
        if (aK !== "") {
            aK = "\n" + aF + aK
        }
        return (aH + aU + aK).trim()
    }

    function r() {
        var aF = {},
            aG;
        for (aG in N) {
            aF[aG] = {
                mark: N[aG].mark,
                col: N[aG].col,
                row: N[aG].row,
                yOffset: 0,
                x: N[aG].x,
                y: N[aG].y,
                bufferName: N[aG].bufferName,
                fixed: N[aG].fixed
            }
        }
        return aF
    }

    function E(aF) {
        var aG;
        N = {};
        for (aG in aF) {
            N[aG] = {
                mark: aF[aG].mark,
                col: aF[aG].col,
                row: aF[aG].row,
                yOffset: 0,
                x: aF[aG].x,
                y: aF[aG].y,
                bufferName: aF[aG].bufferName,
                fixed: aF[aG].fixed
            }
        }
    }

    function g() {
        return al
    }

    function aA(aF) {
        if (typeof aF !== "undefined") {
            al = aF
        }
    }

    function i() {
        return n
    }

    function aa(aF) {
        if (typeof aF !== "undefined") {
            n = aF
        }
    }

    function O() {
        return aD > 0
    }

    function U(aM, aG, aF, aL) {
        var aJ = aM.getTopX(),
            aH = aM.getTopY(),
            aK = aJ + aM.getMaxPotentialLineLength(),
            aI = aH + aM.getRawNumberOfLines();
        if ((aM.isComplete() && !aM.isAlwaysSink()) || aM.getLimit() === 0) {
            return
        }
        s = aM;
        aB = aG;
        az = aF;
        q = aL;
        if (aM.getLimit() > 0) {
            aD = aM.getLimit() - 1
        }
        h = {};
        h.addX = L(aM) + 1;
        h.addY = aH;
        h.width = Math.max(ae(aM), aK) - h.addX;
        h.height = Math.max(e(aJ, aH), aI) - h.addY;
        h.bgSection = vim.board.saveSection(h.addX, h.addY, h.addX + h.width, h.addY + h.height);
        h.text = s.getData();
        h.localMarks = s.backupLocalMarks();
        h.globalMarks = r();
        h.entitiesInRange = vim.buffers.getCurrentBuffer().getEntities().getDataInRange(h.addX, h.addY, h.addX + h.width, h.addY + h.height);
        vim.view.notifyDoubleEscMsg()
    }

    function b() {
        if (typeof s === "undefined") {
            return
        }
        s.clearSinkList();
        aD = 0;
        s = undefined
    }

    function aE(aF, aM, aL) {
        var aO, aN, aI, aH, aJ = vim.buffers.getCurrentBuffer().getTextAreas(),
            aK = vim.board,
            aG;
        if (typeof s === "undefined") {
            return true
        }
        vim.input.returnToCommandMode(true);
        vim.view.notifyCommandMode();
        aO = h.addX;
        aN = h.addY;
        aI = aO + h.width;
        aH = aN + h.height;
        aD = 0;
        aK.clear(aO, aN, aI, aH);
        aK.add(h.bgSection);
        aJ.exterminate(s.getTopX(), s.getTopY());
        aG = TextArea.prototype.restore(h.text);
        aG.restoreLocalMarks(h.localMarks);
        aJ.add(aG);
        aJ.highlight(g());
        E(h.globalMarks);
        vim.buffers.getCurrentBuffer().getEntities().restoreInRange(aO, aN, aI, aH, h.entitiesInRange);
        av(aO, aN, aI, aH);
        s = undefined;
        if (q === vim.buffers.getCurrentBuffer().getName()) {
            if (aF) {
                Game.cursorSetAndReadjust(aB, az)
            } else {
                while (aK.isCodeBG(Cursor.getX(), Cursor.getY())) {
                    Cursor.set(Cursor.getX() + aM, Cursor.getY() + aL)
                }
            }
        } else {
            Cursor.restorePositionCallback(aB, az, q)()
        }
        return false
    }

    function A() {
        return aD - 1 + " key presses to go"
    }

    function V() {
        if (aD > 0) {
            aD--;
            if (aD === 0) {
                return aE(true)
            }
        }
        return true
    }

    function Q(aF, aI) {
        var aG = vim.board,
            aH = h;
        if (typeof s === "undefined") {
            return aG.PATH
        }
        if (aF < aH.addX || aI < aH.addY || aF > aH.addX + aH.width || aI > aH.addY + aH.height) {
            return aG.getBG(aF, aI)
        }
        return Board.prototype.getBGFromSection(aF, aI, aH.bgSection)
    }

    function aC() {
        var aF = {
            candleLightMode: o,
            topX: ay,
            topY: ax,
            keypressCountDown: aD,
            level: ab,
            showNumbers: a,
            marks: N
        };
        return aF
    }

    function u(aF) {
        if (typeof aF.candleLightMode === "undefined") {
            o = aF.overallShadowRadius > 0
        } else {
            o = aF.candleLightMode
        }
        ay = aF.topX;
        ax = aF.topY;
        ab = aF.level || 0;
        a = aF.showNumbers || false;
        N = aF.marks || {};
        al = undefined;
        n = undefined;
        C()
    }

    function am(aF) {
        return (aF && ar() === 14 && aF.getTopX() === 509 && aF.getTopY() === 460)
    }

    function p(aF) {
        var aH = vim.buffers.getCurrentBuffer(),
            aG = vim.buffers.getCurrentBuffer().getBoard();
        return (aF && aH.getName() === "underground" && ar() === 14 && aF.isBossMode() && aG.getBG(aF.getTopX(), aF.getTopY()) !== aG.PLAIN)
    }

    function H(aF) {
        var aH = vim.buffers.getCurrentBuffer(),
            aG = vim.buffers.getCurrentBuffer().getBoard();
        return (aF && aH.getName() === "underground" && ar() === 14 && aF.isBossMode() && aG.getBG(aF.getTopX(), aF.getTopY()) === aG.PLAIN)
    }
    return {
        isCandleLightMode: F,
        getTopX: ad,
        getTopY: ac,
        getCursorX: v,
        getCursorY: t,
        isValidCursorPosition: P,
        isValidBugPosition: Z,
        setTopX: S,
        setTopY: R,
        readjustViewToCursorPosition: aw,
        setCandleLightMode: I,
        cancelCursorPositionAnimations: function () {
            vim.view.cancelCursorPositionAnimations()
        },
        isKeypressCountdownActive: O,
        addKeyPressToCountDown: V,
        getKeypressCountdownString: A,
        initKeypressCountdown: U,
        keypressCountdownFinished: aE,
        clearKeypressCountdown: b,
        getKeyPressCountDownBG: Q,
        getEndOfCodeBlocks: at,
        getStartOfCodeBlocks: ao,
        getMaxEndOfCodeBlocks: ae,
        getMinStartOfCodeBlocks: L,
        getBottomEndOfCodeBlocks: e,
        getMarksSummaryObject: W,
        isLocalMark: an,
        isGlobalMark: ah,
        isSupportedMark: J,
        addGlobalMark: ai,
        deleteGlobalMark: M,
        getGlobalMarkForPosition: ap,
        getGlobalMark: aj,
        deleteMarks: m,
        backupGlobalMarks: r,
        restoreGlobalMarks: E,
        updateGlobalMarkY: j,
        updateGlobalMark: au,
        deleteGlobalMarkAtPosition: l,
        getDisplayableMarks: function () {
            return w
        },
        getGlobalSearchStr: g,
        setGlobalSearchStr: aA,
        getGlobalSearchOffset: i,
        setGlobalSearchOffset: aa,
        setLevel: K,
        getLevel: ar,
        isShowNumbers: D,
        setShowNumbers: T,
        isUndoRedoSkyText: am,
        isPreBossUndergroundText: p,
        isBossUndergroundText: H,
        isEndgame: G,
        setEndgame: ak,
        getCell: c,
        recacheCell: d,
        clearTextAreaCellCache: aq,
        clearCellCache: C,
        getData: aC,
        restore: u
    }
})();
var Buffer = function (b, a) {
    this.name = b;
    this.cursorX = undefined;
    this.cursorY = undefined;
    this.topX = undefined;
    this.topY = undefined;
    this.board = new Board();
    this.entities = new Entities();
    this.textareas = new TextAreas();
    if (typeof a !== "undefined") {
        this.load(a)
    }
};
Buffer.prototype.getName = function () {
    return this.name
};
Buffer.prototype.getBoard = function () {
    return this.board
};
Buffer.prototype.getEntities = function () {
    return this.entities
};
Buffer.prototype.getTextAreas = function () {
    return this.textareas
};
Buffer.prototype.listTextAreas = function () {
    return this.textareas.texts
};
Buffer.prototype.getData = function () {
    var a = {};
    a.name = this.name;
    a.cursorX = this.cursorX;
    a.cursorY = this.cursorY;
    a.topX = this.topX;
    a.topY = this.topY;
    a.board = this.board.getData();
    a.entities = this.entities.getData();
    a.textareas = this.textareas.getData();
    return a
};
Buffer.prototype.restore = function (a) {
    this.name = a.name;
    this.cursorX = a.cursorX;
    this.cursorY = a.cursorY;
    this.topX = a.topX;
    this.topY = a.topY;
    this.board.restore(a.board);
    this.entities.restore(a.entities);
    this.textareas.restore(a.textareas, this.name)
};
Buffer.prototype.load = function (c) {
    var a = JSON.parse(c),
        f, j, h, e, d, g, b = false;
    if (typeof a.levelNumber !== "undefined") {
        vim.model.setLevel(a.levelNumber);
        b = true
    }
    this.board.add(a);
    if (typeof a.cursorX === "number" && typeof a.cursorY === "number") {
        this.cursorX = a.cursorX + a.addX;
        this.cursorY = a.cursorY + a.addY
    }
    if (typeof a.topX === "number") {
        this.topX = a.topX + a.addX
    }
    if (typeof a.topY === "number") {
        this.topY = a.topY + a.addY
    }
    for (f = 0; f < a.textareas.length; f += 1) {
        g = a.textareas[f];
        this.textareas.add(new TextArea(g.x + a.addX, g.y + a.addY, g.text.split("\n"), g.zoomOut, g.limit, g.alwaysSink, g.shouldClean, g.sacred, g.marks, this.getName(), g.bossMode, g.undos, g.redos))
    }
    for (f = 0; f < a.entities.length; f += 1) {
        j = a.entities[f].x + a.addX;
        h = a.entities[f].y + a.addY;
        e = a.entities[f].data || {};
        e.type = a.entities[f].type;
        e.invisible = a.entities[f].invisible === true;
        if (typeof a.entities[f].character !== "undefined") {
            e.character = a.entities[f].character
        }
        d = this.entities.createEntity(j, h, e, a.addX, a.addY);
        if (d) {
            this.entities.add(d);
            if (d instanceof Princess && d.isValid()) {
                vim.model.setLevel(d.levelToLoad - 1);
                b = true
            }
        }
    }
    if (!b && vim.model.getLevel() > 1) {
        vim.model.setLevel(vim.model.getLevel() + 1)
    }
};
Buffer.prototype.switchTo = function () {
    var a = vim.model;
    Cursor.set(this.cursorX, this.cursorY);
    if (typeof this.topX === "number") {
        a.setTopX(this.topX)
    }
    if (typeof this.topY === "number") {
        a.setTopY(this.topY)
    }
    a.readjustViewToCursorPosition();
    vim.board = this.getBoard();
    a.clearCellCache()
};
Buffer.prototype.canMoveTo = function (h, f, j, g) {
    var e, b, d, a, c = this.board;
    b = true;
    if (j > c.getMaxX() || j < 0 || g < 0 || g > this.board.getMaxY()) {
        return false
    }
    e = c.getBG(j, g);
    b = b && c.getHeight(j, g) !== 0 && e !== c.TALL_WALL && e !== c.HOUSE_WALL;
    d = this.entities.list(j, g);
    for (a = 0; a < d.length; a += 1) {
        if (d[a].isBlocking()) {
            b = false
        }
    }
    if (e === c.RAMP_EAST && f === g) {
        b = b && h !== j - 1
    }
    if (e === c.RAMP_WEST && f === g) {
        b = b && h !== j + 1
    }
    return b
};
vim.buffers = (function () {
    var o, k, a, j;

    function m() {
        o = [new Buffer("ground", undefined)];
        o[0].getBoard().setFillerBG(Board.prototype.WATER);
        k = 0;
        a = 0
    }

    function g() {
        var p, q = "";
        for (p = 0; p < o.length; ++p) {
            q += (p + 1 < 10 ? " " : "") + (p + 1) + "   " + (p === k ? "%" : p === a ? "#" : " ") + "   " + o[p].getName();
            q += p === o.length - 1 ? "" : "\n"
        }
        return q
    }

    function e() {
        return o || []
    }

    function n(r, p) {
        var q = d(r);
        if (typeof q === "undefined") {
            o.push(new Buffer(r, undefined));
            q = o.length - 1;
            if (r === "sky") {
                o[q].getBoard().setFillerBG(Board.prototype.SKY_MISSING)
            }
            if (r === "underground") {
                o[q].getBoard().setFillerBG(Board.prototype.LAVA)
            }
            if (r === "lorem") {
                o[q].getBoard().setFillerBG(Board.prototype.WATER)
            }
        }
        if (typeof p !== "undefined") {
            j = q;
            o[q].load(p)
        }
    }

    function d(p) {
        var q;
        if (p === "%") {
            return k
        }
        if (p === "#") {
            return a
        }
        if (!isNaN(parseInt(p, 10))) {
            if (typeof o[p - 1] !== "undefined") {
                return p - 1
            }
        } else {
            if (typeof (p === "string")) {
                for (q = 0; q < o.length; ++q) {
                    if (p === o[q].getName()) {
                        return q
                    }
                }
            }
        }
        return undefined
    }

    function l(q) {
        var p = d(q);
        if (typeof p === "undefined") {
            return !isNaN(parseInt(q, 10)) ? "Buffer " + q + " does not exist." : "No matching buffer for " + q
        }
        return o[p]
    }

    function i(v, p) {
        var w = d(v),
            z, r, u = vim.model,
            s, t, q, A;
        if (typeof w === "undefined") {
            return typeof v === "number" ? "Buffer " + v + " does not exist." : "No matching buffer for " + v
        }
        if (Cursor.getX() !== 0) {
            z = o[k].getBoard();
            r = z.getBG(Cursor.getX(), Cursor.getY());
            if (r !== z.MISSING && r !== z.SKY_MISSING && r !== z.DARK && p !== true) {
                o[k].cursorX = Cursor.getX();
                o[k].cursorY = Cursor.getY();
                o[k].topX = vim.model.getTopX();
                o[k].topY = vim.model.getTopY()
            }
        }
        a = k;
        k = w;
        o[k].switchTo();
        if (o[k].getName() === "lorem") {
            vim.images.toGrayScale()
        } else {
            vim.images.toNormalColor()
        }
        if (vim.model.getLevel() > 13 && (o[k].getName() === "sky" || o[k].getName() === "ground")) {
            vim.images.toDark()
        }
        s = o[k].getTextAreas().get(Cursor.getX(), Cursor.getY());
        if (u.isBossUndergroundText(s)) {
            t = o[k].getEntities().listOnText(s);
            A = -1;
            for (q = 0; q < t.length; ++q) {
                if (t[q] instanceof BigBug) {
                    A = q;
                    break
                }
            }
            if (A !== -1) {
                t[A].freeze();
                window.setTimeout(function () {
                    t[A].unfreeze()
                }, 1000)
            }
        }
        vim.view.notifyFadeInAnimation();
        Cursor.blink()
    }

    function c() {
        return o[k]
    }

    function f() {
        return o[j]
    }

    function b() {
        var p, q = {};
        o[k].cursorX = Cursor.getX();
        o[k].cursorY = Cursor.getY();
        o[k].topX = vim.model.getTopX();
        o[k].topY = vim.model.getTopY();
        q.buffers = [];
        q.curBufferIndex = k;
        q.alternateIndex = a;
        for (p = 0; p < o.length; ++p) {
            q.buffers.push(o[p].getData())
        }
        return q
    }

    function h(r) {
        var q, p;
        o = [];
        k = r.curBufferIndex;
        a = r.alternateIndex;
        for (q = 0; q < r.buffers.length; ++q) {
            p = new Buffer("changeme" + q);
            o.push(p)
        }
        for (q = 0; q < r.buffers.length; ++q) {
            o[q].restore(r.buffers[q])
        }
        p = o[k];
        Cursor.set(p.cursorX, p.cursorY);
        vim.model.setTopX(p.topX);
        vim.model.setTopY(p.topY);
        vim.board = p.getBoard()
    }
    return {
        init: m,
        list: g,
        collection: e,
        add: n,
        switchTo: i,
        getData: b,
        restore: h,
        getCurrentBuffer: c,
        getWorkBuffer: f,
        getBuffer: l
    }
})();

function Board() {
    this.bg = [];
    this.maxX = 0;
    this.maxY = 0;
    this.fillerBG = undefined
}
Board.prototype.WATER = "w";
Board.prototype.WALL = "s";
Board.prototype.TALL_WALL = "S";
Board.prototype.HOUSE_WALL = "_";
Board.prototype.WOOD = "W";
Board.prototype.PATH = ".";
Board.prototype.GRASS = "g";
Board.prototype.RAMP_EAST = "<";
Board.prototype.RAMP_WEST = ">";
Board.prototype.PLAIN = "+";
Board.prototype.MISSING = "M";
Board.prototype.SKY_MISSING = "m";
Board.prototype.CRACKED = "x";
Board.prototype.DARK = "*";
Board.prototype.CLOUD = "c";
Board.prototype.WHITE = "#";
Board.prototype.SAND = "~";
Board.prototype.LAVA = "l";
Board.prototype.setFillerBG = function (a) {
    this.fillerBG = a
};
Board.prototype.getFillerBG = function () {
    return this.fillerBG
};
Board.prototype.getData = function () {
    var a = {};
    a.bg = this.bg;
    a.fillerBG = this.fillerBG;
    return a
};
Board.prototype.restore = function (c) {
    var a, b;
    if (typeof c.bg === "undefined") {
        b = c;
        this.fillerBG = Board.prototype.WATER
    } else {
        b = c.bg;
        this.fillerBG = c.fillerBG
    }
    this.bg = [];
    this.maxY = b.length;
    this.maxX = 0;
    for (a = 0; a < b.length; a += 1) {
        if (b[a]) {
            this.bg[a] = b[a];
            this.maxX = Math.max(this.maxX, b[a].length)
        }
    }
};
Board.prototype.add = function (e) {
    var b, a, c, d;
    for (b = 0; b < e.bg.length; b += 1) {
        if (typeof this.bg[b + e.addY] === "undefined") {
            this.bg[b + e.addY] = ""
        }
        e.bg[b] = e.bg[b].replace(/\s+$/, "");
        if (e.addX >= this.bg[b + e.addY].length) {
            c = e.addX - this.bg[b + e.addY].length;
            for (a = 0; a < c; a += 1) {
                this.bg[b + e.addY] += this.fillerBG
            }
        }
        d = this.bg[b + e.addY].substr(0, e.addX);
        d += e.bg[b];
        d += this.bg[b + e.addY].length > d.length ? this.bg[b + e.addY].substr(d.length) : "";
        this.bg[b + e.addY] = d;
        this.maxX = Math.max(this.maxX, this.bg[b + e.addY].length)
    }
    this.maxY = this.bg.length
};
Board.prototype.clear = function (b, a, f, e) {
    var d, c = "",
        g;
    g = {
        addX: b,
        addY: a
    };
    g.bg = [];
    for (d = b; d <= f; ++d) {
        c += this.fillerBG
    }
    for (d = a; d <= e; ++d) {
        g.bg[d - a] = c
    }
    this.add(g)
};
Board.prototype.saveSection = function (b, a, e, d) {
    var c, f = {
        addX: b,
        addY: a,
        bg: []
    };
    for (c = a; c <= d; ++c) {
        f.bg[c - a] = this.bg[c].substring(b, e + 1);
        if (f.bg[c - a].length < e + 1 - b) {
            f.bg[c - a] = f.bg[c - a] + new Array(e + 1 - b + 1 - f.bg[c - a].length).join(" ")
        }
    }
    return f
};
Board.prototype.getBGFromSection = function (a, c, b) {
    return b.bg[c - b.addY].charAt(a - b.addX)
};
Board.prototype.getMaxX = function () {
    return this.maxX
};
Board.prototype.getMaxY = function () {
    return this.maxY
};
Board.prototype.getMaxXOnLine = function (a) {
    return this.bg[a].length - 1
};
Board.prototype.isValid = function (a, b) {
    return typeof this.bg[b] !== "undefined" && a < this.bg[b].length
};
Board.prototype.getBG = function (a, d) {
    var b = this.isValid(a, d),
        c = b ? this.bg[d].charAt(a) : this.fillerBG;
    return c !== " " ? c : this.fillerBG
};
Board.prototype.setBG = function (a, d, b) {
    var c;
    if (typeof this.bg[d] === "undefined") {
        this.bg[d] = ""
    }
    c = this.bg[d];
    if (a <= c.length) {
        this.bg[d] = c.substring(0, a) + b + c.substring(a + 1)
    } else {
        this.bg[d] = c + new Array(a - c.length + 1).join(" ") + b
    }
    vim.model.recacheCell(a, d)
};
Board.prototype.isCodeBG = function (a, c) {
    var b = this.getBG(a, c);
    return (b !== this.WATER && b !== this.WHITE && b !== this.LAVA && b !== this.CLOUD && b !== this.PATH && b !== this.GRASS && b !== this.WALL && b !== this.WOOD && b !== this.SKY_MISSING && b !== this.SAND)
};
Board.prototype.getHeight = function (b, d) {
    var a, c;
    if (b < 0 || b >= this.maxX || d < 0 || d >= this.maxY) {
        c = this.fillerBG
    }
    if (!this.isValid(b, d)) {
        c = this.fillerBG
    }
    if (typeof c === "undefined") {
        c = this.getBG(b, d)
    }
    if (c === " ") {
        c = this.fillerBG
    }
    switch (c) {
        case this.MISSING:
        case this.SKY_MISSING:
            a = -1;
            break;
        case this.WATER:
        case this.LAVA:
            a = 0;
            break;
        case this.HOUSE_WALL:
            a = 3;
            break;
        case this.TALL_WALL:
        case this.RAMP_EAST:
        case this.RAMP_WEST:
            a = 2;
            break;
        default:
            a = 1;
            break
    }
    return a
};
vim.motionsFSM = {
    word: {
        states: {
            start: {
                " ": "space",
                a: "alphanum",
                ";": "punc",
                n: "newline"
            },
            space: {
                " ": "space",
                a: "retoffset",
                ";": "retoffset",
                n: "newline"
            },
            alphanum: {
                " ": "space",
                a: "alphanum",
                ";": "retoffset",
                n: "newline"
            },
            punc: {
                " ": "space",
                a: "retoffset",
                ";": "punc",
                n: "newline"
            },
            newline: {
                " ": "possible_empty_line",
                a: "retoffset",
                ";": "retoffset",
                n: "retoffset"
            },
            possible_empty_line: {
                " ": "space",
                a: "retoffset",
                ";": "retoffset",
                n: "retoffsetbefore"
            }
        },
        forward: true,
        outOfBoundsReturn: "word_out_of_bounds",
        inputFunc: function (a) {
            if (a === " ") {
                return " "
            }
            if (a === "\n") {
                return "n"
            }
            if ((a >= "a" && a <= "z") || (a >= "A" && a <= "Z") || (a >= "0" && a <= "9") || a === "_") {
                return "a"
            }
            return ";"
        }
    },
    WORD: {
        states: {
            start: {
                " ": "space",
                ".": "nonspace",
                n: "newline"
            },
            space: {
                " ": "space",
                ".": "retoffset",
                n: "newline"
            },
            nonspace: {
                " ": "space",
                ".": "nonspace",
                n: "newline"
            },
            newline: {
                " ": "possible_empty_line",
                ".": "retoffset",
                n: "retoffset"
            },
            possible_empty_line: {
                " ": "space",
                ".": "retoffset",
                n: "retoffsetbefore"
            }
        },
        forward: true,
        outOfBoundsReturn: "word_out_of_bounds",
        inputFunc: function (a) {
            if (a === " ") {
                return " "
            }
            if (a === "\n") {
                return "n"
            }
            return "."
        }
    },
    endword: {
        states: {
            start: {
                " ": "space",
                a: "end_alphanum",
                ";": "end_punc",
                n: "newline"
            },
            space: {
                " ": "space",
                a: "alphanum",
                ";": "punc",
                n: "newline"
            },
            end_alphanum: {
                " ": "space",
                a: "alphanum",
                ";": "punc",
                n: "newline"
            },
            end_punc: {
                " ": "space",
                a: "alphanum",
                ";": "punc",
                n: "newline"
            },
            alphanum: {
                " ": "retoffsetbefore",
                a: "alphanum",
                ";": "retoffsetbefore",
                n: "retoffsetbefore"
            },
            punc: {
                " ": "retoffsetbefore",
                a: "retoffsetbefore",
                ";": "punc",
                n: "retoffsetbefore"
            },
            newline: {
                " ": "space",
                a: "alphanum",
                ";": "punc",
                n: "newline"
            }
        },
        forward: true,
        outOfBoundsReturn: "end",
        inputFunc: function (a) {
            if (a === " ") {
                return " "
            }
            if (a === "\n") {
                return "n"
            }
            if ((a >= "a" && a <= "z") || (a >= "A" && a <= "Z") || (a >= "0" && a <= "9") || a === "_") {
                return "a"
            }
            return ";"
        }
    },
    endWORD: {
        states: {
            start: {
                " ": "space",
                ".": "end_word",
                n: "newline"
            },
            space: {
                " ": "space",
                ".": "word",
                n: "newline"
            },
            end_word: {
                " ": "space",
                ".": "word",
                n: "newline"
            },
            word: {
                " ": "retoffsetbefore",
                ".": "word",
                n: "retoffsetbefore"
            },
            newline: {
                " ": "space",
                ".": "word",
                n: "newline"
            }
        },
        forward: true,
        outOfBoundsReturn: "end",
        inputFunc: function (a) {
            if (a === " ") {
                return " "
            }
            if (a === "\n") {
                return "n"
            }
            return "."
        }
    },
    prevword: {
        states: {
            start: {
                " ": "space",
                a: "begin_alphanum",
                ";": "begin_punc",
                n: "begin_newline"
            },
            space: {
                " ": "space",
                a: "alphanum",
                ";": "punc",
                n: "newline"
            },
            begin_alphanum: {
                " ": "space",
                a: "alphanum",
                ";": "punc",
                n: "newline"
            },
            begin_punc: {
                " ": "space",
                a: "alphanum",
                ";": "punc",
                n: "newline"
            },
            alphanum: {
                " ": "retoffsetbefore",
                a: "alphanum",
                ";": "retoffsetbefore",
                n: "retoffsetbefore"
            },
            punc: {
                " ": "retoffsetbefore",
                a: "retoffsetbefore",
                ";": "punc",
                n: "retoffsetbefore"
            },
            begin_newline: {
                " ": "space",
                a: "alphanum",
                ";": "punc",
                n: "newline"
            },
            newline: {
                " ": "space",
                a: "alphanum",
                ";": "punc",
                n: "retoffsetbefore"
            }
        },
        forward: false,
        outOfBoundsReturn: "zero",
        inputFunc: function (a) {
            if (a === " ") {
                return " "
            }
            if (a === "\n") {
                return "n"
            }
            if ((a >= "a" && a <= "z") || (a >= "A" && a <= "Z") || (a >= "0" && a <= "9") || a === "_") {
                return "a"
            }
            return ";"
        }
    },
    prevWORD: {
        states: {
            start: {
                " ": "space",
                ".": "begin_word",
                n: "begin_newline"
            },
            space: {
                " ": "space",
                ".": "word",
                n: "newline"
            },
            begin_word: {
                " ": "space",
                ".": "word",
                n: "newline"
            },
            word: {
                " ": "retoffsetbefore",
                ".": "word",
                n: "retoffsetbefore"
            },
            begin_newline: {
                " ": "space",
                ".": "word",
                n: "newline"
            },
            newline: {
                " ": "space",
                ".": "word",
                n: "retoffsetbefore"
            }
        },
        forward: false,
        outOfBoundsReturn: "zero",
        inputFunc: function (a) {
            if (a === " ") {
                return " "
            }
            if (a === "\n") {
                return "n"
            }
            return "."
        }
    },
    closestIdentifier: {
        states: {
            start: {
                " ": "spaceorpunc_forward",
                a: "alphanum_backward",
                ";": "spaceorpunc_forward",
                n: "retundefined"
            },
            spaceorpunc_forward: {
                " ": "spaceorpunc_forward",
                a: "retoffset",
                ";": "spaceorpunc_forward",
                n: "retundefined"
            },
            alphanum_backward: {
                " ": "retoffsetbefore",
                a: "alphanum_backward",
                ";": "retoffsetbefore",
                n: "retoffsetbefore"
            }
        },
        forward: undefined,
        outOfBoundsReturn: "back_zero_forward_undefined",
        inputFunc: function (a) {
            if (a === " ") {
                return " "
            }
            if (a === "\n") {
                return "n"
            }
            if ((a >= "a" && a <= "z") || (a >= "A" && a <= "Z") || (a >= "0" && a <= "9") || a === "_") {
                return "a"
            }
            return ";"
        }
    },
    closestNonblankWord: {
        states: {
            start: {
                " ": "space_forward",
                a: "alphanum_backward",
                ";": "punc_backward",
                n: "retundefined"
            },
            space_forward: {
                " ": "space_forward",
                a: "retoffset",
                ";": "retoffset",
                n: "retundefined"
            },
            alphanum_backward: {
                " ": "retoffsetbefore",
                a: "alphanum_backward",
                ";": "retoffsetbefore",
                n: "retoffsetbefore"
            },
            punc_backward: {
                " ": "retoffsetbefore",
                a: "retoffsetbefore",
                ";": "punc_backward",
                n: "retoffsetbefore"
            }
        },
        forward: undefined,
        outOfBoundsReturn: "back_zero_forward_undefined",
        inputFunc: function (a) {
            if (a === " ") {
                return " "
            }
            if (a === "\n") {
                return "n"
            }
            if ((a >= "a" && a <= "z") || (a >= "A" && a <= "Z") || (a >= "0" && a <= "9") || a === "_") {
                return "a"
            }
            return ";"
        }
    },
    endCurrentWord: {
        states: {
            start: {
                " ": "retundefined",
                a: "alphanum",
                ";": "punc",
                n: "retundefined"
            },
            alphanum: {
                " ": "retoffsetbefore",
                a: "alphanum",
                ";": "retoffsetbefore",
                n: "retoffsetbefore"
            },
            punc: {
                " ": "retoffsetbefore",
                a: "retoffsetbefore",
                ";": "punc",
                n: "retoffsetbefore"
            }
        },
        forward: true,
        outOfBoundsReturn: "end",
        inputFunc: function (a) {
            if (a === " ") {
                return " "
            }
            if (a === "\n") {
                return "n"
            }
            if ((a >= "a" && a <= "z") || (a >= "A" && a <= "Z") || (a >= "0" && a <= "9") || a === "_") {
                return "a"
            }
            return ";"
        }
    },
    paragraph: {
        states: {
            start: {
                n: "start",
                " ": "first_space",
                "*": "in_paragraph"
            },
            first_space: {
                n: "start",
                " ": "in_paragraph",
                "*": "in_paragraph"
            },
            in_paragraph: {
                n: "possible_end",
                " ": "in_paragraph",
                "*": "in_paragraph"
            },
            possible_end: {
                n: "possible_end",
                " ": "end_first_space",
                "*": "in_paragraph"
            },
            end_first_space: {
                n: "retoffsetbefore",
                " ": "in_paragraph",
                "*": "in_paragraph"
            }
        },
        forward: true,
        outOfBoundsReturn: "end",
        inputFunc: function (a) {
            if (a === " ") {
                return " "
            }
            if (a === "\n") {
                return "n"
            }
            return "*"
        }
    },
    prevParagraph: {
        states: {
            start: {
                n: "start",
                " ": "first_space",
                "*": "in_paragraph"
            },
            first_space: {
                n: "start",
                " ": "in_paragraph",
                "*": "in_paragraph"
            },
            in_paragraph: {
                n: "possible_end",
                " ": "in_paragraph",
                "*": "in_paragraph"
            },
            possible_end: {
                n: "possible_end",
                " ": "end_first_space",
                "*": "in_paragraph"
            },
            end_first_space: {
                n: "retoffsetbefore",
                " ": "in_paragraph",
                "*": "in_paragraph"
            }
        },
        forward: false,
        outOfBoundsReturn: "zero",
        inputFunc: function (a) {
            if (a === " ") {
                return " "
            }
            if (a === "\n") {
                return "n"
            }
            return "*"
        }
    },
    sentence: {
        states: {
            start: {
                ".": "dot",
                n: "start",
                " ": "first_space",
                "]": "paragraph",
                "*": "paragraph"
            },
            first_space: {
                ".": "dot",
                n: "start",
                " ": "paragraph",
                "]": "paragraph",
                "*": "paragraph"
            },
            paragraph: {
                ".": "dot",
                n: "possible_paragraph_border",
                " ": "paragraph",
                "]": "paragraph",
                "*": "paragraph"
            },
            possible_paragraph_border: {
                ".": "dot",
                n: "possible_paragraph_border",
                " ": "space_in_possible_paragraph_border",
                "]": "paragraph",
                "*": "paragraph"
            },
            space_in_possible_paragraph_border: {
                ".": "dot",
                n: "retoffsetbefore",
                " ": "paragraph",
                "]": "paragraph",
                "*": "paragraph"
            },
            dot: {
                ".": "dot",
                n: "possible_paragraph_border_after_dot",
                " ": "space",
                "]": "closing",
                "*": "paragraph"
            },
            possible_paragraph_border_after_dot: {
                ".": "retoffset",
                n: "possible_paragraph_border_after_dot",
                " ": "space_in_possible_paragraph_border_after_dot",
                "]": "retoffset",
                "*": "retoffset"
            },
            space_in_possible_paragraph_border_after_dot: {
                ".": "retoffset",
                n: "retoffsetbefore",
                " ": "space",
                "]": "retoffset",
                "*": "retoffset"
            },
            space: {
                ".": "retoffset",
                n: "possible_paragraph_border_after_dot",
                " ": "space",
                "]": "retoffset",
                "*": "retoffset"
            },
            closing: {
                ".": "retoffset",
                n: "possible_paragraph_border_after_dot",
                " ": "space",
                "]": "closing",
                "*": "retoffset"
            }
        },
        forward: true,
        outOfBoundsReturn: "end",
        inputFunc: function (a) {
            if (a === " ") {
                return " "
            }
            if (a === "\n") {
                return "n"
            }
            if (a === "." || a === "!" || a === "?") {
                return "."
            }
            if (a === ")" || a === "]" || a === '"' || a === "'") {
                return "]"
            }
            return "*"
        }
    },
    sentenceEnd: {
        states: {
            start: {
                ".": "dot",
                n: "start",
                " ": "first_space",
                "]": "paragraph",
                "*": "paragraph"
            },
            first_space: {
                ".": "dot",
                n: "retoffsetbefore",
                " ": "paragraph",
                "]": "paragraph",
                "*": "paragraph"
            },
            paragraph: {
                ".": "dot",
                n: "possible_paragraph_border",
                " ": "paragraph",
                "]": "paragraph",
                "*": "paragraph"
            },
            possible_paragraph_border: {
                ".": "dot",
                n: "possible_paragraph_border",
                " ": "space_in_possible_paragraph_border",
                "]": "paragraph",
                "*": "paragraph"
            },
            space_in_possible_paragraph_border: {
                ".": "dot",
                n: "retoffsetbefore3",
                " ": "paragraph",
                "]": "paragraph",
                "*": "paragraph"
            },
            dot: {
                ".": "dot",
                n: "retoffsetbefore",
                " ": "retoffsetbefore",
                "]": "closing",
                "*": "paragraph"
            },
            closing: {
                ".": "retoffsetbefore",
                n: "retoffsetbefore",
                " ": "retoffsetbefore",
                "]": "closing",
                "*": "retoffsetbefore"
            }
        },
        forward: true,
        outOfBoundsReturn: "end",
        inputFunc: function (a) {
            if (a === " ") {
                return " "
            }
            if (a === "\n") {
                return "n"
            }
            if (a === "." || a === "!" || a === "?") {
                return "."
            }
            if (a === ")" || a === "]" || a === '"' || a === "'") {
                return "]"
            }
            return "*"
        }
    },
    run: function (f, a, e) {
        var d = "start",
            c, b;
        for (c = a; c >= 0 && c < e.length; f.forward ? ++c : --c) {
            b = f.inputFunc(e.charAt(c));
            d = f.states[d][b];
            if (d === "retoffsetbefore3") {
                return f.forward ? c - 3 : c + 3
            }
            if (d === "retoffsetbefore") {
                return f.forward ? c - 1 : c + 1
            }
            if (d === "retoffset") {
                return c
            }
            if (d === "retundefined") {
                return undefined
            }
            if (d.indexOf("backward") !== -1) {
                f.forward = false
            } else {
                if (d.indexOf("forward") !== -1) {
                    f.forward = true
                }
            }
        }
        if (typeof f.outOfBoundsReturn !== "undefined") {
            switch (f.outOfBoundsReturn) {
                case "zero":
                    return 0;
                case "end":
                    return e.length - 1;
                case "word_out_of_bounds":
                    return -2;
                case "dont_move":
                    return -1;
                case "back_zero_forward_undefined":
                    return f.forward ? undefined : 0
            }
        }
        return -1
    },
    getWord: function (a, b) {
        return this.run(this.word, a, b)
    },
    getWORD: function (a, b) {
        return this.run(this.WORD, a, b)
    },
    getEndWord: function (a, b) {
        return this.run(this.endword, a, b)
    },
    getEndWORD: function (a, b) {
        return this.run(this.endWORD, a, b)
    },
    getEndCurrentWord: function (a, b) {
        return this.run(this.endCurrentWord, a, b)
    },
    getPreviousWord: function (a, b) {
        return this.run(this.prevword, a, b)
    },
    getPreviousWORD: function (a, b) {
        return this.run(this.prevWORD, a, b)
    },
    getClosestWordForSearch: function (a, b) {
        var c = this.run(this.closestIdentifier, a, b);
        if (typeof c === "undefined") {
            c = this.run(this.closestNonblankWord, a, b)
        }
        return c
    },
    getNextParagraphStart: function (a, b) {
        return this.run(this.paragraph, a, b)
    },
    getPrevParagraphStart: function (a, b) {
        return this.run(this.prevParagraph, a, b)
    },
    getNextSentenceStart: function (a, b) {
        return this.run(this.sentence, a, b)
    },
    getFirstAvailableSentenceEnd: function (a, b) {
        return this.run(this.sentenceEnd, a, b)
    }
};
var TextArea = function (b, a, l, k, h, c, e, g, n, f, m, d, o) {
    var j;
    this.topX = b;
    this.topY = a;
    this.bufferName = f;
    this.rawText = l;
    this.ignoreEmptyLines = l.length > 1 && l[1].length === 0;
    this.zoomOut = k || false;
    this.limit = h || 0;
    this.sacred = g || false;
    this.bossMode = m || false;
    this.undos = d || [];
    this.redos = o || [];
    this.sinkList = [];
    this.alwaysSink = c || false;
    this.shouldClean = e || " ";
    this.currentNumber = 0;
    this.highlights = [];
    this.marks = n || {};
    this.rawNumberOfLines = l.length;
    this.maxPotentialLineLength = 0;
    for (j = 0; j < l.length; ++j) {
        this.maxPotentialLineLength = Math.max(this.maxPotentialLineLength, l[j].length)
    }
    this.maxPotentialLineLength = this.maxPotentialLineLength * 2;
    this.initTextAndSpecialAreas()
};
TextArea.prototype.isZoomOut = function () {
    return this.zoomOut
};
TextArea.prototype.isAlwaysSink = function () {
    return this.alwaysSink || false
};
TextArea.prototype.getShouldClean = function () {
    return this.shouldClean || " "
};
TextArea.prototype.getCurrentNumber = function () {
    return this.currentNumber || 0
};
TextArea.prototype.setCurrentNumber = function (a) {
    this.currentNumber = a
};
TextArea.prototype.getLimit = function () {
    return this.limit
};
TextArea.prototype.isSacred = function () {
    return this.sacred
};
TextArea.prototype.isBossMode = function () {
    return this.bossMode
};
TextArea.prototype.getTopY = function () {
    return this.topY
};
TextArea.prototype.getTopX = function () {
    return this.topX
};
TextArea.prototype.getLineLength = function (a) {
    return this.text[a].length
};
TextArea.prototype.getLine = function (a) {
    return this.text[a]
};
TextArea.prototype.getNumberOfLines = function () {
    return this.height
};
TextArea.prototype.getRawNumberOfLines = function () {
    return this.rawNumberOfLines
};
TextArea.prototype.getMaxPotentialLineLength = function () {
    return this.maxPotentialLineLength
};
TextArea.prototype.getMaxLength = function () {
    return this.maxLength
};
TextArea.prototype.getData = function () {
    return {
        topX: this.topX,
        topY: this.topY,
        rawText: this.rawText.join("\n"),
        zoomOut: this.zoomOut,
        limit: this.limit,
        alwaysSink: this.alwaysSink,
        shouldClean: this.shouldClean,
        sacred: this.sacred,
        bossMode: this.bossMode,
        marks: this.marks,
        undos: this.undos,
        redos: this.redos
    }
};
TextArea.prototype.restore = function (a, b) {
    return new TextArea(a.topX, a.topY, a.rawText.split("\n"), a.zoomOut, a.limit, a.alwaysSink, a.shouldClean, a.sacred, a.marks, b, a.bossMode, a.undos, a.redos)
};
TextArea.prototype.overlaps = function (b, d) {
    var a = d - this.topY,
        c = b - this.topX;
    return (a >= 0 && c >= 0 && this.text[a] && c < this.text[a].length && a < this.height)
};
TextArea.prototype.getLetter = function (b, d) {
    var a = d - this.topY,
        c = b - this.topX;
    return this.text[a] && this.text[a].length > c && c >= 0 ? this.text[a].charAt(c) : ""
};
TextArea.prototype.toJoinedOffset = function (b, f) {
    var d, e = 0,
        c = b - this.topX,
        a = f - this.topY;
    for (d = 0; d < a; ++d) {
        e += this.text[d].length + 1
    }
    e += c;
    return e
};
TextArea.prototype.controlLength = function (f, c) {
    var d = 0,
        b, e, a;
    while (c > 0 && f.charAt(c) !== "^") {
        --c
    }
    if (f.charAt(c) === "^") {
        d = f.charAt(c + 1) === "h" ? 1 : 0;
        switch (f.charAt(c + d + 1)) {
            case "x":
            case "d":
            case "t":
            case "M":
            case "m":
            case "o":
            case "_":
                d += 1;
                break;
            case "r":
                d += 2;
                break;
            case "n":
                d += f.indexOf("^", c + 1) - c - 2;
                break;
            case "*":
            case "+":
                b = f.indexOf(".", c + 1);
                a = parseInt(f.substring(c + 2, b), 10);
                e = b + a + 1;
                d += e - c;
                break;
            default:
                d = 0
        }
    }
    return d
};
TextArea.prototype.unaryRangeType = function (a) {
    switch (a) {
        case "x":
        case "r":
        case "M":
        case "m":
        case "t":
        case "o":
        case "_":
            return true;
        case "d":
        case "n":
        case "*":
        case "+":
            return false;
        default:
            return false
    }
};
TextArea.prototype.toPosition = function (a) {
    var b = 0;
    while (a - this.text[b].length - 1 >= 0) {
        a = a - this.text[b].length - 1;
        b = b + 1
    }
    return {
        x: this.topX + a,
        y: this.topY + b
    }
};
TextArea.prototype.charBelowPos = function (a, f, b, e) {
    var c, d;
    for (c = 0; c < e; ++c) {
        if (f - this.topY + 1 < this.text.length) {
            f = f + 1;
            d = this.text[f - this.topY].length + this.topX - 1;
            a = b === -1 ? d : Math.min(b, d)
        }
    }
    return {
        x: a,
        y: f
    }
};
TextArea.prototype.charAbovePos = function (a, f, b, e) {
    var c, d;
    for (c = 0; c < e; ++c) {
        if (f - this.topY > 0) {
            f = f - 1;
            d = this.text[f - this.topY].length + this.topX - 1;
            a = b === -1 ? d : Math.min(b, d)
        }
    }
    return {
        x: a,
        y: f
    }
};
TextArea.prototype.prevCharPos = function (a, d, c) {
    var b;
    for (b = 0; b < c; ++b) {
        if (a - this.topX > 0) {
            a = a - 1
        }
    }
    return {
        x: a,
        y: d
    }
};
TextArea.prototype.nextCharPos = function (a, d, c) {
    var b;
    for (b = 0; b < c; ++b) {
        if (this.text[d - this.topY].length > a - this.topX + 1) {
            a = a + 1
        }
    }
    return {
        x: a,
        y: d
    }
};
TextArea.prototype.doWordPosMotion = function (a, h, e, g) {
    var f = this.toJoinedOffset(a, h),
        b, c, d;
    for (c = 0; c < g; ++c) {
        b = e.call(vim.motionsFSM, f, this.joinedText);
        f = b >= 0 ? b : f;
        if (b === -2) {
            f = -2;
            break
        }
    }
    if (f === -2) {
        d = this.toPosition(this.joinedText.length - 1);
        d.wordOutOfBounds = true;
        return d
    }
    return f >= 0 ? this.toPosition(f) : {
        x: a,
        y: h
    }
};
TextArea.prototype.nextWordPos = function (a, d, b, c) {
    return this.doWordPosMotion(a, d, b ? vim.motionsFSM.getWORD : vim.motionsFSM.getWord, c)
};
TextArea.prototype.endWordPos = function (a, d, b, c) {
    return this.doWordPosMotion(a, d, b ? vim.motionsFSM.getEndWORD : vim.motionsFSM.getEndWord, c)
};
TextArea.prototype.prevWordPos = function (a, d, b, c) {
    return this.doWordPosMotion(a, d, b ? vim.motionsFSM.getPreviousWORD : vim.motionsFSM.getPreviousWord, c)
};
TextArea.prototype.hardBOLPos = function (a, b) {
    return {
        x: this.topX,
        y: b
    }
};
TextArea.prototype.softBOLPos = function (b, d) {
    var c, a = d - this.topY;
    for (c = 0; c < this.text[a].length; ++c) {
        if (this.text[a].charAt(c) !== " ") {
            break
        }
    }
    if (c === this.text[a].length && c > 0) {
        c = 0
    }
    return {
        x: this.topX + c,
        y: d
    }
};
TextArea.prototype.firstLineSoftBOLPos = function (a, b) {
    return this.softBOLPos(a, this.topY)
};
TextArea.prototype.lastLineSoftBOLPos = function (a, b) {
    return this.softBOLPos(a, this.topY + this.getNumberOfLines() - 1)
};
TextArea.prototype.gotoSoftBOLPosInLine = function (b, c, a) {
    a = Math.min(a, this.getNumberOfLines());
    return this.softBOLPos(b, this.topY + a - 1)
};
TextArea.prototype.columnPos = function (a, d, c) {
    var b = this.topX - 1 + Math.min(c, this.text[d - this.topY].length);
    return {
        x: b,
        y: d
    }
};
TextArea.prototype.endOfLine = function (b, f, d) {
    var c, a, e = f - this.topY;
    for (c = 0; c < d; ++c) {
        a = this.text[e].length;
        if (a > 0) {
            --a
        }
        if (c < d - 1 && e < this.getNumberOfLines() - 1) {
            ++e
        }
    }
    return {
        x: this.topX + a,
        y: this.topY + e
    }
};
TextArea.prototype.findNextInLine = function (b, g, e, f) {
    var c = b - this.topX,
        a = g - this.topY,
        d;
    for (d = 0; d < f; ++d) {
        c = this.text[a].indexOf(e, c + 1);
        if (c === -1) {
            break
        }
    }
    return c === -1 ? {
        x: b,
        y: g
    } : {
        x: this.topX + c,
        y: g
    }
};
TextArea.prototype.findPrevInLine = function (b, g, e, f) {
    var c = b - this.topX,
        a = g - this.topY,
        d;
    for (d = 0; d < f; ++d) {
        c = c === 0 ? -1 : this.text[a].lastIndexOf(e, c - 1);
        if (c === -1) {
            break
        }
    }
    return c === -1 ? {
        x: b,
        y: g
    } : {
        x: this.topX + c,
        y: g
    }
};
TextArea.prototype.findNextTillInLine = function (a, e, c, d) {
    var b = this.findNextInLine(a, e, c, d);
    if (b.x !== a && b.x > 0) {
        --b.x
    }
    return b
};
TextArea.prototype.findPrevTillInLine = function (a, e, c, d) {
    var b = this.findPrevInLine(a, e, c, d);
    if (b.x !== a && b.x < this.topX + this.text[e - this.topY].length) {
        ++b.x
    }
    return b
};
TextArea.prototype.findMatchingBracket = function (k, h) {
    var f = this.toJoinedOffset(k, h),
        e = -1,
        a, m = "([{<",
        d = ")]}>",
        l = "()[]{}<>",
        g = 0,
        c = -1,
        b, j;
    for (; f < this.joinedText.length && this.joinedText[f] !== "\n" && l.indexOf(this.joinedText[f]) === -1; f++) {}
    if (f < this.joinedText.length && this.joinedText[f] !== "\n") {
        a = this.joinedText[f];
        c = Math.floor(l.indexOf(a) / 2);
        j = m.indexOf(a) !== -1 ? 1 : -1
    }
    if (c !== -1) {
        for (; f >= 0 && f < this.joinedText.length; f = f + j) {
            b = this.joinedText[f];
            if (b === m[c]) {
                g = g + 1
            } else {
                if (b === d[c]) {
                    g = g - 1
                }
            }
            if (g === 0) {
                e = f;
                break
            }
        }
    }
    if (e >= 0) {
        return this.toPosition(e)
    }
    return {
        x: k,
        y: h
    }
};
TextArea.prototype.findUnmatchedBracket = function (l, j, a, b) {
    var f = this.toJoinedOffset(l, j),
        e = -1,
        g, m = "()[]{}<>",
        h = 0,
        d = m.indexOf(a),
        c, k;
    if (d !== -1) {
        k = d % 2 === 0 ? -1 : 1;
        g = m.charAt(d - k);
        h = b;
        if (this.joinedText[f] === g || this.joinedText[f] === a) {
            f = f + k
        }
        for (; f >= 0 && f < this.joinedText.length; f = f + k) {
            c = this.joinedText[f];
            if (c === a) {
                h = h - 1
            } else {
                if (c === g) {
                    h = h + 1
                }
            }
            if (h === 0) {
                e = f;
                break
            }
        }
    }
    if (e >= 0) {
        return this.toPosition(e)
    }
    return {
        x: l,
        y: j
    }
};
TextArea.prototype.getTextInRange = function (g, f, d, b) {
    var c, e = "",
        a;
    if (f === b) {
        for (c = g; c <= d; ++c) {
            e += this.text[f - this.topY].charAt(c - this.topX)
        }
    } else {
        a = this.text[f - this.topY];
        for (c = g; c <= this.topX + a.length - 1; ++c) {
            e += a.charAt(c - this.topX)
        }
        e += "\n";
        for (c = f + 1; c < b; ++c) {
            a = this.text[c - this.topY];
            e += a + "\n"
        }
        a = this.text[b - this.topY];
        for (c = this.topX; c <= d; ++c) {
            e += a.charAt(c - this.topX)
        }
    }
    return e
};
TextArea.prototype.getAffectedText = function (a, d) {
    var b = this.rawText.join("\n") + "\n",
        c = this.getSpecialArea(a, d);
    if (typeof c === "undefined") {
        return
    }
    switch (c.type) {
        case "x":
            return b.charAt(c.rawStart + 2);
        case "d":
            return (b.substring(c.rawStart + 2, c.rawEnd) + (c.bol && c.eol ? "\n" : ""));
        default:
    }
};
TextArea.prototype.getRangeText = function (a) {
    var c, b, d = "";
    for (c = a.sy; c <= a.ey; ++c) {
        if (c > a.sy) {
            d += "\n"
        }
        for (b = c === a.sy ? a.sx : this.topX; b <= (c === a.ey ? a.ex : this.topX + this.getLineLength(b - this.topY)); ++b) {
            d += this.getLetter(b, c)
        }
    }
    if (a.linewise) {
        d += "\n"
    }
    return d
};
TextArea.prototype.applySpecialArea = function (a, c) {
    var b = this.getSpecialArea(a, c);
    if (typeof b === "undefined") {
        return
    }
    return this.applyGivenSpecialArea(b)
};
TextArea.prototype.applyGivenSpecialArea = function (g) {
    var c, b, d, f, e, a;
    f = this.rawText.join("\n");
    b = g.rawStart;
    d = g.rawEnd;
    switch (g.type) {
        case "x":
        case "d":
            c = "";
            break;
        case "r":
        case "t":
            c = g.originalCharacter;
            break;
        case "*":
        case "+":
            c = g.originalText + (g.bol && g.eol ? "\n" : "");
            break;
        case "n":
            c = g.originalCharacter;
            ++this.currentNumber;
            break;
        case "M":
            c = "";
            break;
        default:
            c = f.substring(b, d + 1)
    }
    a = g.type === "d" && g.rawEnd === f.length - 1 && f.charAt(g.rawStart - 1) === "\n";
    f = f.substring(0, b + (a ? -1 : 0)) + c + f.substring(d + 1 + (g.bol && g.eol ? 1 : 0));
    this.rawText = f.split("\n");
    if (this.getNumberOfLines() > this.rawText.length && this.rawText[this.rawText.length - 1] === "") {
        f = f.substr(0, f.length - 1);
        this.rawText = f.split("\n")
    }
    this.initTextAndSpecialAreas()
};
TextArea.prototype.getRawCaretType = function (d) {
    var b, f = false,
        e = false,
        a = false,
        c = this.rawText.join("\n");
    for (b = 0; b < c.length; ++b) {
        if (c.charAt(b) === "^") {
            if (a) {
                a = false;
                e = false
            } else {
                if (c.length === b + 1 || c.charAt(b + 1) !== "^" || f) {
                    e = true;
                    if (f) {
                        f = false
                    } else {
                        if (c.length !== b + 1 && !this.unaryRangeType(c.charAt(b + 1))) {
                            f = true
                        }
                    }
                    a = false
                } else {
                    if (!f) {
                        a = true
                    }
                    e = false
                }
            }
        }
        if (b === d) {
            if (e) {
                return 0
            }
            if (a) {
                return 1
            }
            return 2
        }
    }
    return -1
};
TextArea.prototype.initTextAndSpecialAreas = function (b, a, l, u) {
    var q, h, e, s, t, p, r, d, n, k, g, j, m, c, f, o = false;
    k = this.rawText.join("\n");
    this.areas = [];
    this.text = [];
    this.maxLength = 0;
    t = false;
    p = false;
    r = 0;
    e = 0;
    h = "";
    c = 0;
    for (q = 0; q < k.length; q += 1) {
        if (typeof u !== "undefined" && !o && this.text.length === a && h.length === b) {
            k = k.substr(0, q) + u + k.substr(q + l);
            this.rawText = k.split("\n");
            q -= 1;
            o = true;
            continue
        }
        g = true;
        m = 0;
        j = k.charAt(q);
        if (j === "^") {
            g = false;
            if (this.getRawCaretType(q) === 1) {
                g = true;
                m = 1
            } else {
                if (t === false) {
                    ++c;
                    if (k.charAt(q + 1) === "h") {
                        p = true;
                        q += 1
                    }
                    s = {};
                    s.type = k.charAt(q + 1);
                    s.textArea = this;
                    s.number = this.areas.length;
                    s.startX = this.topX + h.length;
                    s.startY = this.topY + this.text.length;
                    s.rawStart = q + (p ? -1 : 0);
                    s.hidden = p;
                    s.eols = 0;
                    s.bol = q === 0 || k.charAt(q - 1) === "\n";
                    p = false;
                    switch (s.type) {
                        case "x":
                            s.endX = this.topX + h.length;
                            s.endY = this.topY + this.text.length;
                            s.rawEnd = q + 2;
                            this.areas.push(s);
                            q += 1;
                            break;
                        case "t":
                            s.endX = this.topX + h.length;
                            s.endY = this.topY + this.text.length;
                            s.originalCharacter = k.charAt(q + 2);
                            s.rawEnd = q + 2;
                            this.areas.push(s);
                            q += 1;
                            break;
                        case "r":
                            s.endX = this.topX + h.length;
                            s.endY = this.topY + this.text.length;
                            s.originalCharacter = k.charAt(q + 2);
                            s.rawEnd = q + 3;
                            this.areas.push(s);
                            q += 2;
                            break;
                        case "M":
                            s.endX = this.topX + h.length;
                            s.endY = this.topY + this.text.length;
                            s.rawEnd = q + 1;
                            this.areas.push(s);
                            q += 1;
                            break;
                        case "m":
                            f = k.charAt(q + 2);
                            if (vim.model.isLocalMark(f)) {
                                this.addLocalMark(f, this.topX + h.length, this.topY + this.text.length, 0, this.limit === 0 && this.alwaysSink !== true)
                            } else {
                                if (vim.model.isGlobalMark(f)) {
                                    vim.model.addGlobalMark(f, this.topX + h.length, this.topY + this.text.length, this.bufferName, this, 0, true)
                                }
                            }
                            k = k.substr(0, q) + k.substr(q + 3);
                            this.rawText = k.split("\n");
                            q -= 1;
                            break;
                        case "d":
                            q += 1;
                            t = true;
                            r = 0;
                            break;
                        case "n":
                            s.stepNumber = parseInt(k.substring(q + 2, k.indexOf("^", q + 1) - 1), 10);
                            if (this.currentNumber === 0 || this.currentNumber > s.stepNumber) {
                                this.currentNumber = s.stepNumber
                            }
                            s.originalCharacter = k.charAt(k.indexOf("^", q + 1) - 1);
                            q += k.indexOf("^", q + 1) - q - 2;
                            t = true;
                            r = 0;
                            break;
                        case "*":
                        case "+":
                            d = k.indexOf(".", q + 1);
                            s.originalLength = parseInt(k.substring(q + 2, d), 10);
                            n = d + s.originalLength + 1;
                            s.originalText = k.substring(d + 1, n);
                            s.inplace = n - d === k.indexOf("^", n + 1) - n;
                            r = 0;
                            q = n;
                            t = true;
                            break;
                        case "o":
                        case "_":
                            s.endX = this.topX + h.length;
                            s.endY = this.topY + this.text.length;
                            s.rawEnd = q + 2;
                            s.requiredMark = s.type === "_" ? " " : k.charAt(q + 2);
                            this.areas.push(s);
                            if (s.type === "_" && k.charAt(q + 2) !== " ") {
                                f = k.charAt(q + 2);
                                if (vim.model.isLocalMark(f)) {
                                    this.addLocalMark(f, this.topX + h.length, this.topY + this.text.length, 0, false)
                                } else {
                                    if (vim.model.isGlobalMark(f)) {
                                        vim.model.addGlobalMark(f, this.topX + h.length, this.topY + this.text.length, this.bufferName, this, 0, false)
                                    }
                                }
                                k = k.substr(0, q + 2) + " " + k.substr(q + 3)
                            }
                            q += 2;
                            break;
                        default:
                            h = h + k.charAt(q);
                            break
                    }
                } else {
                    switch (s.type) {
                        case "d":
                        case "n":
                        case "*":
                        case "+":
                            s.eol = q === k.length - 1 || k.charAt(q + 1) === "\n";
                            s.endX = this.topX + h.length - 1;
                            s.endY = this.topY + this.text.length;
                            s.rawEnd = q;
                            s.eols = r + (s.bol && s.eol ? 1 : 0);
                            if ("+*".indexOf(s.type) !== -1) {
                                s.shownText = k.substring(n + 1, q)
                            }
                            t = false;
                            this.areas.push(s);
                            break
                    }
                }
            }
        }
        if (j === "\n" || q + 1 === k.length) {
            if (j === "\n") {
                ++r
            }
            if (j !== "\n" && j !== "^" && q + 1 === k.length) {
                h += j
            }
            if (!(h === "" && c === 1 && k.charAt(q - (j === "\n" ? 1 : 0)) === "^")) {
                this.text.push(h);
                if (h.length > this.maxLength) {
                    this.maxLength = h.length
                }
            } else {
                s.emptyLine = true
            }
            h = "";
            c = 0
        } else {
            if (g) {
                h += j
            }
        }
        q += m
    }
    this.joinedText = this.text.join("\n");
    this.height = this.text.length;
    this.rawText = k.split("\n")
};
TextArea.prototype.isComplete = function (d) {
    var e, a, c, b = vim.model;
    for (e = 0; e < this.areas.length; e += 1) {
        a = this.areas[e];
        switch (a.type) {
            case "M":
                continue;
            case "o":
                c = this.getLocalMarkForPosition(a.startX, a.startY) || b.getGlobalMarkForPosition(a.startX, a.startY, this.bufferName);
                if (d !== true && (typeof c === "undefined" || c.mark !== a.requiredMark)) {
                    return false
                }
                break;
            case "_":
                c = this.getLocalMarkForPosition(a.startX, a.startY) || b.getGlobalMarkForPosition(a.startX, a.startY, this.bufferName);
                if (d !== true && (typeof c !== "undefined" && b.getDisplayableMarks().indexOf(c.mark) !== -1)) {
                    return false
                }
                break;
            default:
                return false
        }
    }
    if (d !== true && Game.bugsCount(this.topX, this.topY, this.topX + this.getLineLength(this.getNumberOfLines() - 1) - 1, this.topY + this.getNumberOfLines() - 1, this.bufferName) > 0) {
        return false
    }
    return true
};
TextArea.prototype.getSpecialArea = function (a, d) {
    var c, b;
    for (c = 0; c < this.areas.length; c += 1) {
        b = this.areas[c];
        if ((d >= b.startY && d <= b.endY && (b.startY === b.endY && b.startY === d && b.startX <= a && b.endX >= a)) || (b.startY !== b.endY && ((d === b.startY && a >= b.startX) || (d > b.startY && d < b.endY) || (d === b.endY && a <= b.endX)))) {
            return b
        }
    }
};
TextArea.prototype.getEmptyLineSpecialArea = function (a, e, b) {
    var d, c;
    for (d = 0; d < this.areas.length; d += 1) {
        c = this.areas[d];
        if (c.emptyLine === true && c.startY === c.endY && c.startY === e + (b ? 0 : 1)) {
            return c
        }
    }
};
TextArea.prototype.getEmptySpecialArea = function (a, e, b) {
    var d, c;
    for (d = 0; d < this.areas.length; d += 1) {
        c = this.areas[d];
        if (c.emptyLine !== true && e >= c.startY && e <= c.endY && (c.startY === c.endY && c.startY === e && c.startX === a + (b ? 0 : 1) && c.endX === a - 1 + (b ? 0 : 1))) {
            return c
        }
    }
};
TextArea.prototype.isOnSinkList = function (a, c) {
    var b;
    for (b = 0; b < this.sinkList.length; ++b) {
        if (this.sinkList[b][0] === a && this.sinkList[b][1] === c) {
            return true
        }
    }
    return false
};
TextArea.prototype.addToSinkList = function (a, b) {
    if (this.limit > 0 && (!this.isComplete() || this.alwaysSink)) {
        this.sinkList[this.sinkList.length] = [a, b]
    }
};
TextArea.prototype.checkForShouldCleanSpecialAreas = function (a, c) {
    var b = this.getSpecialArea(a, c);
    if (b && b.type === "t") {
        this.applySpecialArea(a, c);
        return true
    }
    return false
};
TextArea.prototype.checkForNumberedSpecialAreas = function (a, c) {
    var b = this.getSpecialArea(a, c);
    if (b && b.type === "n" && b.stepNumber === this.currentNumber) {
        this.applySpecialArea(a, c);
        return true
    }
    return false
};
TextArea.prototype.cursorPositionUpdate = function (a, b) {
    this.addToSinkList(a, b);
    vim.model.recacheCell(a, b)
};
TextArea.prototype.changeSinkListX = function (a, e, d) {
    var c, b = [];
    for (c = 0; c < this.sinkList.length; ++c) {
        if (this.sinkList[c][0] === a && this.sinkList[c][1] === e) {
            b[b.length] = [d, e]
        } else {
            b[b.length] = this.sinkList[c]
        }
    }
    this.sinkList = b
};
TextArea.prototype.changeSinkListY = function (a, e, d) {
    var c, b = [];
    for (c = 0; c < this.sinkList.length; ++c) {
        if (this.sinkList[c][0] === a && this.sinkList[c][1] === e) {
            b[b.length] = [a, d]
        } else {
            b[b.length] = this.sinkList[c]
        }
    }
    this.sinkList = b
};
TextArea.prototype.changeSinkList = function (a, f, e, d) {
    var c, b = [];
    for (c = 0; c < this.sinkList.length; ++c) {
        if (this.sinkList[c][0] === a && this.sinkList[c][1] === f) {
            b[b.length] = [e, d]
        } else {
            b[b.length] = this.sinkList[c]
        }
    }
    this.sinkList = b
};
TextArea.prototype.removeFromSinkList = function (a, d) {
    var c, b = [];
    for (c = 0; c < this.sinkList.length; ++c) {
        if (this.sinkList[c][0] !== a || this.sinkList[c][1] !== d) {
            b[b.length] = this.sinkList[c]
        }
    }
    this.sinkList = b
};
TextArea.prototype.clearSinkList = function () {
    var d = this.sinkList,
        a = d.length,
        b = vim.model,
        c;
    this.sinkList = [];
    for (c = 0; c < a; ++c) {
        b.recacheCell(d[c][0], d[c][1])
    }
};
TextArea.prototype.hotfixPadWithSpaces = function () {
    var c, b, a;
    for (c = 0; c < this.rawText.length; ++c) {
        if (typeof this.rawText[c] !== "undefined" && typeof arguments[c] !== "undefined") {
            for (b = 0, a = -1; b < this.rawText[c].length; ++b) {
                a = this.rawText[c].charAt(b) === " " ? a : b
            }
            this.rawText[c] = this.rawText[c].substring(0, a + 1);
            for (b = 0; b < arguments[c]; ++b) {
                this.rawText[c] += " "
            }
        }
    }
    this.initTextAndSpecialAreas()
};
TextArea.prototype.hotfixSpaceLinesToEmptyLines = function () {
    var b, a, c;
    for (b = 0; b < this.rawText.length; b += 1) {
        c = true;
        for (a = 0; a < this.rawText[b].length; a += 1) {
            if (this.rawText[b].charAt(a) !== " " && this.rawText[b].charAt(a) !== "\n") {
                c = false;
                break
            }
        }
        if (c) {
            this.rawText[b] = ""
        }
    }
    this.initTextAndSpecialAreas()
};
TextArea.prototype.hotfixEmptyLinesToSpaceLines = function () {
    var b, a, c;
    for (b = 0; b < this.rawText.length; b += 1) {
        c = true;
        for (a = 0; a < this.rawText[b].length; a += 1) {
            if (this.rawText[b].charAt(a) !== " " && this.rawText[b].charAt(a) !== "\n") {
                c = false;
                break
            }
        }
        if (c) {
            this.rawText[b] = " "
        }
    }
    this.initTextAndSpecialAreas()
};
TextArea.prototype.hotfixTextLine = function (a, b) {
    this.rawText[a] = b;
    this.initTextAndSpecialAreas()
};
TextArea.prototype.hotfixNoExtraSpacesbutEmptyLines = function () {
    var c, b, d, a;
    for (c = 0; c < this.rawText.length; c += 1) {
        d = true;
        for (b = 0, a = -1; b < this.rawText[c].length; b += 1) {
            a = this.rawText[c].charAt(b) === " " ? a : b;
            if (this.rawText[c].charAt(b) !== " " && this.rawText[c].charAt(b) !== "\n") {
                d = false
            }
        }
        if (d) {
            this.rawText[c] = " "
        } else {
            this.rawText[c] = this.rawText[c].substring(0, a + 1)
        }
    }
    this.initTextAndSpecialAreas()
};
TextArea.prototype.getSearchClosestWord = function (a, g) {
    var d = this.toJoinedOffset(a, g),
        f, c, b, e;
    f = vim.motionsFSM.getClosestWordForSearch(d, this.joinedText);
    if (f >= 0) {
        c = vim.motionsFSM.getEndCurrentWord(f, this.joinedText);
        if (c >= 0) {
            b = this.joinedText.substring(f, c + 1);
            b = b.replace(/([.*+?^$|(){}\[\]])/g, "\\$1");
            e = this.joinedText.charAt(f).toUpperCase();
            if ((e >= "A" && e <= "Z") || (e >= "0" && e <= "9") || e === "@") {
                b = "\\<" + b + "\\>"
            }
        }
    }
    return b
};
TextArea.prototype.highlight = function (d) {
    var h, a, e, g, c, f, b;
    if (typeof d === "undefined") {
        this.highlights = [];
        return
    }
    this.highlights = [];
    d = d.substr(1);
    g = d.indexOf("\\<") === 0;
    c = d.length > 2 && d.indexOf("\\>") === d.length - 2;
    a = (g ? "\\b" : "") + d.substr(g ? 2 : 0, d.length - (g ? 2 : 0) - (c ? 2 : 0)) + (c ? "\\b" : "");
    h = new RegExp(a, "g");
    for (f = 0; f < this.text.length; ++f) {
        do {
            e = h.exec(this.text[f]);
            b = e && e[0] !== "";
            if (b) {
                this.highlights.push({
                    y: this.topY + f,
                    sx: this.topX + e.index,
                    ex: this.topX + e.index + e[0].length - 1
                })
            }
        } while (b)
    }
};
TextArea.prototype.isHighlighted = function (a, c) {
    var b;
    for (b = 0; b < this.highlights.length; ++b) {
        if (this.highlights[b].y === c && this.highlights[b].sx <= a && this.highlights[b].ex >= a) {
            return true
        }
        if (this.highlights[b].y > c) {
            break
        }
    }
    return false
};
TextArea.prototype.getNextHighlightedPosition = function (a, e, c, d) {
    var b;
    if (this.highlights.length === 0) {
        return undefined
    }
    if (c) {
        for (b = 0; b < this.highlights.length; ++b) {
            if (this.highlights[b].y > e || (this.highlights[b].y === e && this.highlights[b].sx > a)) {
                break
            }
        }
    } else {
        for (b = this.highlights.length - 1; b >= 0; --b) {
            if (this.highlights[b].y < e || (this.highlights[b].y === e && this.highlights[b].ex < a)) {
                break
            }
        }
    }
    if (b === -1) {
        b = this.highlights.length - 1
    } else {
        if (b === this.highlights.length) {
            b = 0
        }
    }
    if (d > 1) {
        b = (b + (d - 1) * (c ? 1 : -1)) % this.highlights.length;
        if (b < 0) {
            b = b + this.highlights.length
        }
    }
    return {
        x: this.highlights[b].sx,
        y: this.highlights[b].y
    }
};
TextArea.prototype.yankTextInRange = function (b) {
    var d, a, c, f, e;
    if (b.sy > b.endY || (b.sy === b.ey && b.sx > b.ex)) {
        e = b.sx;
        b.sx = b.ex;
        b.ex = e;
        e = b.sy;
        b.sy = b.ey;
        b.ey = e
    }
    a = b.sx - this.topX;
    for (d = 0; d < b.sy - this.topY; ++d) {
        a += this.getLineLength(d) + 1
    }
    c = b.ex - this.topX;
    for (d = 0; d < b.ey - this.topY; ++d) {
        c += this.getLineLength(d) + 1
    }
    f = this.joinedText.substring(a, c + 1);
    if (b.linewise === true) {
        f = f + "\n"
    }
    return f
};
TextArea.prototype.patchSpecialArea = function (a, c) {
    var b = this.rawText.join("\n");
    b = b.substr(0, a.rawStart) + c + b.substr(a.rawEnd + 1);
    if (b.substr(a.rawStart, 7) === "^+0..^\n" && (a.rawStart === 0 || b.charAt(a.rawStart - 1) === "\n")) {
        b = b.substr(0, a.rawStart + 6) + b.substr(a.rawStart + 7)
    }
    this.rawText = b.split("\n");
    this.initTextAndSpecialAreas()
};
TextArea.prototype.getQuoteTextObjectRange = function (b) {
    var h = Cursor.getX(),
        g = Cursor.getY(),
        d = h,
        f, e = b.charAt(1),
        a, c;
    a = false;
    while (h - 1 >= this.topX && this.getLetter(h - 1, g) !== e) {
        h = h - 1
    }
    if (this.getLetter(h - 1, g) === e) {
        a = true;
        h = h - 1;
        d = h
    }
    if (!a) {
        while (h + 1 <= this.topX + this.getLineLength(g - this.topY) - 1 && this.getLetter(h + 1, g) !== e) {
            h = h + 1
        }
        if (this.getLetter(h + 1, g) === e) {
            a = true;
            h = h + 1;
            d = h
        }
    }
    c = false;
    if (a) {
        while (d + 1 <= this.topX + this.getLineLength(g - this.topY) - 1 && this.getLetter(d + 1, g) !== e) {
            d = d + 1
        }
        if (this.getLetter(d + 1, g) === e) {
            c = true;
            d = d + 1
        }
    }
    return {
        sx: h,
        sy: g,
        ex: d,
        ey: g,
        cancel: !a || !c
    }
};
TextArea.prototype.getParagraphObjectRange = function (j, a) {
    var l, c, h = this.topX,
        f = Cursor.getY(),
        e, d, k = false,
        g, b = false;
    if (!(this.getLetter(h, f) === " " && this.getLineLength(f - this.topY) === 1)) {
        while (f > this.topY && !(this.getLetter(h, f - 1) === " " && this.getLineLength(f - 1 - this.topY) === 1)) {
            f = f - 1
        }
    }
    if (!j) {
        g = this.getNextParagraphStart(h, f, a);
        e = g.x;
        d = g.y;
        if (e === h && d === f) {
            k = true
        } else {
            if (d !== this.topY + this.getNumberOfLines() - 1 || this.getLineLength(d - this.topY) !== 1 || this.getLetter(e, d) === " ") {
                d = d - 1;
                e = this.topX + this.getLineLength(d - this.topY) - 1
            }
        }
    } else {
        e = h;
        d = f;
        for (l = 0; l < a; ++l) {
            b = this.getLetter(e, d) === " " && this.getLineLength(d - this.topY) === 1;
            if (b) {
                while (d < this.topY + this.getNumberOfLines() && this.getLetter(e, d) === " " && this.getLineLength(d - this.topY) === 1) {
                    d = d + 1
                }
                if (l === a - 1) {
                    if (d !== this.topY + this.getNumberOfLines() - 1 || this.getLineLength(d - this.topY) !== 1 || this.getLetter(e, d) === " ") {
                        d = d - 1;
                        e = this.topX + this.getLineLength(d - this.topY) - 1
                    }
                }
            } else {
                e = this.topX;
                while (d > this.topY && this.getLetter(e, d) === " " && this.getLineLength(d - this.topY) === 1) {
                    d = d - 1
                }
                g = this.getNextParagraphStart(e, d, 1);
                if (e === g.x && d === g.y) {
                    k = true;
                    break
                } else {
                    e = g.x;
                    d = g.y;
                    if (l === a - 1) {
                        if (d !== this.topY + this.getNumberOfLines() - 1 || this.getLineLength(d - this.topY) !== 1 || this.getLetter(e, d) === " ") {
                            d = d - 1;
                            e = this.topX + this.getLineLength(d - this.topY) - 1
                        }
                    }
                }
            }
        }
    }
    return {
        sx: h,
        sy: f,
        ex: e,
        ey: d,
        cancel: k
    }
};
TextArea.prototype.getCurrentSentenceStartOffset = function (c) {
    var d, e = c,
        f, g, h = this.joinedText,
        a, k, b;
    a = e;
    g = false;
    f = e;
    while (e > 0 && !g) {
        e = e - 1;
        if (e === 0) {
            g = true;
            a = e
        } else {
            if (e > 1 && e < h.length && h.charAt(e) === " " && h.charAt(e - 1) === "\n" && h.charAt(e + 1) === "\n") {
                g = true;
                a = e
            } else {
                if (h.charAt(e) === "." || h.charAt(e) === "?" || h.charAt(e) === "!") {
                    g = true;
                    k = false;
                    b = false;
                    d = e;
                    while (d + 1 < h.length && g !== false && k === false) {
                        if (!b && ")]\"'".indexOf(h.charAt(d + 1)) !== -1) {
                            d = d + 1
                        } else {
                            if (" \n\t".indexOf(h.charAt(d + 1)) !== -1) {
                                b = true;
                                d = d + 1
                            } else {
                                if (!b) {
                                    g = false
                                } else {
                                    k = true;
                                    a = d + 1
                                }
                                break
                            }
                        }
                    }
                    if (d + 1 === h.length) {
                        a = h.length - 1
                    }
                }
            }
        }
    }
    if (e === 0 && !g) {
        a = 0
    }
    return a
};
TextArea.prototype.getSentenceObjectRange = function (n, b) {
    var o, h = Cursor.getX(),
        g = Cursor.getY(),
        f, e, j, l, m = this.joinedText,
        a, c = this.toJoinedOffset(h, g),
        d = c,
        k;
    while (c > 0 && ")]\"'".indexOf(m.charAt(c)) !== -1) {
        c = c - 1
    }
    if (m.charAt(c) !== ".") {
        c = d
    }
    a = this.getCurrentSentenceStartOffset(c);
    if (a < c) {
        k = this.toPosition(a);
        h = k.x;
        g = k.y;
        l = false
    } else {
        l = true
    }
    if (!n) {
        j = this.getNextSentenceStart(h, g, b - 1);
        f = j.x;
        e = j.y;
        j = this.getFirstAvailableSentenceEnd(f, e, 1);
        f = j.x;
        e = j.y
    } else {
        if (l) {
            while (c > 0 && (m.charAt(c) === " " || (c + 2 < m.length && m.charAt(c) === "\n" && m.charAt(c + 1) === " " && m.charAt(c + 2) !== "\n"))) {
                c = c - 1
            }
            if (m.charAt(c) === "\n") {
                c = c + 1
            }
        } else {
            c = a
        }
        k = this.toPosition(c);
        h = k.x;
        g = k.y;
        o = b;
        while (o > 0) {
            if (l) {
                while (c < m.length - 1 && !(m.charAt(c) !== " " || (c + 2 < m.length && m.charAt(c) === "\n" && m.charAt(c + 1) === " " && m.charAt(c + 2) === "\n"))) {
                    c = c + 1
                }
                if (m.charAt(c) === "\n" && c < m.length - 1) {
                    c = c + 1
                }
                l = false
            } else {
                if ((c === 0 || m.charAt(c - 1) === "\n") && m.charAt(c) === " " && (c + 1 === m.length || m.charAt(c + 1) === "\n")) {
                    c = c + 2;
                    if (c === m.length) {
                        c = c - 1
                    }
                } else {
                    k = this.toPosition(c);
                    j = this.getFirstAvailableSentenceEnd(k.x, k.y, 1);
                    c = this.toJoinedOffset(j.x, j.y);
                    if (c < m.length) {
                        c = c + 1
                    }
                    if (c < m.length && m.charAt(c) === "\n") {
                        c = c + 1
                    }
                }
                l = m.charAt(c) === " " && !((c === 0 || m.charAt(c - 1) === "\n") && (c === m.length - 1 || m.charAt(c + 1) === "\n"))
            }
            o--;
            if (o === 0) {
                if (c > 0) {
                    c = c - 1
                }
                if (c > 0 && m.charAt(c) === "\n") {
                    c = c - 1
                }
            }
        }
        k = this.toPosition(c);
        f = k.x;
        e = k.y
    }
    return {
        sx: h,
        sy: g,
        ex: f,
        ey: e,
        cancel: false
    }
};
TextArea.prototype.charType = function (a, b) {
    if ((a >= "a" && a <= "z") || (a >= "A" && a <= "Z") || a === "_" || (a >= "0" && a <= "9")) {
        return 1
    } else {
        if (a === " " || a === "\n" || a === "\t") {
            return 2
        }
    }
    return b ? 1 : 3
};
TextArea.prototype.getWordObjectRange = function (l, a, b) {
    var n, c, j = Cursor.getX(),
        g = Cursor.getY(),
        e, d, h, k, f = this.charType(this.getLetter(j, g), b),
        m = false;
    while (j - 1 >= this.topX && this.charType(this.getLetter(j - 1, g), b) === f) {
        j = j - 1
    }
    if (!l) {
        h = this.nextWordPos(j, g, b, a - (f !== 2 ? 1 : 0));
        e = h.x;
        d = h.y;
        f = this.charType(this.getLetter(e, d), b);
        while (e + 1 <= this.topX + this.getLineLength(d - this.topY) - 1 && f === this.charType(this.getLetter(e + 1, d), b)) {
            e = e + 1
        }
    } else {
        e = j;
        d = g;
        for (n = 0; n < a; ++n) {
            k = this.charType(this.getLetter(e, d), b) === 2 && this.getLineLength(d - this.topY) !== 1;
            if (k) {
                h = this.nextWordPos(e, d, b, 1);
                d = h.y;
                e = h.x;
                if (n === a - 1) {
                    if (!(h.y === this.topY + this.getNumberOfLines() - 1 && h.x === this.topX + this.getLineLength(h.y - this.topY) - 1)) {
                        if (e > this.topX) {
                            e = e - 1
                        } else {
                            d = d - 1;
                            e = this.topX + this.getLineLength(d - this.topY) - 1
                        }
                    }
                }
            } else {
                if (this.getLetter(e, d) === " " && this.getLineLength(d - this.topY) === 1) {
                    if (n !== a - 1) {
                        if (d < this.topY + this.getNumberOfLines() - 1) {
                            d = d + 1;
                            e = this.topX
                        }
                    }
                } else {
                    f = this.charType(this.getLetter(e, d), b);
                    while (e + 1 <= this.topX + this.getLineLength(d - this.topY) - 1 && f === this.charType(this.getLetter(e + 1, d), b)) {
                        e = e + 1
                    }
                    if (n < a - 1) {
                        e = e + 1;
                        if (e > this.topX + this.getLineLength(d - this.topY) - 1) {
                            if (d < this.topY + this.getNumberOfLines() - 1) {
                                d = d + 1;
                                e = this.topX
                            } else {
                                m = true
                            }
                        }
                    }
                }
            }
        }
    }
    return {
        sx: j,
        sy: g,
        ex: e,
        ey: d,
        cancel: m
    }
};
TextArea.prototype.getBlockObjectRange = function (c, n, a) {
    var l = Cursor.getX(),
        h = Cursor.getY(),
        e, d, p, g, k, f, m, b, o = "[]()<>{}",
        j, i;
    if (c === "b") {
        c = "("
    } else {
        if (c === "B") {
            c = "{"
        }
    }
    b = o.indexOf(c);
    k = b - (b % 2 === 0 ? 0 : 1);
    f = o.charAt(k);
    g = this.getLetter(l, h) === f;
    if (g) {
        a = a - 1
    }
    if (a > 0) {
        j = this.findUnmatchedBracket(l, h, f, a);
        p = l === j.x && h === j.y;
        l = j.x;
        h = j.y
    }
    if (p !== true) {
        i = this.findMatchingBracket(l, h);
        p = l === i.x && h === i.y;
        e = i.x;
        d = i.y
    }
    return {
        sx: l,
        sy: h,
        ex: e,
        ey: d,
        cancel: p
    }
};
TextArea.prototype.getTextObjectRange = function (j, b) {
    var d = ["[]", "()", "<>", "{}"],
        g, o = j.charAt(0) === "i",
        f = j.charAt(1),
        c = "[]()b<>{}B".indexOf(f) !== -1,
        r = "\"`'".indexOf(f) !== -1,
        l = true,
        e = true,
        q = this.getLetter(Cursor.getX(), Cursor.getY()),
        a, n = Cursor.getX(),
        m = Cursor.getY(),
        k = n,
        h = m,
        p;
    if (r) {
        return this.getQuoteTextObjectRange(j)
    }
    if (c) {
        return this.getBlockObjectRange(f, o, b)
    }
    if (f === "p") {
        return this.getParagraphObjectRange(o, b)
    }
    if (f === "w" || f === "W") {
        return this.getWordObjectRange(o, b, f === "W")
    }
    if (f === "s") {
        return this.getSentenceObjectRange(o, b)
    }
    if (f === "t") {
        alert("tag objects are not supported yet")
    }
    return {
        sx: n,
        sy: m,
        ex: k,
        ey: h,
        cancel: p
    }
};
TextArea.prototype.getNextParagraphStart = function (a, f, e) {
    var d = this.toJoinedOffset(a, f),
        b, c;
    for (c = 0; c < e && d !== -1; ++c) {
        b = vim.motionsFSM.getNextParagraphStart(d, this.joinedText);
        d = b >= 0 && b !== d ? b : -1
    }
    return d >= 0 ? this.toPosition(d) : {
        x: a,
        y: f
    }
};
TextArea.prototype.getPrevParagraphStart = function (a, f, e) {
    var d = this.toJoinedOffset(a, f),
        b, c;
    for (c = 0; c < e && d !== -1; ++c) {
        b = vim.motionsFSM.getPrevParagraphStart(d, this.joinedText);
        d = b >= 0 && b !== d ? b : -1
    }
    return d >= 0 ? this.toPosition(d) : {
        x: a,
        y: f
    }
};
TextArea.prototype.getFirstAvailableSentenceEnd = function (a, f, e) {
    var d = this.toJoinedOffset(a, f),
        b, c;
    for (c = 0; c < e && d !== -1; ++c) {
        b = vim.motionsFSM.getFirstAvailableSentenceEnd(d, this.joinedText);
        d = b >= 0 && b !== d ? b : -1
    }
    return d >= 0 ? this.toPosition(d) : {
        x: a,
        y: f
    }
};
TextArea.prototype.getNextSentenceStart = function (a, f, e) {
    var d = this.toJoinedOffset(a, f),
        b, c;
    for (c = 0; c < e && d !== -1; ++c) {
        b = vim.motionsFSM.getNextSentenceStart(d, this.joinedText);
        d = b >= 0 && b !== d ? b : -1
    }
    return d >= 0 ? this.toPosition(d) : {
        x: a,
        y: f
    }
};
TextArea.prototype.getPrevSentenceStart = function (k, g, b) {
    var d, e = this.toJoinedOffset(k, g),
        l, n, f, h, m = this.joinedText,
        a, o, c;
    while ((e > 0 && this.joinedText.charAt(e) === " ") || this.joinedText.charAt(e) === "\n") {
        --e
    }
    a = e;
    for (n = 0; n < b && a !== -1; ++n) {
        h = false;
        f = e;
        while (e > 0 && !h) {
            e = e - 1;
            if (e === 0) {
                h = true;
                a = e
            } else {
                if (e > 1 && e < m.length && m.charAt(e) === " " && m.charAt(e - 1) === "\n" && m.charAt(e + 1) === "\n") {
                    h = true;
                    a = e
                } else {
                    if (m.charAt(e) === "." || m.charAt(e) === "?" || m.charAt(e) === "!") {
                        h = true;
                        o = false;
                        c = false;
                        d = e;
                        while (d + 1 < m.length && h !== false && o === false) {
                            if (!c && ")]\"'".indexOf(m.charAt(d + 1)) !== -1) {
                                d = d + 1
                            } else {
                                if (" \n\t".indexOf(m.charAt(d + 1)) !== -1) {
                                    c = true;
                                    d = d + 1
                                } else {
                                    if (!c) {
                                        h = false
                                    } else {
                                        o = true;
                                        a = d + 1
                                    }
                                    break
                                }
                            }
                        }
                        if (d + 1 === m.length) {
                            a = m.length - 1
                        }
                    }
                }
            }
        }
        if (n !== b - 1 && e === 0) {
            a = -1;
            break
        }
        if (a === f && a !== 0) {
            b = b + 1
        }
    }
    return a >= 0 ? this.toPosition(a) : {
        x: k,
        y: g
    }
};
TextArea.prototype.addLocalMark = function (d, i, h, c, b) {
    var k = h - this.getTopY(),
        a = i - this.getTopX(),
        f = this.marks[d],
        j = -1,
        g = -1,
        e = vim.model;
    if (!e.isLocalMark(d)) {
        return
    }
    if (!f) {
        this.marks[d] = {};
        f = this.marks[d]
    } else {
        j = f.col;
        g = f.row
    }
    f.mark = d;
    f.col = a;
    f.row = k;
    f.yOffset = typeof c !== "undefined" ? c : 10;
    f.fixed = typeof b !== "undefined" ? b : false;
    e.recacheCell(i, h);
    if (g !== -1 && j !== -1) {
        e.recacheCell(this.getTopX() + j, this.getTopY() + g)
    }
};
TextArea.prototype.deleteLocalMark = function (b) {
    var a = this.marks[b];
    if (a) {
        delete this.marks[b];
        vim.model.recacheCell(this.getTopX() + a.col, this.getTopY() + a.row)
    }
};
TextArea.prototype.deleteLocalMarkAtPosition = function (a, g) {
    var f = "abcdefghijklmnopqrstuvwxyz",
        b = a - this.getTopX(),
        e = g - this.getTopY(),
        d, c;
    for (c = 0; c < f.length; ++c) {
        d = this.marks[f.charAt(c)];
        if (d && d.col === b && d.row === e) {
            delete this.marks[f.charAt(c)];
            vim.model.recacheCell(a, g)
        }
    }
};
TextArea.prototype.updateLocalMarkY = function (g, f, j) {
    var a = "abcdefghijklmnopqrstuvwxyz",
        b = g - this.getTopX(),
        h = f - this.getTopY(),
        e, c, d = vim.model;
    for (c = 0; c < a.length; ++c) {
        e = this.marks[a.charAt(c)];
        if (e && e.col === b && e.row === h) {
            e.row = j - this.getTopY();
            d.recacheCell(g, f);
            d.recacheCell(g, j)
        }
    }
};
TextArea.prototype.updateLocalMark = function (h, g, a, k) {
    var b = "abcdefghijklmnopqrstuvwxyz",
        c = h - this.getTopX(),
        j = g - this.getTopY(),
        f, d, e = vim.model;
    for (d = 0; d < b.length; ++d) {
        f = this.marks[b.charAt(d)];
        if (f && f.col === c && f.row === j) {
            f.row = k - this.getTopY();
            f.col = a - this.getTopX();
            e.recacheCell(h, g);
            e.recacheCell(a, k)
        }
    }
};
TextArea.prototype.backupLocalMarks = function () {
    var a = {},
        b;
    for (b in this.marks) {
        a[b] = {
            mark: this.marks[b].mark,
            col: this.marks[b].col,
            row: this.marks[b].row,
            yOffset: 0,
            fixed: this.marks[b].fixed
        }
    }
    return a
};
TextArea.prototype.restoreLocalMarks = function (a) {
    var b;
    this.marks = {};
    for (b in a) {
        this.marks[b] = {
            mark: a[b].mark,
            col: a[b].col,
            row: a[b].row,
            yOffset: 0,
            fixed: a[b].fixed
        }
    }
};
TextArea.prototype.getLocalMarkForPosition = function (a, g) {
    var f = "abcdefghijklmnopqrstuvwxyz",
        b = a - this.getTopX(),
        e = g - this.getTopY(),
        d, c;
    for (c = 0; c < f.length; ++c) {
        d = this.marks[f.charAt(c)];
        if ((d && d.col === b && d.row === e) || (d && d.row === e && d.col >= this.getLineLength(d.row) && b == this.getLineLength(d.row) - 1)) {
            return this.marks[f.charAt(c)]
        }
    }
    return undefined
};
TextArea.prototype.getLocalMark = function (a) {
    return this.marks[a]
};
TextArea.prototype.hasMarkSpecialAreas = function () {
    var b, a;
    for (b = 0; b < this.areas.length; b += 1) {
        a = this.areas[b];
        if (a.type === "o" || a.type === "_") {
            return true
        }
    }
    return false
};
TextArea.prototype.convertTextToRedoText = function (g) {
    var a = g.split("\n"),
        f = [],
        b, e, d, c;
    for (d = 0; d < a.length; ++d) {
        f[d] = "";
        for (c = 0; c < a[d].length; ++c) {
            f[d] += a[d].charAt(c) + "|"
        }
    }
    b = f.join("REPLAY_ENTER|");
    if (b.length > 1 && b.charAt(b.length - 1) === "|") {
        b = b.substr(0, b.length - 1)
    }
    return b
};
TextArea.prototype.prepareRedoForDelete = function (a) {
    var d = {},
        b, c = this.getSpecialArea(a.sx, a.sy);
    d.x = d.xAfter = a.sx - this.getTopX();
    d.y = d.yAfter = a.sy - this.getTopY();
    d.area = {
        type: c.type,
        rawStart: c.rawStart,
        origText: c.origText,
        shownText: c.shownText
    };
    if (a.linewise === true) {
        d.command = "O";
        d.params = this.convertTextToRedoText(this.getAffectedText(a.sx, a.sy))
    } else {
        if (a.sy === a.ey) {
            if (this.getLineLength(a.ey - this.getTopY()) === a.ex) {
                d.command = "a";
                --d.x
            } else {
                d.command = "i"
            }
            d.params = this.convertTextToRedoText(this.getAffectedText(a.sx, a.sy))
        } else {
            alert("Not implemented yet.")
        }
    }
    this.redos.push(d)
};
TextArea.prototype.patchRawText = function (d) {
    var c = this.rawText.join("\n"),
        b = d.text,
        a = d.offset;
    c = c.substring(0, a) + b + c.substring(a + 1);
    this.rawText = c.split("\n");
    this.initTextAndSpecialAreas()
};
TextArea.prototype.addNewSpecialArea = function (a, d, b, c) {
    this.initTextAndSpecialAreas(a - this.topX, d - this.topY, b, c)
};
vim.email = (function () {
    var b = vim.dom,
        q = vim.audio,
        v, n, l, I, B, f, w, g, C, E, M, c, h, d, o, N, K, p, s, a, j;

    function J() {
        M = -1;
        I.style.visibility = "hidden";
        B.style.visibility = "visible";
        window.setTimeout(function () {
            c.focus()
        }, 10)
    }

    function t(R, P, O, Q) {
        l.innerHTML = R;
        l.className = P;
        I.style.visibility = "visible";
        B.style.visibility = "hidden";
        M = window.setTimeout(O || J, 3000);
        if (Q) {
            c = Q
        }
    }

    function k(P) {
        var O = (h ? o : d ? p : f).value.trim();
        if (P.status === 200) {
            vim.emailaddr = O;
            t("Connecting to PayPal...", "ok", function () {});
            z(true, true)
        } else {
            if (P.status === 201) {
                if (P.responseText == 10) {
                    vim.emailaddr = O;
                    t("Connecting to PayPal...", "ok", function () {});
                    z(true, true, P.responseText)
                }
            } else {
                if (P.status === 202) {
                    t((h ? "Recipient's email" : "Email") + " address is already licensed! Aborting.", "error", function () {
                        J();
                        z(false, false)
                    })
                }
            }
        }
    }

    function z(P, Q, O) {
        if (!P) {
            if (M !== -1 && l.className !== "error") {
                return
            }
            if (M !== -1) {
                window.clearTimeout(M);
                J()
            }
        }
        if (!Q) {
            w.style.display = "none";
            g.style.visibility = "hidden"
        }
        m();
        if (P) {
            if (v) {
                v(h, d, O)
            }
        } else {
            if (n) {
                n()
            }
        }
    }

    function H(O) {
        t("Error: " + O.responseText, "error")
    }

    function L() {
        var O = f.value.trim(),
            P = C.value.trim();
        O = O.replace(/\+/g, "%2b");
        P = P.replace(/\+/g, "%2b");
        q.play("menu_click");
        if (O === "") {
            t("Please enter an email address.", "error", undefined, f)
        } else {
            if (O.indexOf("@") === -1) {
                t("Email address missing @ sign.", "error", undefined, f)
            } else {
                if (O.indexOf(".", O.indexOf("@")) === -1) {
                    t("Email address appears to be invalid. Please recheck.", "error", undefined, f)
                } else {
                    if (O !== P) {
                        t("The two email addresses are not the same. Please recheck.", "error", undefined, C)
                    } else {
                        if (!E.checked) {
                            t("You have to read and accept the Terms of Use<BR>and Privacy Policy to buy a license.", "error", undefined, E)
                        } else {
                            vim.fetcher.getUrl("php/prepaymentSubscribe.php", k, H, undefined, undefined, undefined, function () {
                                t("Processing email information...", "processing", function () {})
                            }, "email=" + encodeURIComponent(O) + "&terms=" + (E.checked ? "true" : "false"))
                        }
                    }
                }
            }
        }
    }

    function u() {
        var O = o.value.trim(),
            P = N.value.trim(),
            Q = K.value.trim();
        O = O.replace(/\+/g, "%2b");
        P = P.replace(/\+/g, "%2b");
        Q = Q.replace(/\+/g, "%2b");
        q.play("menu_click");
        if (O === "") {
            t("Please enter the recipient's email address.", "error", undefined, o)
        } else {
            if (O.indexOf("@") === -1) {
                t("Recipient's address missing @ sign.", "error", undefined, o)
            } else {
                if (O.indexOf(".", O.indexOf("@")) === -1) {
                    t("Recipient's address appears to be invalid. Please recheck.", "error", undefined, o)
                } else {
                    if (P === "") {
                        t("Please enter the buyer's email address.", "error", undefined, N)
                    } else {
                        if (P.indexOf("@") === -1) {
                            t("Buyer's address missing @ sign.", "error", undefined, N)
                        } else {
                            if (P.indexOf(".", P.indexOf("@")) === -1) {
                                t("Buyer's address appears to be invalid. Please recheck.", "error", undefined, N)
                            } else {
                                if (P !== Q) {
                                    t("The two email addresses of the buyer are not the same. Please recheck.", "error", undefined, K)
                                } else {
                                    vim.fetcher.getUrl("php/prepaymentSubscribe.php", k, H, undefined, undefined, undefined, function () {
                                        t("Processing email information...", "processing", function () {})
                                    }, "email=" + encodeURIComponent(O) + "&buyer_email=" + encodeURIComponent(P) + "&gift=true")
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    function F() {
        var O = p.value.trim(),
            P = s.value.trim();
        O = O.replace(/\+/g, "%2b");
        P = P.replace(/\+/g, "%2b");
        q.play("menu_click");
        if (O === "") {
            t("Please enter an email address.", "error", undefined, p)
        } else {
            if (O.indexOf("@") === -1) {
                t("Email address missing @ sign.", "error", undefined, p)
            } else {
                if (O.indexOf(".", O.indexOf("@")) === -1) {
                    t("Email address appears to be invalid. Please recheck.", "error", undefined, p)
                } else {
                    if (O !== P) {
                        t("The two email addresses are not the same. Please recheck.", "error", undefined, s)
                    } else {
                        if (!a.checked) {
                            t("You have to read and accept the Terms of Use<BR>and Privacy Policy to buy a license.", "error", undefined, a)
                        } else {
                            if (!j.checked) {
                                t("You have to confirm that you have to log out of the server for the timer to pause.", "error", undefined, j)
                            } else {
                                vim.fetcher.getUrl("php/prepaymentSubscribe.php", k, H, undefined, undefined, undefined, function () {
                                    t("Processing email information...", "processing", function () {})
                                }, "email=" + encodeURIComponent(O) + "&terms=" + (E.checked ? "true" : "false"))
                            }
                        }
                    }
                }
            }
        }
    }

    function A(O) {
        if (O && O.preventDefault) {
            O.preventDefault()
        } else {
            if (window.event && window.event.returnValue) {
                window.eventReturnValue = false
            }
        }
    }

    function r(O) {
        if (O.keyCode === 27) {
            z(false, false);
            A(O);
            return false
        }
        return true
    }

    function D(O) {
        if (O.charCode === 13 || O.keyCode === 13) {
            if (h) {
                u()
            } else {
                if (d) {
                    F()
                } else {
                    L()
                }
            }
        }
        if (O.charCode === 32 || O.keyCode === 32) {
            A(O);
            return false
        }
    }

    function i(Q, O, P, R) {
        h = P;
        d = R;
        l = document.getElementById(h ? "gift-message" : d ? "timed-message" : "email-message");
        I = document.getElementById(h ? "gift-message-tab" : d ? "timed-message-tab" : "email-message-tab");
        B = document.getElementById(h ? "gift-tab" : d ? "timed-tab" : "email-tab");
        w = document.getElementById(h ? "gift-dialog-overlay" : d ? "timed-dialog-overlay" : "email-dialog-overlay");
        g = document.getElementById("shadowOverlay");
        C = document.getElementById("repeat-email");
        f = document.getElementById("user-email");
        p = document.getElementById("timed-email");
        E = document.getElementById("buyer-confirm-terms");
        o = document.getElementById("recipient-email");
        N = document.getElementById("buyer-email");
        K = document.getElementById("repeat-buyer");
        p = document.getElementById("timed-email");
        s = document.getElementById("repeat-timed-email");
        a = document.getElementById("timed-confirm-terms");
        j = document.getElementById("timed-logout-notice");
        c = h ? o : d ? p : f;
        v = Q;
        n = O;
        M = -1;
        vim.screens["game-screen"].disableKeys();
        g.style.visibility = "visible";
        b.bind("#confirm-email-button", "click", L);
        b.bind("#confirm-gift-button", "click", u);
        b.bind("#confirm-timed-button", "click", F);
        window.addEventListener("keypress", D, false);
        window.addEventListener("keydown", r, false);
        if (h) {
            o.value = "";
            N.value = "";
            K.value = ""
        } else {
            if (d) {
                p.value = "";
                s.value = "";
                a.checked = "";
                j.checked = ""
            } else {
                f.value = "";
                C.value = "";
                E.checked = ""
            }
        }
        w.style.display = "block"
    }

    function m() {
        vim.screens["game-screen"].enableKeys();
        b.unbind("#confirm-email-button", "click", L);
        b.unbind("#confirm-gift-button", "click", u);
        b.unbind("#confirm-timed-button", "click", F);
        window.removeEventListener("keypress", D, false);
        window.removeEventListener("keydown", r, false)
    }

    function G() {
        return vim.emailaddr && vim.emailaddr.length > 0
    }

    function e(Q, O, P, R) {
        i(Q, O, P, R);
        B.style.visibility = "visible";
        c.focus();
        return false
    }
    return {
        hasEmailAddress: G,
        confirmEmailAddress: e
    }
})();
vim.stats = (function () {
    var m = 1,
        q = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        e = false;

    function p(w) {
        var u = w / 1000,
            v = Math.floor(u % 60),
            t = Math.min(Math.floor(u / 60), 59);
        if (isNaN(w)) {
            return ""
        }
        if (t === 59) {
            v = 59
        }
        if (u < 0) {
            return "00:00"
        }
        return ((t < 10 ? "0" + t : t) + ":" + (v < 10 ? "0" + v : v))
    }

    function k() {
        return Math.max(m, vim.model.getLevel())
    }

    function r(t) {
        m = Math.max(k(), t);
        q[t].valid = true;
        q[t].startTime = Date.now();
        q[t].keystrokes = 0;
        q[t].deaths = 0
    }

    function n(u) {
        var t = q[u];
        if (t.valid) {
            t.endTime = Date.now();
            t.completionTime = t.endTime - t.startTime;
            if (!t.bestCompletionTime || t.bestCompletionTime > t.completionTime) {
                t.bestCompletionTime = t.completionTime
            }
            if (typeof t.minKeystrokes === "undefined" || t.minKeystrokes > t.keystrokes) {
                t.minKeystrokes = t.keystrokes
            }
            if (typeof t.minDeaths === "undefined" || t.minDeaths > t.deaths) {
                t.minDeaths = t.deaths
            }
        }
    }

    function f(u, t) {
        q[u].keystrokes += t || 1
    }

    function b(t) {
        q[t].deaths += 1
    }

    function d(t) {
        q[t].valid = false
    }

    function g() {
        var t;
        m = 1;
        for (t = 0; t < q.length; ++t) {
            q[t] = {}
        }
    }

    function s() {
        var t;
        for (t = 0; t < q.length; ++t) {
            delete q[t].minGroupCompletionTime;
            delete q[t].minGroupCompletionTimeEmail;
            delete q[t].minGroupKeystrokes;
            delete q[t].minGroupKeystrokesEmail;
            delete q[t].minGroupDeaths;
            delete q[t].minGroupDeathsEmail
        }
    }

    function i(B, u, z) {
        var A = "",
            t = typeof u !== "undefined" && u !== "",
            C = vim.login.isPartOfAGroup() ? " colspan='2'" : "",
            v = t && u === B && B !== "N/A" && B !== "",
            w = B === "No way";
        if (w) {
            return "<td" + C + " class='locked'>No way</td>"
        }
        if (!vim.login.isPartOfAGroup()) {
            A += "<td" + C + ">" + (B || "N/A") + "</td>"
        } else {
            if (v) {
                A += "<td>" + (B || "N/A") + "</td>";
                A += "<td class='record medal'><span class='best'>Best in Group!";
                if (z.indexOf(vim.emailaddr) !== -1) {
                    A += "<BR>" + z.split("|").join("<BR>")
                }
                A += "</span></td>"
            } else {
                A += "<td>" + (B || "N/A") + "</td>";
                if (t) {
                    A += "<td>";
                    A += "<span class='group-result record'>";
                    A += "(" + u + ")";
                    A += "<span class='best'>";
                    A += "Best in group: " + u;
                    A += "<BR>" + z.split("|").join("<BR>");
                    A += "</span>";
                    A += "</td>"
                } else {
                    A += "<td>N/A</td>"
                }
            }
        }
        return A
    }

    function j() {
        var E = vim.login.isPartOfAGroup(),
            v = E ? " colspan='2'" : "",
            B = E ? "<th class='spacer'>&nbsp;</th>" : "",
            w = '<tr><th id="level-column">Level</th><th id="keys-column">Keys</th><th' + v + ">Fastest Completion Time</th>" + B + "<th" + v + ">Minimal Number of Keystrokes</th>" + B + "<th" + v + '>Minimal Number of "Deaths"</th></tr>',
            t = [{
                name: "1. Through the Maze",
                keys: "h j k l"
            }, {
                name: "2. The Prophecy",
                keys: "w e b"
            }, {
                name: "3. Into the Darkness",
                keys: "x B"
            }, {
                name: "4. Replacing Bad",
                keys: "r W E"
            }, {
                name: "5. Deleting Your Way",
                keys: "d"
            }, {
                name: "6. Flipping Sides",
                keys: "~ $ 0 ^"
            }, {
                name: "7. Inline Jumpin'",
                keys: "f t , ; g z"
            }, {
                name: "8. Mind the GAP",
                keys: "* # n"
            }, {
                name: "9. Prime Numbers",
                keys: "Digits"
            }, {
                name: "10. Cut n' Paste",
                keys: 'p y " :reg'
            }, {
                name: "11. Input Buffer",
                keys: "c s i a o :b"
            }, {
                name: "12. Bug Bash",
                keys: "( ) { } [ ] ia ."
            }, {
                name: "13. Fill in the Blank",
                keys: "-- unknown --"
            }, {
                name: "14. Lorem Ipsum",
                keys: "H M L | / ? ' ` m u"
            }],
            D = "<table id=\"stat-table\" rules='groups'><thead>" + w,
            C = k(),
            A, z, u;
        D += "</thead><tbody>";
        if (E) {
            D += "<tr id='stats-table-header-end'><th></th><th></th><th class='personal-header'>Personal</th><th class='group-header'>Group</th><th>&nbsp;</th><th class='personal-header'>Personal</th><th class='group-header'>Group</th><th>&nbsp;</th><th class='personal-header'>Personal</th><th class='group-header'>Group</th></tr>";
            D += "</tbody><tbody>"
        }
        for (A = 0; A < t.length; ++A) {
            D += "<tr" + (A + 1 > k() || A + 1 == 13 ? " class='locked' " : "") + (A === 13 ? " id='stats-tbl-last'" : "") + "><td" + (A === 0 ? " id='stat-tbl-first-cell' " : "") + ">" + t[A].name + "</td>";
            D += "<td>" + t[A].keys + "</td>";
            D += i(p(q[A + 1].bestCompletionTime), p(q[A + 1].minGroupCompletionTime), q[A + 1].minGroupCompletionTimeEmail);
            if (E) {
                D += "<td>&nbsp</td>"
            }
            D += i(q[A + 1].minKeystrokes, q[A + 1].minGroupKeystrokes, q[A + 1].minGroupKeystrokesEmail);
            if (E) {
                D += "<td>&nbsp</td>"
            }
            D += i(A + 1 < 8 ? "No way" : q[A + 1].minDeaths, q[A + 1].minGroupDeaths, q[A + 1].minGroupDeathsEmail);
            D += "</tr>"
        }
        D += "</tbody>";
        return D + "</table>"
    }

    function o(u) {
        var t = q[u],
            v = "";
        if (!e) {
            return ""
        }
        if (!t.valid) {
            return "Statistics are measured\nonly when playing from\nthe beginning of the level."
        }
        v += "Time:\t" + p(Date.now() - t.startTime) + "\n";
        v += "Keystrokes:\t" + t.keystrokes;
        if (vim.model.getLevel() >= 8) {
            v += '\n"Deaths":\t' + t.deaths
        }
        return v
    }

    function l(t) {
        e = t
    }

    function h() {
        return e
    }

    function a() {
        var t, u, v = "" + m + "_";
        for (t = 1; t < q.length; ++t) {
            u = q[t];
            v += (typeof u.bestCompletionTime === "undefined" ? "X" : u.bestCompletionTime) + "-";
            v += (typeof u.minKeystrokes === "undefined" ? "X" : u.minKeystrokes) + "-";
            v += (typeof u.minDeaths === "undefined" ? "X" : u.minDeaths) + "-";
            if (t + 1 < q.length) {
                v += "_"
            }
        }
        return v
    }

    function c(B, A) {
        var z, v, w, t, u;
        if (typeof B !== "undefined" && B !== null) {
            g();
            z = B.split("_");
            m = parseInt(z[0], 10);
            for (v = 1; v < z.length; ++v) {
                if (z[v] === "") {
                    continue
                }
                q[v] = q[v] || {};
                w = q[v];
                t = z[v].split("-");
                w.bestCompletionTime = isNaN(parseInt(t[0], 10)) ? undefined : parseInt(t[0], 10);
                w.minKeystrokes = isNaN(parseInt(t[1], 10)) ? undefined : parseInt(t[1], 10);
                w.minDeaths = isNaN(parseInt(t[2], 10)) ? undefined : parseInt(t[2], 10);
                w.valid = false
            }
        }
        if (typeof A !== "undefined" && A !== null) {
            s();
            z = A.split("_");
            for (v = 1; v < z.length; ++v) {
                if (z[v] === "") {
                    continue
                }
                q[v] = q[v] || {};
                w = q[v];
                t = z[v].split("-");
                u = t[0].split(":");
                w.minGroupCompletionTime = isNaN(parseInt(u[0], 10)) ? undefined : parseInt(u[0], 10);
                w.minGroupCompletionTimeEmail = u[1];
                u = t[1].split(":");
                w.minGroupKeystrokes = isNaN(parseInt(u[0], 10)) ? undefined : parseInt(u[0], 10);
                w.minGroupKeystrokesEmail = u[1];
                u = t[2].split(":");
                w.minGroupDeaths = isNaN(parseInt(u[0], 10)) ? undefined : parseInt(u[0], 10);
                w.minGroupDeathsEmail = u[1]
            }
        }
    }
    return {
        getHighestLevel: k,
        startLevel: r,
        endLevel: n,
        incKeystrokes: f,
        incDeaths: b,
        invalidateLevelStats: d,
        resetAllStats: g,
        getUserStatisticsTable: j,
        getStatisticsStr: o,
        isVisible: h,
        setVisible: l,
        marshal: a,
        unmarshal: c
    }
})();
vim.login = (function () {
    var p = vim.dom,
        aj = p.$,
        N = vim.game,
        b = vim.audio,
        j = aj("#login-email")[0],
        am = aj("#login-password")[0],
        ah = -1,
        aA = aj("#login-form")[0],
        q = aj("#login-message-tab")[0],
        C = aj("#signup-email")[0],
        F = aj("#signup-password")[0],
        aB = aj("#signup-password-retyped")[0],
        at = -1,
        ar = aj("#signup-form")[0],
        ad = aj("#signup-message-tab")[0],
        i, m, K = aj("#forgot-password-email")[0],
        P = -1,
        G = aj("#forgot-password-form")[0],
        z = aj("#forgot-password-message-tab")[0],
        n, al = -1,
        ac = document.getElementById("expired-user-email"),
        B = document.getElementById("activated-on");

    function ae(aF, aH, aI) {
        var aG = aH.indexOf("<BR>") === -1 ? 3000 : 6000;
        O(true);
        aj("#login-message")[0].className = aF;
        aj("#login-message")[0].innerHTML = aH;
        aA.style.display = "none";
        q.style.display = "table";
        aI = aI || O;
        if (aF !== "processing") {
            ah = window.setTimeout(aI, aG)
        }
    }

    function az(aF) {
        ae("error", aF)
    }

    function Z(aF) {
        ae("processing", aF)
    }

    function w(aF, aG) {
        ae("ok", aF, aG)
    }

    function o(aF) {
        if (aF && aF.preventDefault) {
            aF.preventDefault()
        } else {
            if (window.event && window.event.returnValue) {
                window.eventReturnValue = false
            }
        }
    }

    function S(aF) {
        if (aF.keyCode === 27) {
            v();
            return
        }
        if (aF.keyCode === 13) {
            I()
        }
        if (aF.keyCode === 32) {
            o(aF)
        }
    }

    function I() {
        var aG = j.value.trim(),
            aF = am.value.trim();
        b.play("menu_click");
        if (aG === "") {
            i = j;
            az("Email address can't be empty.");
            return
        }
        if (aG.indexOf("@") === -1) {
            i = j;
            az("Email address missing @ sign.");
            return
        }
        if (aG.indexOf(".", aG.indexOf("@")) === -1) {
            i = j;
            az("Email address appears to be invalid. Please recheck.");
            return
        }
        if (aF === "") {
            i = am;
            az("Password can't be empty.");
            return
        }
        vim.fetcher.getUrl("php/login.php", W, Q, aG, aF, "Logging in ...", Z)
    }

    function Q(aF) {
        az(aF.responseText)
    }

    function D(aF) {
        W(aF, false, true)
    }

    function W(aG, aH, aF, aN) {
        var aI = vim.screens["game-screen"],
            aM = Modernizr.localstorage && window.localStorage["VIM Adventures email"],
            aJ = (aj("#login-remember-me")[0].checked || aM) && !aF && !aH && aG.getResponseHeader("X-Time-Left") === null,
            aK = aH ? "\n" : "<BR>",
            aL = "";
        if (aG.getResponseHeader("X-Time-Left") !== null) {
            aL = aK + "Note that you have to successfully logout to pause the timer.";
            if (aj("#login-remember-me")[0].checked) {
                aL += aK + "'Remember me on this machine' option was disabled."
            }
        }
        if (aH) {
            vim.emailaddr = aC.mail;
            vim.password = aC.pswd
        } else {
            if (aF) {
                vim.emailaddr = C.value.trim();
                vim.password = F.value.trim()
            } else {
                if (aN) {} else {
                    vim.emailaddr = j.value.trim();
                    vim.password = am.value.trim()
                }
            }
        }
        vim.token = aG.getResponseHeader("X-Token");
        vim.enforceHjkl = !!aG.getResponseHeader("X-Enforce-hjkl");
        vim.stats.unmarshal(aN ? undefined : aG.getResponseHeader("X-Stats"), aG.getResponseHeader("X-Group-Stats"));
        if (!aN && vim.buffers.getCurrentBuffer().name === "ground" && vim.model.getCursorX() === 103 && vim.model.getCursorY() === 117 && vim.model.getLevel() === 1) {
            vim.stats.startLevel(1)
        }
        vim.groupName = aG.getResponseHeader("X-Group-Name");
        if (aG.getResponseHeader("X-Time-Left") !== null) {
            vim.expirationTime = Date.now() + parseInt(aG.getResponseHeader("X-Time-Left"), 10) * 1000
        } else {
            vim.expirationTime = ""
        }
        if (Modernizr.localstorage) {
            window.localStorage["VIM Adventures email"] = aJ ? vim.emailaddr : "";
            window.localStorage["VIM Adventures password"] = aJ ? vim.password : "";
            window.localStorage["VIM Adventures token"] = aJ ? vim.token : "";
            window.localStorage["VIM Adventures stats"] = aJ ? vim.stats.marshal() : "";
            window.localStorage["VIM Adventures expiration time"] = aJ ? vim.expirationTime : ""
        }
        vim.isLicensed = true;
        vim.terms = aG.status !== 202;
        vim.groupAdmin = aG.getResponseHeader("X-Group-Admin") !== null;
        k();
        if (aH) {
            aI.setColonCommand("Logged in successfully" + aL);
            if (!vim.terms) {
                aI.openNewTermsDialog(undefined, "Logged in successfully" + aL)
            }
        } else {
            if (aF) {
                l("Password set, and user logged in successfully" + aL, aG.status === 202 ? u : aq)
            } else {
                if (aN) {} else {
                    w("Logged in successfully" + aL, aG.status === 202 ? V : v)
                }
            }
        }
        aI.adjustUserMenu();
        aI.adjustStatsMenu();
        aI.adjustTermsMenu();
        aI.hideToBeContinuedMessage()
    }

    function O(aF) {
        if (ah !== -1) {
            window.clearTimeout(ah);
            ah = -1
        }
        if (!aF) {
            aA.style.display = "block";
            q.style.display = "none";
            an()
        }
    }

    function an() {
        if (i) {
            i.focus();
            i = undefined
        } else {
            if (j.value.trim() === "") {
                j.focus()
            } else {
                am.focus()
            }
        }
    }

    function r(aI) {
        var aG = !Modernizr.localstorage ? "" : window.localStorage["VIM Adventures email"] || "",
            aF = vim.emailaddr && vim.emailaddr.trim() !== "" ? vim.emailaddr.trim() : "",
            aH = !Modernizr.localstorage ? "" : window.localStorage["VIM Adventures password"] || "";
        vim.input.disableKeys();
        if (aI) {
            j.value = aI.trim();
            am.value = ""
        } else {
            if (j.value.trim() === "") {
                j.value = aF || aG
            }
            if (am.value.trim() === "") {
                am.value = aH
            }
        }
        aj("#login-remember-me")[0].checked = !aI && !!aG;
        if (!Modernizr.localstorage) {
            aj("#login-remember-me-row")[0].style.visibility = "hidden"
        }
        aj("#shadowOverlay")[0].style.visibility = "visible";
        O(false);
        aj("#login-dialog-overlay")[0].style.display = "block";
        an();
        window.addEventListener("keydown", S, false);
        p.bind("#login-button", "click", I);
        p.bind("#no-password-yet-link", "click", t);
        p.bind("#forgot-password-link", "click", ao)
    }

    function v(aG, aF) {
        O(false);
        window.removeEventListener("keydown", S, false);
        p.unbind("#login-button", "click", I);
        aj("#login-dialog-overlay")[0].style.display = "none";
        if (typeof aG !== "boolean" || aG === true) {
            aj("#shadowOverlay")[0].style.visibility = "hidden"
        }
        vim.input.enableKeys();
        if (typeof aF === "boolean" && aF === true) {
            vim.screens["game-screen"].openNewTermsDialog(undefined, "")
        }
    }

    function V() {
        v(false, true)
    }

    function t() {
        v(false);
        C.value = j.value;
        ap()
    }

    function ao() {
        v(false);
        C.value = j.value;
        M()
    }

    function af(aF, aH, aI) {
        var aG = aH.indexOf("<BR>") === -1 ? 3000 : 6000;
        av(true);
        aj("#signup-message")[0].className = aF;
        aj("#signup-message")[0].innerHTML = aH;
        ar.style.display = "none";
        ad.style.display = "table";
        aI = aI || av;
        if (aF !== "processing") {
            ah = window.setTimeout(aI, aG)
        }
    }

    function s(aF) {
        af("error", aF)
    }

    function d(aF) {
        af("processing", aF)
    }

    function l(aF, aG) {
        af("ok", aF, aG)
    }

    function H(aF) {
        if (aF.keyCode === 27) {
            vim.newAccount = false;
            aq();
            return
        }
        if (aF.keyCode === 13) {
            aD()
        }
        if (aF.keyCode === 32) {
            o(aF)
        }
    }

    function aD() {
        var aH = C.value.trim(),
            aG = F.value.trim(),
            aF = aB.value.trim();
        b.play("menu_click");
        if (aH === "") {
            m = C;
            s("Email address can't be empty.");
            return
        }
        if (aH.indexOf("@") === -1) {
            m = C;
            s("Email address missing @ sign.");
            return
        }
        if (aH.indexOf(".", aH.indexOf("@")) === -1) {
            m = C;
            s("Email address appears to be invalid. Please recheck.");
            return
        }
        if (aG === "") {
            m = F;
            s("Password can't be empty.");
            return
        }
        if (aF !== aG) {
            m = F;
            s("Password and re-entered password aren't the same");
            return
        }
        vim.fetcher.getUrl("php/signup.php", D, a, aH, aG, "Storing password ...", d)
    }

    function a(aF) {
        s(aF.responseText)
    }

    function av(aF) {
        if (ah !== -1) {
            window.clearTimeout(ah);
            ah = -1
        }
        if (!aF) {
            ar.style.display = "block";
            ad.style.display = "none";
            aa()
        }
    }

    function aa() {
        if (m) {
            m.focus();
            m = undefined
        } else {
            if (C.value.trim() === "") {
                C.focus()
            } else {
                if (F.value.trim() === "") {
                    F.focus()
                } else {
                    if (aB.value.trim() === "") {
                        aB.focus()
                    } else {
                        F.focus()
                    }
                }
            }
        }
    }

    function ap(aF) {
        vim.input.disableKeys();
        aj("#shadowOverlay")[0].style.visibility = "visible";
        av(false);
        aj("#signup-dialog-overlay")[0].style.display = "block";
        aa();
        window.addEventListener("keydown", H, false);
        p.bind("#signup-button", "click", aD);
        p.bind("#signup-already-done-link", "click", function () {
            U();
            j.value = C.value;
            if (j.value) {
                am.focus()
            }
        });
        if (typeof aF !== "undefined") {
            C.value = aF;
            F.focus()
        }
    }

    function aq(aG, aF) {
        av(false);
        window.removeEventListener("keydown", H, false);
        p.unbind("#signup-button", "click", aD);
        aj("#signup-dialog-overlay")[0].style.display = "none";
        if (typeof aG !== "boolean" || aG === true) {
            aj("#shadowOverlay")[0].style.visibility = "hidden";
            if (vim.newAccount) {
                vim.newAccount = false;
                vim.screens["game-screen"].setColonCommand("You can use the command ':e before_darkness' (without quotes) to skip ahead to level 3 near the chest in the maze.")
            }
        }
        vim.input.enableKeys();
        if (typeof aF === "boolean" && aF === true) {
            vim.screens["game-screen"].openNewTermsDialog(undefined, "")
        }
    }

    function u() {
        aq(false, true)
    }

    function U() {
        aq(false);
        ax(false);
        r()
    }

    function E(aF, aG, aH) {
        aE(true);
        aj("#forgot-password-message")[0].className = aF;
        aj("#forgot-password-message")[0].innerHTML = aG;
        G.style.display = "none";
        z.style.display = "table";
        aH = aH || aE;
        if (aF !== "processing") {
            P = window.setTimeout(aH, 3000)
        }
    }

    function ag(aF) {
        E("error", aF)
    }

    function A(aF) {
        E("processing", aF)
    }

    function ak(aF, aG) {
        E("ok", aF, aG)
    }

    function au(aF) {
        if (aF.keyCode === 27) {
            ax();
            return
        }
        if (aF.keyCode === 13) {
            c()
        }
        if (aF.keyCode === 32) {
            o(aF)
        }
    }

    function c() {
        var aF = K.value.trim();
        b.play("menu_click");
        if (aF === "") {
            i = K;
            ag("Email address can't be empty.");
            return
        }
        if (aF.indexOf("@") === -1) {
            i = K;
            ag("Email address missing @ sign.");
            return
        }
        if (aF.indexOf(".", aF.indexOf("@")) === -1) {
            i = K;
            ag("Email address appears to be invalid. Please recheck.");
            return
        }
        vim.fetcher.getUrl("php/sendResetMail.php", g, Y, aF, "123456", "Sending Password Reset Email ...", A)
    }

    function Y(aF) {
        ag(aF.responseText)
    }

    function g(aF) {
        ak(aF.responseText, ax)
    }

    function aE(aF) {
        if (P !== -1) {
            window.clearTimeout(P);
            P = -1
        }
        if (!aF) {
            G.style.display = "block";
            z.style.display = "none";
            ab()
        }
    }

    function ab() {
        if (n) {
            n.focus();
            n = undefined
        } else {
            K.focus()
        }
    }

    function M() {
        var aG = !Modernizr.localstorage ? "" : window.localStorage["VIM Adventures email"] || "",
            aF = vim.emailaddr && vim.emailaddr.trim() !== "" ? vim.emailaddr.trim() : "";
        vim.input.disableKeys();
        if (j.value.trim() === "") {
            j.value = aF || aG
        } else {
            K.value = j.value.trim()
        }
        aj("#shadowOverlay")[0].style.visibility = "visible";
        aE(false);
        aj("#forgot-password-dialog-overlay")[0].style.display = "block";
        ab();
        window.addEventListener("keydown", au, false);
        p.bind("#forgot-password-button", "click", c);
        p.bind("#remembered-password-link", "click", U)
    }

    function ax(aF) {
        aE(false);
        window.removeEventListener("keydown", au, false);
        p.unbind("#forgot-password-button", "click", c);
        aj("#forgot-password-dialog-overlay")[0].style.display = "none";
        if (typeof aF !== "boolean" || aF === true) {
            aj("#shadowOverlay")[0].style.visibility = "hidden"
        }
        vim.input.enableKeys()
    }

    function e(aF, aJ, aH, aI, aG) {
        vim.expiredEmail = aI || undefined;
        vim.emailaddr = undefined;
        vim.password = undefined;
        vim.token = undefined;
        vim.groupName = undefined;
        if (Modernizr.localstorage) {
            window.localStorage["VIM Adventures state"] = "";
            window.localStorage["VIM Adventures password"] = "";
            window.localStorage["VIM Adventures email"] = "";
            window.localStorage["VIM Adventures token"] = "";
            window.localStorage["VIM Adventures stats"] = ""
        }
        j.value = "";
        am.value = "";
        C.value = "";
        F.value = "";
        aB.value = "";
        K.value = "";
        aj("#login-remember-me")[0].checked = false;
        vim.isLicensed = false;
        vim.stats.resetAllStats();
        vim.groupAdmin = false;
        vim.gamestate.restartGame(true);
        vim.terms = true;
        vim.screens["game-screen"].adjustUserMenu();
        vim.screens["game-screen"].adjustStatsMenu();
        vim.screens["game-screen"].adjustTermsMenu();
        vim.expirationTime = "";
        if (al !== -1) {
            window.clearInterval(al);
            al = -1
        }
        if (aJ) {
            vim.screens["game-screen"].doubleLogin()
        } else {
            if (aH) {
                ac.innerHTML = vim.expiredEmail || "Unknown user";
                B.innerHTML = aG ? "<BR>License activated on " + aG : "";
                v(true);
                vim.screens["game-screen"].licenseExpired()
            } else {
                vim.screens["game-screen"].setColonCommand("Successfully logged out.")
            }
        }
    }

    function aw() {
        return (vim.emailaddr && vim.emailaddr.trim() !== "" && vim.password && vim.password.trim() !== "")
    }

    function ay() {
        return aw() && vim.terms === false
    }

    function T() {
        if (!aw()) {
            return
        }
        vim.fetcher.getUrl("php/login.php", f, R, vim.emailaddr.trim(), vim.password.trim(), undefined, undefined)
    }

    function R(aF) {
        if (aF.status === 403) {
            e(aF, true)
        } else {
            if (aF.status === 402) {
                e(aF, false, true, vim.emailaddr)
            } else {}
        }
    }

    function f(aF) {
        return W(aF, false, false, true)
    }

    function aC(aI, aH) {
        var aG = aI.trim(),
            aF = aH.trim();
        aC.mail = aG;
        aC.pswd = aF;
        if (aG === "") {
            vim.screens["game-screen"].setColonCommand("Email address can't be empty.");
            return
        }
        if (aG.indexOf("@") === -1) {
            vim.screens["game-screen"].setColonCommand("Email address missing @ sign.");
            return
        }
        if (aG.indexOf(".", aG.indexOf("@")) === -1) {
            vim.screens["game-screen"].setColonCommand("Email address appears to be invalid. Please recheck.");
            return
        }
        if (aF === "") {
            vim.screens["game-screen"].setColonCommand("Password can't be empty.");
            return
        }
        vim.screens["game-screen"].setColonCommand("Logging in...");
        vim.fetcher.getUrl("php/login.php", h, ai, aG, aF, undefined, undefined)
    }

    function ai(aF) {
        vim.screens["game-screen"].setColonCommand(aF.responseText)
    }

    function h(aF) {
        return W(aF, true)
    }

    function J() {
        return typeof vim.groupName !== "undefined" && vim.groupName !== null
    }

    function L() {
        return vim.groupName
    }

    function X(aJ, aG, aI, aH, aF) {
        if (aJ || aG) {
            if (aI) {
                vim.fetcher.getUrl("php/logout.php", function () {}, function () {}, vim.emailaddr.trim(), vim.password.trim(), undefined, undefined)
            }
            return e(undefined, aJ, aG, aH, aF)
        }
        if (!aw()) {
            return
        }
        vim.screens["game-screen"].setColonCommand("Logging out...");
        vim.fetcher.getUrl("php/logout.php", e, ai, vim.emailaddr.trim(), vim.password.trim(), undefined, undefined)
    }

    function k() {
        if (al === -1) {
            al = window.setInterval(vim.login.revalidateLogin, 30000)
        }
    }
    return {
        isUserLoggedIn: aw,
        isPartOfAGroup: J,
        getGroupName: L,
        shouldUserConfirmTerms: ay,
        askForLoginInfo: r,
        fastLoginSubmit: aC,
        choosePassword: ap,
        askForResetPasswordInfo: M,
        logout: X,
        revalidateLogin: T,
        scheduleLoginRevalidation: k
    }
})();
var Entity = function (a, c, b) {
    this.x = a;
    this.y = c;
    this.imageName = b;
    this.xOffset = 0;
    this.yOffset = 0;
    this.valid = true;
    this.blocking = false;
    this.invisible = false;
    this.name = ""
};
Entity.prototype.getData = function () {
    return {
        x: this.x,
        y: this.y,
        xOffset: this.xOffset,
        yOffset: this.yOffset,
        valid: this.valid,
        blocking: this.blocking,
        invisible: this.invisible,
        name: this.name,
        imageName: this.imageName
    }
};
Entity.prototype.restore = function (a) {
    this.x = a.x;
    this.y = a.y;
    this.xOffset = a.xOffset || 0;
    this.yOffset = a.yOffset || 0;
    this.valid = a.valid === true;
    this.blocking = a.blocking === true;
    this.invisible = a.invisible === true;
    this.name = a.name;
    this.imageName = a.imageName
};
Entity.prototype.setName = function (a) {
    this.name = a
};
Entity.prototype.getName = function () {
    return this.name ? this.name : ""
};
Entity.prototype.getX = function () {
    return this.x
};
Entity.prototype.getY = function () {
    return this.y
};
Entity.prototype.getXOffset = function () {
    return this.xOffset
};
Entity.prototype.getYOffset = function () {
    return this.yOffset
};
Entity.prototype.getImageName = function () {
    return this.imageName
};
Entity.prototype.setImageName = function (a) {
    this.imageName = a
};
Entity.prototype.isInvisible = function () {
    return this.invisible
};
Entity.prototype.setInvisible = function (a) {
    this.invisible = a
};
Entity.prototype.isValid = function () {
    return this.valid
};
Entity.prototype.invalidate = function () {
    var b = vim.model.getCell(this.x, this.y).entitiesList,
        a = b.length;
    this.valid = false;
    while (a--) {
        if (this === b[a]) {
            b.splice(a, 1)
        }
    }
};
Entity.prototype.isBlocking = function () {
    return this.blocking
};
Entity.prototype.setBlocking = function (a) {
    this.blocking = a
};
Entity.prototype.setX = function (a) {
    this.x = a
};
Entity.prototype.setY = function (a) {
    this.y = a
};
Entity.prototype.setXOffset = function (a) {
    this.xOffset = a
};
Entity.prototype.setYOffset = function (a) {
    this.yOffset = a
};
Entity.prototype.setOffsets = function (a, b) {
    this.xOffset = a;
    this.yOffset = b
};
Entity.prototype.collide = function () {};
Entity.prototype.newFutureInvalidateCallback = function () {
    var a = this;
    return function () {
        a.invalidate();
        a.futureInvalidateTimeoutId = -1
    }
};
Entity.prototype.clear = function () {
    if (typeof this.movePattern !== "undefined") {
        this.movePattern.stop()
    }
    if (typeof this.futureInvalidateTimeoutId !== "undefined" && this.futureInvalidateTimeoutId !== -1) {
        window.clearTimeout(this.futureInvalidateTimeoutId);
        this.futureInvalidateTimeoutId = -1
    }
};
var Movement = function (b, a) {
    this.entity = b;
    this.interval = a;
    this.intervalId = -1;
    this.moveCallback = this.newMoveCallback()
};
Movement.prototype.newMoveCallback = function () {
    var a = this;
    return function () {
        return a.move()
    }
};
Movement.prototype.move = function () {};
Movement.prototype.stop = function () {
    if (this.intervalId !== -1) {
        window.clearInterval(this.intervalId);
        this.intervalId = -1
    }
};
var InCellRandomMovement = function (b, a, e, c, d) {
    Movement.call(this, b, a);
    this.minOffset = e;
    this.maxOffset = c;
    this.stride = d;
    this.intervalId = window.setInterval(this.moveCallback, this.interval)
};
InCellRandomMovement.prototype = Object.create(Movement.prototype);
InCellRandomMovement.prototype.move = function () {
    var b, a, c;
    if (Cursor.getX() === this.entity.getX() && Cursor.getY() === this.entity.getY()) {
        return
    }
    b = Math.floor(Math.random() * 9) + 1;
    a = this.entity.getXOffset();
    c = this.entity.getYOffset();
    a = a + (b % 3 === 1 ? -this.stride : 0);
    a = a + (b % 3 === 0 ? this.stride : 0);
    c = c + (b < 4 ? -this.stride : 0);
    c = c + (b > 6 ? this.stride : 0);
    a = Math.max(a, this.minOffset);
    a = Math.min(a, this.maxOffset);
    c = Math.max(c, this.minOffset);
    c = Math.min(c, this.maxOffset);
    this.entity.setOffsets(a, c)
};
var ObjectBounceMovement = function (a, b, d, c) {
    Movement.call(this, a, 33);
    this.upLimit = d;
    this.downLimit = b;
    this.step = c;
    this.moveOffset = b;
    this.initialYOffset = a.getYOffset();
    this.intervalId = window.setInterval(this.moveCallback, this.interval)
};
ObjectBounceMovement.prototype = Object.create(Movement.prototype);
ObjectBounceMovement.prototype.move = function () {
    this.entity.setYOffset(this.initialYOffset - this.moveOffset);
    this.moveOffset += this.step;
    if (this.upLimit <= this.moveOffset || this.downLimit >= this.moveOffset) {
        this.step *= -1
    }
};
var ObjectCollectedMovement = function (a) {
    Movement.call(this, a, 33);
    this.upLimit = 100;
    this.step = a.collectStep || 5;
    this.intervalId = window.setInterval(this.moveCallback, this.interval)
};
ObjectCollectedMovement.prototype = Object.create(Movement.prototype);
ObjectCollectedMovement.prototype.move = function () {
    var a = this.entity.getYOffset();
    this.entity.setYOffset(a - this.step);
    this.upLimit = this.upLimit - this.step;
    if (this.upLimit <= 0) {
        this.stop();
        this.entity.invalidate()
    }
};
var DoorOpeningMovement = function (a) {
    Movement.call(this, a, 33);
    this.downLimit = 50;
    this.step = 5;
    this.intervalId = window.setInterval(this.moveCallback, this.interval)
};
DoorOpeningMovement.prototype = Object.create(Movement.prototype);
DoorOpeningMovement.prototype.move = function () {
    var a = this.entity.getYOffset();
    this.entity.setYOffset(a + this.step);
    this.downLimit = this.downLimit - this.step;
    if (this.downLimit <= 0) {
        window.clearInterval(this.intervalId);
        this.entity.invalidate()
    }
};
var CursorNPCBlinkMovement = function (b, c) {
    var a = this;
    Movement.call(this, b, c);
    this.setupTimeoutId = window.setTimeout(function () {
        a.intervalId = window.setInterval(a.moveCallback, a.interval);
        a.setupTimeoutId = -1
    }, Math.floor(Math.random() * 400))
};
CursorNPCBlinkMovement.prototype = Object.create(Movement.prototype);
CursorNPCBlinkMovement.prototype.move = function () {
    this.entity.toggleBlink()
};
CursorNPCBlinkMovement.prototype.stop = function () {
    Movement.prototype.stop.call(this);
    if (this.setupTimeoutId !== -1) {
        window.clearTimeout(this.setupTimeoutId);
        this.setupTimeoutId = -1
    }
};
var CollectableObject = function (a, c, b) {
    Entity.call(this, a, c, b);
    this.collected = false
};
CollectableObject.prototype = Object.create(Entity.prototype);
CollectableObject.prototype.getData = function () {
    var a = Entity.prototype.getData.call(this);
    a.collected = this.collected;
    return a
};
CollectableObject.prototype.restore = function (a) {
    Entity.prototype.restore.call(this, a);
    this.collected = a.collected;
    if (a.collected && this.movePattern) {
        this.movePattern.stop()
    }
};
CollectableObject.prototype.collide = function () {
    if (!this.collected) {
        if (this.movePattern) {
            this.movePattern.stop()
        }
        this.collect();
        this.movePattern = new ObjectCollectedMovement(this)
    }
};
CollectableObject.prototype.collect = function () {};
var PlusMinus = function (a, c, b) {
    CollectableObject.call(this, a, c, "none");
    this.changes = b
};
PlusMinus.prototype = Object.create(CollectableObject.prototype);
PlusMinus.prototype.getData = function () {
    var a = CollectableObject.prototype.getData.call(this);
    a.type = "plus_minus";
    a.changes = this.changes;
    return a
};
PlusMinus.prototype.restore = function (a) {
    var b = new PlusMinus(a.x, a.y, a.changes);
    CollectableObject.prototype.restore.call(b, a);
    if (typeof b.getImageName() !== "string") {
        b.setImageName("none")
    }
    return b
};
PlusMinus.prototype.collect = function () {
    var c, a, f = vim.buffers.getCurrentBuffer().getEntities(),
        e, d, b = vim.model;
    this.collected = true;
    this.invalidate();
    b.recacheCell(this.x, this.y);
    for (c = 0; c < this.changes.length; c += 1) {
        switch (this.changes[c].action) {
            case "remove":
                a = f.getByName(this.changes[c].name);
                a.invalidate();
                b.recacheCell(a.getX(), a.getY());
                break;
            case "add":
                a = f.createEntity(undefined, undefined, this.changes[c]);
                if (a) {
                    f.add(a);
                    b.recacheCell(a.getX(), a.getY())
                }
                break;
            case "bgChange":
                e = this.changes[c].buffer;
                d = vim.buffers.getBuffer(e).getBoard();
                d.add(this.changes[c].level);
                if (vim.buffers.getCurrentBuffer().getName() === e) {
                    b.clearCellCache()
                }
                break;
            default:
                console.log("Invalid operation in PlusMinus: " + this.changes[c].action)
        }
    }
};
var Key = function (a, c, b) {
    this.color = b;
    CollectableObject.call(this, a, c, this.color + "_key");
    if (b === "small_brown") {
        this.setYOffset(10);
        this.movePattern = new ObjectBounceMovement(this, 0, 11, 1)
    } else {
        this.movePattern = new ObjectBounceMovement(this, 0, 37 / 2, 1)
    }
};
Key.prototype = Object.create(CollectableObject.prototype);
Key.prototype.getData = function () {
    var a = CollectableObject.prototype.getData.call(this);
    a.color = this.color;
    a.type = this.color + "_key";
    return a
};
Key.prototype.restore = function (b) {
    var a = b.color || (b.type === "small_brown_key" ? "small_brown" : "yellow"),
        c = new Key(b.x, b.y, a);
    CollectableObject.prototype.restore.call(c, b);
    if (typeof c.getImageName() !== "string") {
        c.setImageName(c.color + "_key")
    }
    return c
};
Key.prototype.collect = function () {
    this.collected = true;
    vim.audio.play("collect");
    vim.inventory.addKey(this.color)
};
var LightsOn = function (a, b) {
    CollectableObject.call(this, a, b, "none")
};
LightsOn.prototype = Object.create(CollectableObject.prototype);
LightsOn.prototype.getData = function () {
    var a = CollectableObject.prototype.getData.call(this);
    a.type = "lights_on";
    return a
};
LightsOn.prototype.restore = function (a) {
    var b = new LightsOn(a.x, a.y);
    CollectableObject.prototype.restore.call(b, a);
    if (typeof b.getImageName() !== "string") {
        b.setImageName("none")
    }
    return b
};
LightsOn.prototype.collect = function () {
    this.collected = true;
    vim.audio.play("lights_on");
    Game.lightsOnAnimation();
    vim.model.setCandleLightMode(false)
};
var KeyboardKey = function (a, c, b) {
    CollectableObject.call(this, a, c, "keyboard_key");
    this.letter = b;
    this.yOffset = 3
};
KeyboardKey.prototype = Object.create(CollectableObject.prototype);
KeyboardKey.prototype.getData = function () {
    var a = CollectableObject.prototype.getData.call(this);
    a.type = "keyboard_key";
    a.letter = this.letter;
    return a
};
KeyboardKey.prototype.getLetter = function () {
    return this.letter
};
KeyboardKey.prototype.restore = function (a) {
    var b = new KeyboardKey(a.x, a.y, a.letter);
    CollectableObject.prototype.restore.call(b, a);
    if (typeof b.getImageName() !== "string") {
        b.setImageName("keyboard_key")
    }
    return b
};
KeyboardKey.prototype.collect = function () {
    this.collected = true;
    vim.validKeys.add(this.letter);
    vim.screens["game-screen"].showCommandHelp(this.getLetter());
    if (this.letter === "u") {
        Game.setCursorCommandUntilMove("Yay!\nThis also restored all\nmy missing motions!\n\nPowerful stuff!");
        vim.audio.play("tada")
    } else {
        vim.audio.play("new_skill")
    }
    vim.input.disableKeys();
    window.setTimeout(vim.input.enableKeys, this.letter === "w" || this.letter === "u" ? 2000 : 500)
};
var Person = function (a, e, d, c) {
    var b = 37 / 6;
    Entity.call(this, a, e, d);
    this.message = c;
    this.imageName = d;
    this.movePattern = new InCellRandomMovement(this, 200, -b, b, 1)
};
Person.prototype = Object.create(Entity.prototype);
Person.prototype.getData = function () {
    var a = Entity.prototype.getData.call(this);
    a.message = this.message;
    a.imageName = this.imageName;
    a.type = "person";
    return a
};
Person.prototype.restore = function (a) {
    var b = new Person(a.x, a.y, a.imageName, a.message);
    Entity.prototype.restore.call(b, a);
    return b
};
Person.prototype.getMessage = function () {
    return this.message
};
Person.prototype.collide = function () {
    Game.speech(this.getX(), this.getY(), this.getMessage());
    vim.audio.play("yeepee")
};
var Princess = function (a, e, d, c) {
    var b = 37 / 6;
    Entity.call(this, a, e, "princess");
    if (c === 13) {
        c = 14
    }
    this.levelToLoad = c;
    this.message = d;
    this.movePattern = new InCellRandomMovement(this, 200, -b, b, 1);
    this.collideCallback = Princess.prototype.newCollideCallback(a, e, d, c)
};
Princess.prototype = Object.create(Entity.prototype);
Princess.prototype.getData = function () {
    var a = Entity.prototype.getData.call(this);
    a.type = "princess";
    a.message = this.message;
    a.levelToLoad = this.levelToLoad;
    return a
};
Princess.prototype.restore = function (a) {
    var b = new Princess(a.x, a.y, a.message, a.levelToLoad);
    Entity.prototype.restore.call(b, a);
    if (typeof b.getImageName() !== "string") {
        b.setImageName("princess")
    }
    if (b.levelToLoad === 13) {
        b.levelToLoad = 14
    }
    return b
};
Princess.prototype.newCollideCallback = function (a, d, c, b) {
    return function () {
        var g = this,
            f;

        function h(j) {
            var i = j.responseText,
                l, k;
            if (b !== 14) {
                if (i.indexOf("princess_message") > 0) {
                    l = JSON.parse(i);
                    if (l.princess_message) {
                        c = l.princess_message.split("\n")
                    }
                }
                k = (c.join("\n") + "\n\nPress Esc to continue...").split("\n");
                Game.speech(a, d, k);
                vim.dom.bind(window, "keydown", g.newKeydownCallback(i))
            } else {
                Game.level13CutScene(g.newPostCutSceneCallback(g, i))
            }
        }

        function e(i) {
            vim.input.enableKeys();
            alert(i.responseText);
        }

        f = "level=" + b + "&stats=" + encodeURIComponent(vim.stats.marshal());
        vim.fetcher.ajaxRequest("levels/level" + b, h, e, "Loading level " + b, undefined, f, "GET");
        vim.input.disableKeys();
    }
};
Princess.prototype.newPostCutSceneCallback = function (b, a) {
    return function () {
        vim.gamestate.loadLevelFromString(a);
        b.invalidate();
        vim.input.enableKeys();
        vim.stats.startLevel(vim.model.getLevel())
    }
};
Princess.prototype.newKeydownCallback = function (c) {
    var b = this,
        a = c,
        d;
    d = function (g) {
        var f = false;
        if (g.keyCode === 8 || (g.keyCode >= 37 && g.keyCode <= 40)) {
            f = true
        } else {
            if (g.keyCode === 27) {
                vim.dom.unbind(window, "keydown", d);
                Game.princessFlashAnimation(b.newLoadLevelCallback(a));
                f = true
            }
        }
        if (f) {
            vim.input.preventDefault(g);
            return false
        }
        return true
    };
    return d
};
Princess.prototype.collide = function () {
    var e = vim.validKeys,
        b, d, c = [],
        a = "You succeeded in getting this far\nbut some of the skills you'll need\nwere left behind.\n\nReturn when you have collected\nalso ";
    if (this.x === 175 && this.y === 109) {
        b = ["h", "j", "k", "l"]
    } else {
        if ((this.x === 205) & (this.y === 128)) {
            b = ["w", "e", "b"]
        } else {
            if ((this.x === 205) & (this.y === 136)) {
                b = ["x", "B"]
            } else {
                if ((this.x === 189) & (this.y === 151)) {
                    b = ["r", "E", "W"]
                } else {
                    if ((this.x === 186) & (this.y === 196)) {
                        b = ["d"]
                    } else {
                        if ((this.x === 212) & (this.y === 239)) {
                            b = ["~", "$", "0", "^"]
                        } else {
                            if ((this.x === 240) & (this.y === 285)) {
                                b = ["g", "f", "t", ";", ",", "z", "%"]
                            } else {
                                if ((this.x === 224) & (this.y === 378)) {
                                    b = ["*", "#", "n"]
                                } else {
                                    if ((this.x === 220) & (this.y === 440)) {
                                        b = ["1"]
                                    } else {
                                        if ((this.x === 275) & (this.y === 478)) {
                                            b = ["p", '"', "y"]
                                        } else {
                                            if ((this.x === 124) & (this.y === 119)) {
                                                b = ["c", "s", "i", "a", "o"]
                                            } else {
                                                if ((this.x === 188) & (this.y === 184)) {
                                                    b = ["{", "}", "(", ")", "[", "]", "."]
                                                } else {
                                                    alert("Missing to be collected list!");
                                                    return
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    for (d = 0; d < b.length; ++d) {
        if (!e.isValid(b[d])) {
            c.push(b[d])
        }
    }
    if (c.length === 0) {
        vim.stats.endLevel(vim.model.getLevel());
        if (vim.stats.getHighestLevel() < vim.model.getLevel() + 1) {
            vim.stats.startLevel(vim.model.getLevel() + 1);
            vim.stats.invalidateLevelStats(vim.model.getLevel() + 1)
        }
        this.collideCallback()
    } else {
        for (d = 0; d < c.length; ++d) {
            a += "'" + c[d] + "'";
            if (d === c.length - 1) {
                a += "."
            } else {
                if (c.length !== 2) {
                    a += ", "
                }
            }
            if (d === c.length - 2) {
                a += (c.length === 2 ? " " : "") + "and "
            }
        }
        Game.speech(this.x, this.y, a.split("\n"))
    }
};
Princess.prototype.newLoadLevelCallback = function (b) {
    var a = this,
        c = b;
    return function () {
        vim.gamestate.loadLevelFromString(c);
        a.invalidate();
        vim.model.clearCellCache();
        vim.input.enableKeys();
        vim.audio.play("appearance");
        vim.stats.startLevel(vim.model.getLevel())
    }
};
var TimerGirl = function (i, g, d, b, e, h, f, a) {
    var c = 37 / 6;
    Entity.call(this, i, g, "horn_girl");
    this.movePattern = new InCellRandomMovement(this, 200, -c, c, 1);
    this.intervalInSec = d;
    this.startMessage = b;
    this.stillMessage = e;
    this.targetX = h;
    this.targetY = f;
    this.name = a
};
TimerGirl.prototype = Object.create(Entity.prototype);
TimerGirl.prototype.getData = function () {
    var a = Entity.prototype.getData.call(this);
    a.type = "timer_girl";
    a.startMessage = this.startMessage;
    a.stillMessage = this.stillMessage;
    a.targetX = this.targetX;
    a.targetY = this.targetY;
    a.intervalInSec = this.intervalInSec;
    a.name = this.name;
    a.topX = this.topX;
    a.topY = this.topY;
    return a
};
TimerGirl.prototype.restore = function (a) {
    var b = new TimerGirl(a.x, a.y, a.intervalInSec, a.startMessage, a.stillMessage, a.targetX, a.targetY, a.name);
    Entity.prototype.restore.call(b, a);
    if (typeof b.getImageName() !== "string") {
        b.setImageName("horn_girl")
    }
    this.topX = a.topX;
    this.topY = a.topY;
    return b
};
TimerGirl.prototype.collide = function () {
    if (!vim.timer.isActive(this.name)) {
        vim.timer.set(this.intervalInSec, this.name);
        this.topX = vim.model.getTopX();
        this.topY = vim.model.getTopY();
        Game.speech(this.getX(), this.getY(), this.startMessage);
        vim.audio.play("yeepee")
    } else {
        Game.speech(this.getX(), this.getY(), this.stillMessage);
        vim.audio.play("yeepee")
    }
};
TimerGirl.prototype.timerDone = function () {
    vim.audio.play("appearance");
    vim.model.setTopX(this.topX);
    vim.model.setTopY(this.topY);
    Cursor.set(this.targetX, this.targetY);
    vim.model.readjustViewToCursorPosition();
    vim.model.cancelCursorPositionAnimations();
    vim.view.notifyPointCursor()
};
TimerGirl.prototype.clear = function () {
    Entity.prototype.clear.call(this);
    vim.timer.clear(this.name)
};
var StopTimerGirl = function (a, f, c, e, d) {
    var b = 37 / 6;
    Entity.call(this, a, f, "horn_girl");
    this.movePattern = new InCellRandomMovement(this, 200, -b, b, 1);
    this.timerName = c;
    this.stopMessage = e;
    this.moreMessage = d
};
StopTimerGirl.prototype = Object.create(Entity.prototype);
StopTimerGirl.prototype.getData = function () {
    var a = Entity.prototype.getData.call(this);
    a.type = "stop_timer_girl";
    a.stopMessage = this.stopMessage;
    a.moreMessage = this.moreMessage;
    a.timerName = this.timerName;
    return a
};
StopTimerGirl.prototype.restore = function (a) {
    var b = new StopTimerGirl(a.x, a.y, a.timerName, a.stopMessage, a.moreMessage);
    Entity.prototype.restore.call(b, a);
    if (typeof b.getImageName() !== "string") {
        b.setImageName("horn_girl")
    }
    return b
};
StopTimerGirl.prototype.collide = function () {
    if (vim.timer.isActive(this.timerName)) {
        vim.timer.clear(this.timerName);
        Game.speech(this.getX(), this.getY(), this.stopMessage)
    } else {
        Game.speech(this.getX(), this.getY(), this.moreMessage)
    }
    vim.audio.play("yeepee")
};
var CursorNPC = function (a, c, b) {
    Entity.call(this, a, c, undefined);
    this.fillStyle = b.fillStyle || "rgba(130, 130, 0, 0.5)";
    this.blinkRate = b.blinkRate || 400;
    this.movePattern = new CursorNPCBlinkMovement(this, this.blinkRate);
    this.dialog = b.dialog
};
CursorNPC.prototype = Object.create(Entity.prototype);
CursorNPC.prototype.getData = function () {
    var a = Entity.prototype.getData.call(this);
    a.type = "cursor_npc";
    a.fillStyle = this.fillStyle;
    a.blinkRate = this.blinkRate;
    a.dialog = this.dialog;
    a.isCursorIn = true;
    return a
};
CursorNPC.prototype.restore = function (a) {
    var b = new CursorNPC(a.x, a.y, a);
    Entity.prototype.restore.call(b, a);
    if (typeof a.fillStyle !== "undefined") {
        b.fillStyle = a.fillStyle
    }
    if (typeof a.blinkRate !== "undefined" || a.blinkRate !== this.blinkRate) {
        b.blinkRate = a.blinkRate;
        b.movePattern.stop();
        b.movePattern = new CursorNPCBlinkMovement(b, b.blinkRate)
    }
    return b
};
CursorNPC.prototype.collide = function () {
    this.dialogState = "0";
    this.bindInput();
    this.respond(true)
};
CursorNPC.prototype.bindInput = function () {
    vim.input.disableKeys(true);
    vim.dom.bind(window, "keydown", CursorNPC.prototype.keydownCallback);
    vim.dom.bind(window, "keypress", CursorNPC.prototype.keypressCallback);
    Cursor.blink()
};
CursorNPC.prototype.unbindInput = function (a) {
    vim.dom.unbind(window, "keydown", CursorNPC.prototype.keydownCallback);
    vim.dom.unbind(window, "keypress", CursorNPC.prototype.keypressCallback);
    if (a === true) {
        vim.input.enableKeys()
    } else {
        vim.input.disableKeys()
    }
};
CursorNPC.prototype.getCurrentNPC = function () {
    var c = vim.buffers.getCurrentBuffer().getEntities(),
        b = c.list(Cursor.getX(), Cursor.getY()),
        a;
    for (a = 0; a < b.length; a += 1) {
        if (!b[a].isInvisible() && b[a] instanceof CursorNPC) {
            return b[a]
        }
    }
    return undefined
};
CursorNPC.prototype.keypressCallback = function (g) {
    var a = false,
        c = CursorNPC.prototype.getCurrentNPC(),
        d, b, f = g.keyCode || g.charCode;
    if (f === 8 || (f >= 37 && f <= 40)) {
        a = true
    }
    if (f >= 49 && f <= 57) {
        b = f - 49;
        if (c.optionKeys[b]) {
            d = c.dialog[c.dialogState].options[c.optionKeys[b]];
            vim.view.notifySpeech(-1, -1, "");
            CursorNPC.prototype.unbindInput(false);
            if (d.disposable === true) {
                c.dialog[c.dialogState].options.splice(c.optionKeys[b], 1)
            }
            c.dialogState = d["goto"];
            c.onlyOptions = d.onlyOptions;
            vim.screens["game-screen"].setColonCommand("");
            if (c.dialogState === "-1") {
                if (typeof d.byeMsg === "undefined") {
                    Game.setCursorCommand(d.response);
                    c.unbindInput(true)
                } else {
                    Game.setCursorCommandUntilMove(d.response);
                    window.setTimeout(c.newByeMessageCallback(d.byeMsg), 3000)
                }
            } else {
                Game.setCursorCommandUntilMove(d.newResponse || d.response);
                if (d.newResponse) {
                    delete d.newResponse
                }
                window.setTimeout(CursorNPC.prototype.respond, 3000)
            }
        }
    }
    if (a) {
        vim.input.preventDefault(g);
        return false
    }
    return true
};
CursorNPC.prototype.newByeMessageCallback = function (b) {
    var a = this;
    return function () {
        Game.setCursorCommand("", false, -1, -1);
        vim.view.notifySpeech(-1, -1, "");
        Game.speech(a.getX(), a.getY(), b.split("\n"), true, true);
        a.unbindInput(true)
    }
};
CursorNPC.prototype.keydownCallback = function (b) {
    var a = false;
    if (b.keyCode === 8 || (b.keyCode >= 37 && b.keyCode <= 40)) {
        a = true
    } else {
        if (b.keyCode === 27) {
            a = true
        }
    }
    if (a) {
        vim.input.preventDefault(b);
        return false
    }
    return true
};
CursorNPC.prototype.respond = function (d) {
    var g = CursorNPC.prototype.getCurrentNPC(),
        c = "",
        a = g.dialog[g.dialogState],
        b = a,
        f, i, h, e = 0;
    if (!d) {
        g.bindInput()
    }
    vim.view.notifySpeech(-1, -1, "");
    Game.speech(g.getX(), g.getY(), b.newMsg ? b.newMsg.split("\n") : b.msg.split("\n"), true);
    if (b.newMsg) {
        delete b.newMsg
    }
    if (b.fillStyle) {
        g.fillStyle = b.fillStyle
    }
    if (b.blinkRate) {
        g.blinkRate = b.blinkRate
    }
    if (typeof a.options === "undefined" || a.options.length === 0) {
        g.dialogState = a["goto"];
        a = g.dialog[g.dialogState]
    }
    if (typeof a.options === "undefined" || a.options.length === 0) {
        g.dialogState = "0";
        a = g.dialog[g.dialogState]
    }
    g.optionKeys = [];
    for (i in a.options) {
        if (a.options[i].fillStyle && a.options[i].fillStyle !== g.fillStyle) {
            continue
        }
        g.optionKeys.push(i);
        ++e;
        f = a.options[i].newResponse || a.options[i].response;
        c += e + ". " + f.split("\n").join(" ") + "\n"
    }
    vim.screens["game-screen"].setColonCommand(c)
};
CursorNPC.prototype.getFillStyle = function () {
    return this.fillStyle || "rgba(130, 130, 0, 0.5)"
};
CursorNPC.prototype.isCursorNPCOn = function () {
    return (this.isCursorOn || (this.getX() === Cursor.getX() && this.getY() === Cursor.getY()))
};
CursorNPC.prototype.toggleBlink = function () {
    this.isCursorOn = !this.isCursorOn
};
var Door = function (a, c, b) {
    this.color = b || "";
    Entity.call(this, a, c, this.color + (this.color !== "" ? "_" : "") + "closed_door");
    this.setYOffset(3);
    this.setBlocking(true)
};
Door.prototype = Object.create(Entity.prototype);
Door.prototype.getData = function () {
    var a = Entity.prototype.getData.call(this);
    a.type = "door";
    a.blocking = this.isBlocking();
    a.color = this.color;
    return a
};
Door.prototype.restore = function (a) {
    var b = new Door(a.x, a.y, a.color || "");
    Entity.prototype.restore.call(b, a);
    b.setBlocking(a.blocking);
    if (typeof b.getImageName() !== "string") {
        b.setImageName(b.color + (this.color !== "" ? "_" : "") + "closed_door")
    }
    return b
};
Door.prototype.collide = function () {
    var c, b, a;
    a = this.color || "yellow";
    if (this.isBlocking() && vim.inventory.hasKey(a)) {
        vim.inventory.useKey(a);
        this.setBlocking(false);
        this.movePattern = new DoorOpeningMovement(this);
        vim.audio.play("open_door");
        c = vim.buffers.getCurrentBuffer().getEntities().listConnectedRoofs(this.x, this.y);
        for (b = 0; b < c.length; b += 1) {
            c[b].setInvisible(true)
        }
        return true
    } else {
        if (this.isBlocking()) {
            Game.setCursorCommand("I need to find\na " + a + " key to\nunlock this door.", true);
            vim.audio.play("closed_door");
            return true
        }
    }
};
var ClosedChest = function (a, b) {
    Entity.call(this, a, b, "closed_chest");
    this.setBlocking(true);
    this.isClosed = true
};
ClosedChest.prototype = Object.create(Entity.prototype);
ClosedChest.prototype.getData = function () {
    var a = Entity.prototype.getData.call(this);
    a.type = "chest";
    a.blocking = this.isBlocking();
    a.closed = this.isClosed;
    a.imageName = this.isClosed ? "closed_chest" : "open_chest";
    return a
};
ClosedChest.prototype.restore = function (a) {
    var b = new ClosedChest(a.x, a.y);
    Entity.prototype.restore.call(b, a);
    b.setBlocking(a.blocking);
    if (!a.closed) {
        b.setOpened()
    }
    if (typeof b.getImageName() !== "string") {
        b.setImageName(b.isClosed ? "closed_chest" : "open_chest")
    }
    return b
};
ClosedChest.prototype.setOpened = function () {
    this.isClosed = false;
    this.imageName = "open_chest";
    return true
};
ClosedChest.prototype.removeFromChestCallback = function (a) {
    var b = a;
    return function () {
        b.setInvisible(false);
        b.collide();
        vim.model.recacheCell(b.x, b.y)
    }
};
ClosedChest.prototype.collide = function () {
    var f, d, a = 4000,
        b = 800,
        e, c, g = vim.buffers.getCurrentBuffer().getEntities();
    if (this.isClosed && vim.inventory.hasKey("small_brown")) {
        vim.inventory.useKey("small_brown");
        this.isClosed = false;
        e = new CollectableObject(this.x, this.y, "chest_lid");
        g.add(e);
        e.collectStep = 1;
        e.collide();
        vim.model.recacheCell(this.x, this.y);
        this.imageName = "open_chest";
        vim.audio.play("chest_open");
        f = g.list(this.x, this.y);
        for (d = 0; d < f.length; d += 1) {
            if (f[d].isInvisible() && f[d].getImageName().indexOf("roof") === -1) {
                a += b;
                window.setTimeout(this.removeFromChestCallback(f[d]), a)
            }
        }
        return true
    } else {
        if (!this.isClosed) {
            c = false;
            a = -b + 10;
            f = g.list(this.x, this.y);
            for (d = 0; d < f.length; d += 1) {
                if (f[d].isInvisible()) {
                    a += b;
                    window.setTimeout(this.removeFromChestCallback(f[d]), a);
                    c = true
                }
            }
            if (c) {
                return true
            } else {
                vim.audio.play("blocked");
                return false
            }
        } else {
            Game.setCursorCommand("I need to find a\nsmall brown key to\nunlock this chest.", true);
            vim.audio.play("blocked");
            return false
        }
    }
};
var Candle = function (a, b) {
    CollectableObject.call(this, a, b, "candle");
    this.collectStep = 2
};
Candle.prototype = Object.create(CollectableObject.prototype);
Candle.prototype.getData = function () {
    var a = CollectableObject.prototype.getData.call(this);
    a.type = "candle";
    return a
};
Candle.prototype.restore = function (a) {
    var b = new Candle(a.x, a.y);
    CollectableObject.prototype.restore.call(b, a);
    b.setBlocking(a.blocking);
    if (typeof b.getImageName() !== "string") {
        b.setImageName("candle")
    }
    return b
};
Candle.prototype.collect = function () {
    this.collected = true;
    vim.audio.play("collect");
    window.setTimeout(Game.darknessFalls, 1000)
};
var Rock = function (a, b) {
    Entity.call(this, a, b, "rock");
    this.setYOffset(0);
    this.setBlocking(true)
};
Rock.prototype = Object.create(Entity.prototype);
Rock.prototype.getData = function () {
    var a = Entity.prototype.getData.call(this);
    a.type = "rock";
    return a
};
Rock.prototype.restore = function (a) {
    var b = new Rock(a.x, a.y);
    Entity.prototype.restore.call(b, a);
    if (typeof b.getImageName() !== "string") {
        b.setImageName("rock")
    }
    return b
};
var Roof = function (a, c, b) {
    Entity.call(this, a, c, b);
    this.roof_type = b;
    this.setYOffset(b.indexOf("south") !== -1 ? -31 : -32)
};
Roof.prototype = Object.create(Entity.prototype);
Roof.prototype.getData = function () {
    var a = Entity.prototype.getData.call(this);
    a.type = this.roof_type;
    return a
};
Roof.prototype.restore = function (a) {
    var b = new Roof(a.x, a.y, a.type);
    Entity.prototype.restore.call(b, a);
    if (typeof b.getImageName() !== "string") {
        b.setImageName(a.roof_type)
    }
    return b
};
var TallTree = function (a, b) {
    Entity.call(this, a, b, "tall_tree");
    this.setYOffset(-3);
    this.setBlocking(true)
};
TallTree.prototype = Object.create(Entity.prototype);
TallTree.prototype.getData = function () {
    var a = Entity.prototype.getData.call(this);
    a.type = "tall_tree";
    return a
};
TallTree.prototype.restore = function (a) {
    var b = new TallTree(a.x, a.y);
    Entity.prototype.restore.call(b, a);
    if (typeof b.getImageName() !== "string") {
        b.setImageName("tall_tree")
    }
    return b
};
var ShortTree = function (a, b) {
    Entity.call(this, a, b, "short_tree");
    this.setYOffset(-3);
    this.isUgly = false
};
ShortTree.prototype = Object.create(Entity.prototype);
ShortTree.prototype.getData = function () {
    var a = Entity.prototype.getData.call(this);
    a.type = "short_tree";
    a.isUgly = this.isUgly;
    a.imageName = this.isUgly ? "ugly_tree" : "short_tree";
    return a
};
ShortTree.prototype.restore = function (a) {
    var b = new ShortTree(a.x, a.y);
    Entity.prototype.restore.call(b, a);
    if (a.isUgly) {
        b.setUgly()
    }
    if (typeof b.getImageName() !== "string") {
        b.setImageName(b.isUgly ? "ugly_tree" : "short_tree")
    }
    return b
};
ShortTree.prototype.setUgly = function () {
    this.isUgly = true;
    this.imageName = "ugly_tree";
    return true
};
ShortTree.prototype.revealTreeHidingCallback = function (a) {
    var b = a;
    return function () {
        b.setInvisible(false);
        b.collide()
    }
};
ShortTree.prototype.changeToUglyCallback = function () {
    var a = this;
    return function () {
        a.imageName = "ugly_tree"
    }
};
ShortTree.prototype.collide = function () {
    var f, d, a = 400,
        b = 400,
        e, c, g = vim.buffers.getCurrentBuffer().getEntities();
    if (!this.isUgly) {
        this.isUgly = true;
        vim.audio.play("search_tree");
        window.setTimeout(this.changeToUglyCallback(), 800);
        f = g.list(this.x, this.y);
        for (d = 0; d < f.length; d += 1) {
            if (f[d].isInvisible()) {
                a += b;
                window.setTimeout(this.revealTreeHidingCallback(f[d]), a)
            }
        }
        return true
    } else {
        if (this.isUgly) {
            c = false;
            a = -b + 10;
            f = g.list(this.x, this.y);
            for (d = 0; d < f.length; d += 1) {
                if (f[d].isInvisible()) {
                    a += b;
                    window.setTimeout(this.revealTreeHidingCallback(f[d]), a);
                    c = true
                }
            }
            if (c) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
};
var Selector = function (a, b) {
    Entity.call(this, a, b, "selector");
    this.isOff = true;
    this.yOffset = -3;
    this.collideEvenIfInvisible = true
};
Selector.prototype = Object.create(Entity.prototype);
Selector.prototype.getData = function () {
    var a = Entity.prototype.getData.call(this);
    a.type = "selector";
    a.blocking = this.isBlocking();
    a.isOff = this.isOff;
    a.imageName = this.isOff ? "selector" : "selector_on";
    return a
};
Selector.prototype.restore = function (a) {
    var b = new Selector(a.x, a.y);
    Entity.prototype.restore.call(b, a);
    b.setBlocking(a.blocking);
    if (!a.isOff) {
        b.setOn()
    }
    if (typeof b.getImageName() !== "string") {
        b.setImageName(b.isOff ? "selector" : "selector_on")
    }
    return b
};
Selector.prototype.setOn = function () {
    this.isOff = false;
    this.imageName = "selector_on";
    return true
};
Selector.prototype.collide = function () {
    var a = vim.inventory;
    if (this.isInvisible()) {
        this.setInvisible(false);
        vim.view.notifyAppearingSelector(this);
        vim.audio.play("selector_appear");
        return true
    }
    if (this.isOff && a.hasKey("star")) {
        a.useKey("star");
        this.isOff = false;
        this.imageName = "selector_on"
    }
    if (!this.isOff) {
        vim.audio.play("teleport");
        Cursor.restorePositionCallback(515, 562, "sky", false)();
        return true
    } else {
        if (this.isOff && !a.hasKey("star")) {
            Game.setCursorCommand("There seem to be a\nstar missing there.", true);
            return false
        }
    }
    return false
};
var RedBug = function (a, d, c, b) {
    Entity.call(this, a, d, "red_bug_right");
    this.volPattern = c;
    this.volHidden = typeof b === "undefined" ? false : b;
    this.direction = "s";
    this.speed = 2;
    this.duration = 1;
    this.frozen = false
};
RedBug.prototype = Object.create(Entity.prototype);
RedBug.prototype.getData = function () {
    var a = Entity.prototype.getData.call(this);
    a.volPattern = this.volPattern;
    a.volHidden = this.volHidden;
    a.direction = this.direction;
    a.speed = this.speed;
    a.duration = this.duration;
    a.type = "red_bug";
    return a
};
RedBug.prototype.restore = function (a) {
    var b = new RedBug(a.x, a.y, a.volPattern, a.volHidden);
    Entity.prototype.restore.call(b, a);
    b.direction = a.direction || "s";
    b.speed = a.speed || 2;
    b.duration = a.duration || 1;
    return b
};
RedBug.prototype.getVolPattern = function () {
    return this.volPattern
};
RedBug.prototype.isVolHidden = function () {
    return this.volHidden
};
RedBug.prototype.freeze = function () {
    this.frozen = true
};
RedBug.prototype.unfreeze = function () {
    this.frozen = false
};
RedBug.prototype.isFrozen = function () {
    return this.frozen
};
RedBug.prototype.collide = function (b) {
    var a = this.getSafePoint();
    if (b && vim.buffers.getCurrentBuffer().getName() !== b) {
        return
    }
    if (!this.isCollidingWithCursor() || this.inCollision === true) {
        return
    }
    if (Cursor.isWaitingForRestorePosition()) {
        return
    }
    this.inCollision = true;
    this.direction = "s";
    this.duration = this.volPattern.length > 3 ? 2 : 80;
    if (vim.input.isInInputMode()) {
        vim.input.returnToCommandMode(true);
        vim.view.notifyCommandMode();
        vim.screens["game-screen"].showGameMenu()
    }
    vim.input.disableKeys();
    Cursor.stopBlink();
    vim.view.notifyDisappearingCursorAnimation(a.x, a.y, a.bufferName, this, true);
    vim.audio.play("teleport");
    vim.stats.incDeaths(vim.model.getLevel())
};
RedBug.prototype.getSafePoint = function () {
    if (vim.model.getLevel() === 12 && vim.buffers.getCurrentBuffer().getName() === "underground") {
        return {
            x: 106,
            y: 113,
            bufferName: "underground"
        }
    }
    if (vim.model.getLevel() === 14) {
        return {
            x: 123,
            y: 119,
            bufferName: "lorem"
        }
    }
    return {
        x: Cursor.getX(),
        y: Cursor.getY(),
        bufferName: vim.buffers.getCurrentBuffer().getName()
    }
};
RedBug.prototype.isCollidingWithCursor = function () {
    var a = Cursor.getX(),
        e = Cursor.getY(),
        d = false,
        c = 37,
        b = 30;
    d = boxCollision(this.x * c + this.xOffset + 10, this.y * b + this.yOffset - c / 3 + 29 + 5, (this.x + 1) * c + this.xOffset - 10, this.y * b + this.yOffset - c / 3 + 54 - 5, a * c, e * b + (37 / 10) * 5, (a + 1) * c, (e + 1) * b);
    return d
};
RedBug.prototype.isCellUpValid = function (f) {
    var d = vim.model.isValidBugPosition,
        a = this.x,
        g = this.y,
        b = this.xOffset,
        e = this.yOffset,
        c = true;
    c = c && d(a, g - 1, f);
    c = c && (b < 10 || d(a + 1, g - 1, f));
    return c
};
RedBug.prototype.isCellDownValid = function (f) {
    var d = vim.model.isValidBugPosition,
        a = this.x,
        g = this.y,
        b = this.xOffset,
        e = this.yOffset,
        c = true;
    c = c && d(a, g + 1, f);
    c = c && (b < 10 || d(a + 1, g + 1, f));
    return c
};
RedBug.prototype.isCellLeftValid = function (f) {
    var d = vim.model.isValidBugPosition,
        a = this.x,
        g = this.y,
        b = this.xOffset,
        e = this.yOffset,
        c = true;
    c = d(a, g, f) && (d(a - 1, g, f) || d(a + 1, g, f));
    c = c && (b > 10 || d(a - 1, g, f));
    c = c && (e < 5 || d(a - 1, g + 1, f));
    return c
};
RedBug.prototype.isCellRightValid = function (f) {
    var d = vim.model.isValidBugPosition,
        a = this.x,
        g = this.y,
        b = this.xOffset,
        e = this.yOffset,
        c = true;
    c = d(a, g, f) && (d(a - 1, g, f) || d(a + 1, g, f));
    c = c && (b < 10 || d(a + 1, g, f));
    c = c && (e < 5 || d(a + 1, g + 1, f));
    return c
};
RedBug.prototype.update = function (c) {
    var g, d, e = vim.model,
        f = c ? vim.buffers.getBuffer(c) : vim.buffers.getCurrentBuffer(),
        a = f.getEntities(),
        h, i = 37,
        b = 30;
    if (this.frozen) {
        return
    }--this.duration;
    if (this.duration < 1) {
        this.duration = Math.floor(2 * Math.random() * 30);
        this.speed = Math.floor(2 + 5 * Math.random() * (this.volPattern.length > 3 ? 4 : 1));
        h = this.isCellLeftValid(c) || this.xOffset - this.speed >= 0 ? "l" : "";
        h += this.isCellRightValid(c) || this.xOffset + this.speed <= 10 ? "r" : "";
        h += this.isCellUpValid(c) || this.yOffset - this.speed >= 0 ? "u" : "";
        h += this.isCellDownValid(c) || this.yOffset + this.speed <= b - 22 ? "d" : "";
        h += this.direction !== "s" && Math.random() < 0.3 ? "s" : "";
        this.direction = h.charAt(Math.floor(Math.random() * h.length));
        if (this.direction === "l") {
            this.imageName = "red_bug_left"
        } else {
            if (this.direction === "r") {
                this.imageName = "red_bug_right"
            } else {
                if (this.direction === "s" && this.volPattern.length > 3) {
                    this.duration = 2
                }
            }
        }
        return
    }
    g = this.xOffset + (this.direction === "l" || this.direction === "r" ? this.speed * (this.direction === "l" ? -1 : 1) : 0);
    d = this.yOffset + (this.direction === "u" || this.direction === "d" ? this.speed * (this.direction === "u" ? -1 : 1) : 0);
    switch (this.direction) {
        case "u":
            if (d < 0) {
                if (e.isValidBugPosition(this.x, this.y - 1, c) && this.isCellUpValid(c)) {
                    this.yOffset = b + d;
                    this.y = this.y - 1;
                    a.moveEntityFrom(this, this.x, this.y + 1);
                    e.recacheCell(this.x, this.y);
                    e.recacheCell(this.x, this.y + 1)
                } else {
                    this.direction = "s";
                    this.duration = 1
                }
            } else {
                this.yOffset = d
            }
            break;
        case "d":
            if (d > b - 22) {
                if (e.isValidBugPosition(this.x, this.y + 1, c) && this.isCellDownValid(c)) {
                    this.yOffset = d - b;
                    this.y = this.y + 1;
                    a.moveEntityFrom(this, this.x, this.y - 1);
                    e.recacheCell(this.x, this.y);
                    e.recacheCell(this.x, this.y - 1)
                } else {
                    this.direction = "s";
                    this.duration = 1
                }
            } else {
                this.yOffset = d
            }
            break;
        case "l":
            if (g < 0) {
                if (e.isValidBugPosition(this.x - 1, this.y, c) && this.isCellLeftValid(c)) {
                    this.xOffset = i + g;
                    this.x = this.x - 1;
                    a.moveEntityFrom(this, this.x + 1, this.y);
                    e.recacheCell(this.x, this.y);
                    e.recacheCell(this.x + 1, this.y)
                } else {
                    this.direction = "s";
                    this.duration = 1
                }
            } else {
                this.xOffset = g
            }
            break;
        case "r":
            if (g > i) {
                if (e.isValidBugPosition(this.x + 1, this.y, c) && this.isCellRightValid(c)) {
                    this.xOffset = g - i;
                    this.x = this.x + 1;
                    a.moveEntityFrom(this, this.x - 1, this.y);
                    e.recacheCell(this.x, this.y);
                    e.recacheCell(this.x - 1, this.y)
                } else {
                    this.direction = "s";
                    this.duration = 1
                }
            } else {
                if (this.isCellRightValid() || this.xOffset <= 10) {
                    this.xOffset = g
                }
            }
            break
    }
    this.collide(c)
};

function boxCollision(c, h, e, f, a, g, b, d) {
    if (f < g) {
        return false
    }
    if (h > d) {
        return false
    }
    if (e < a) {
        return false
    }
    if (c > b) {
        return false
    }
    return true
}
var BigBug = function (a, c, b) {
    Entity.call(this, a, c, "big_bug_right");
    this.hitpoints = b;
    this.frozen = false;
    this.direction = "s";
    this.speed = 2;
    this.duration = 1
};
BigBug.prototype = Object.create(Entity.prototype);
BigBug.prototype.freeze = function () {
    this.frozen = true
};
BigBug.prototype.unfreeze = function () {
    this.frozen = false
};
BigBug.prototype.getData = function () {
    var a = Entity.prototype.getData.call(this);
    a.hitpoints = this.hitpoints;
    a.direction = this.direction;
    a.speed = this.speed;
    a.duration = this.duration;
    a.type = "big_bug";
    return a
};
BigBug.prototype.restore = function (a) {
    var b = new BigBug(a.x, a.y);
    Entity.prototype.restore.call(b, a);
    b.hitpoints = a.hitpoints;
    b.direction = a.direction || "s";
    b.speed = a.speed || 2;
    b.duration = a.duration || 1;
    return b
};
BigBug.prototype.collide = function (b) {
    var a = this.getSafePoint();
    if (b && vim.buffers.getCurrentBuffer().getName() !== b) {
        return
    }
    if (!this.isCollidingWithCursor() || this.inCollision === true) {
        return
    }
    if (Cursor.isWaitingForRestorePosition()) {
        return
    }
    this.inCollision = true;
    this.direction = "s";
    this.duration = 80;
    this.incHitPoints();
    if (vim.input.isInInputMode()) {
        vim.input.returnToCommandMode(true);
        vim.view.notifyCommandMode();
        vim.screens["game-screen"].showGameMenu()
    }
    vim.input.disableKeys();
    Cursor.stopBlink();
    vim.view.notifyDisappearingCursorAnimation(a.x, a.y, a.bufferName, this, true);
    vim.audio.play("teleport");
    vim.stats.incDeaths(vim.model.getLevel())
};
BigBug.prototype.getSafePoint = function () {
    if (vim.model.getLevel() === 14) {
        return {
            x: 123,
            y: 119,
            bufferName: "lorem"
        }
    }
    return {
        x: Cursor.getX(),
        y: Cursor.getY(),
        bufferName: vim.buffers.getCurrentBuffer().getName()
    }
};
BigBug.prototype.isCollidingWithCursor = function () {
    return this.isCollidingWithPosition(Cursor.getX(), Cursor.getY())
};
BigBug.prototype.isCollidingWithPosition = function (a, e) {
    var d = false,
        c = 37,
        b = 30;
    d = boxCollision(this.x * c + this.xOffset + 10, this.y * b + this.yOffset, (this.x + 5) * c + this.xOffset - 10, (this.y + 4) * b + this.yOffset - 5, a * c, e * b + (37 / 10) * 5, (a + 1) * c, (e + 1) * b);
    return d
};
BigBug.prototype.isBugRangeValid = function (d, a, g) {
    var c = vim.model,
        f = true,
        e, b;
    for (e = 0; e < 4; ++e) {
        for (b = 0; b < 5; ++b) {
            f = f && c.isValidBugPosition(d + b, a + e, g)
        }
    }
    return f
};
BigBug.prototype.isCellUpValid = function (a) {
    return this.isBugRangeValid(this.x, this.y - 1, a)
};
BigBug.prototype.isCellDownValid = function (a) {
    return (this.isBugRangeValid(this.x, this.y + 1, a) && (this.xOffset < 10 || this.isBugRangeValid(this.x, this.y + 1, a)))
};
BigBug.prototype.isCellLeftValid = function (a) {
    return this.isBugRangeValid(this.x - 1, this.y, a)
};
BigBug.prototype.isCellRightValid = function (a) {
    return this.isBugRangeValid(this.x + 1, this.y, a)
};
BigBug.prototype.update = function (m) {
    var e = vim.model,
        g = m ? vim.buffers.getBuffer(m) : vim.buffers.getCurrentBuffer(),
        p = g.getEntities(),
        o = vim.buffers.getCurrentBuffer().getName() !== m,
        h = 37,
        j = 30,
        b, i, d = Cursor.getX(),
        c = Cursor.getY(),
        l = true,
        r = true,
        q = "",
        f = false,
        a = false,
        n = false,
        k = false;
    this.speed = 10;
    if (o) {
        q = this.lastMoveAwayDirection || "lrud".charAt(Math.random() * 4);
        this.lastMoveAwayDirection = q
    } else {
        this.lastMoveAwayDirection = "";
        q += d < this.x + 2 ? "l" : d > this.x + 2 ? "r" : "";
        q += c < this.y + 1 ? "u" : c > this.y + 1 ? "d" : ""
    }
    f = q.indexOf("l") !== -1;
    a = q.indexOf("r") !== -1;
    n = q.indexOf("u") !== -1;
    k = q.indexOf("d") !== -1;
    b = this.xOffset + this.speed * (a ? 1 : f ? -1 : 0);
    i = this.yOffset + this.speed * (k ? 1 : n ? -1 : 0);
    this.imageName = f ? "big_bug_left" : a ? "big_bug_right" : this.imageName;
    if (this.frozen) {
        return
    }
    r = (n && i < 0 && !this.isCellUpValid(m)) || (k && i > j - 22 && !this.isCellDownValid(m));
    l = (f && b < 0 && !this.isCellLeftValid(m)) || (a && b > h - 27 && !this.isCellRightValid(m));
    if (r) {
        this.yOffset = n ? 0 : Math.min(i, j - 5);
        this.lastMoveAwayDirection = ""
    } else {
        if (n && i < 0) {
            this.yOffset = j + i;
            this.y = this.y - 1;
            p.moveEntityFrom(this, this.x, this.y + 1);
            e.recacheCell(this.x, this.y);
            e.recacheCell(this.x, this.y + 1)
        } else {
            if (k && i > j - 22) {
                this.yOffset = i - j;
                this.y = this.y + 1;
                p.moveEntityFrom(this, this.x, this.y - 1);
                e.recacheCell(this.x, this.y);
                e.recacheCell(this.x, this.y - 1)
            } else {
                this.yOffset = i
            }
        }
    }
    if (l) {
        this.xOffset = f ? 0 : h - 27;
        this.lastMoveAwayDirection = ""
    } else {
        if (f && b < 0) {
            this.xOffset = h + b;
            this.x = this.x - 1;
            p.moveEntityFrom(this, this.x + 1, this.y);
            e.recacheCell(this.x, this.y);
            e.recacheCell(this.x + 1, this.y)
        } else {
            if (a && b > h) {
                this.xOffset = b - h;
                this.x = this.x + 1;
                p.moveEntityFrom(this, this.x - 1, this.y);
                e.recacheCell(this.x, this.y);
                e.recacheCell(this.x - 1, this.y)
            } else {
                this.xOffset = b
            }
        }
    }
    this.collide(m)
};
BigBug.prototype.getHitPoints = function () {
    return this.hitpoints
};
BigBug.prototype.decHitPoints = function (a) {
    this.hitpoints = Math.max(0, this.hitpoints - (a || 1))
};
BigBug.prototype.incHitPoints = function (a) {
    this.hitpoints = Math.min(5, this.hitpoints + (a || 1))
};

function Entities() {
    this.entities = [];
    this.visitedList = [];
    this.entity_mapping = {}
}
Entities.prototype.clear = function () {
    var a;
    for (a = 0; a < this.entities.length; a += 1) {
        if (this.entities[a].isValid()) {
            this.entities[a].clear()
        }
    }
    this.entities = [];
    this.entity_mapping = {}
};
Entities.prototype.mappingKey = function (a, b) {
    return a + "," + b
};
Entities.prototype.add = function (a) {
    if (a instanceof CollectableObject && a.collected === true) {
        return
    }
    var b = this.mappingKey(a.getX(), a.getY());
    this.entities.push(a);
    this.entity_mapping[b] = this.entity_mapping[b] || [];
    this.entity_mapping[b].push(a)
};
Entities.prototype.exist = function (a, b) {
    return !!this.entity_mapping[this.mappingKey(a, b)]
};
Entities.prototype.list = function (b, e) {
    var c, d = this.entity_mapping[this.mappingKey(b, e)],
        a = [];
    for (c = 0; d && c < d.length; c += 1) {
        if (d[c].isValid()) {
            a.push(d[c])
        }
    }
    return a
};
Entities.prototype.getDataInRange = function (c, b, f, d) {
    var l, g, e, h = [],
        a;
    for (l = b; l < d + 1; l += 1) {
        for (g = c; g < f + 1; g += 1) {
            if (this.exist(g, l)) {
                a = this.list(g, l) || [];
                for (e in a) {
                    h.push(a[e].getData())
                }
            }
        }
    }
    return h
};
Entities.prototype.exterminateInRange = function (e, b, g, d) {
    var f, c, h = [],
        a;
    for (f = 0; f < this.entities.length; f += 1) {
        a = this.entities[f];
        if (a.getX() >= e && a.getX() <= g && a.getY() >= b && a.getY() <= d && a.isValid()) {
            this.entities[f].clear()
        } else {
            h.push(a)
        }
    }
    for (f = b; f < d + 1; f += 1) {
        for (c = e; c < g + 1; c += 1) {
            this.entity_mapping[this.mappingKey(c, f)] = undefined
        }
    }
    this.entities = h
};
Entities.prototype.deleteAtPosition = function (b, e, d) {
    var a = this.list(b, e),
        c;
    for (c = 0; c < a.length; c += 1) {
        if (d === true && (a[c] instanceof RedBug || a[c] instanceof BigBug)) {
            continue
        }
        a[c].invalidate()
    }
};
Entities.prototype.moveEntityFrom = function (b, g, f) {
    var a = this.list(g, f),
        d, e = [];
    for (d = 0; d < a.length; d += 1) {
        if (a[d] !== b) {
            e.push(a[d])
        }
    }
    this.entity_mapping[this.mappingKey(g, f)] = e;
    var c = this.mappingKey(b.getX(), b.getY());
    this.entity_mapping[c] = this.entity_mapping[c] || [];
    this.entity_mapping[c].push(b)
};
Entities.prototype.noBlockingEntity = function (b, d) {
    var c, a = this.list(b, d);
    for (c = 0; c < a.length; c += 1) {
        if (a[c].isBlocking()) {
            return false
        }
    }
    return true
};
Entities.prototype.collide = function (b, f, d) {
    var c, a = this.list(b, f);
    for (c = 0; c < a.length; c += 1) {
        if (!a[c].isInvisible() || a[c].collideEvenIfInvisible) {
            if (d === true && (a[c] instanceof RedBug || a[c] instanceof BigBug)) {
                continue
            }
            a[c].collide()
        }
    }
};
Entities.prototype.getData = function () {
    var a, b = [];
    for (a = 0; a < this.entities.length; a += 1) {
        b.push(this.entities[a].getData())
    }
    return b
};
Entities.prototype.restore = function (a) {
    this.clear();
    this.doRestore(a)
};
Entities.prototype.restoreInRange = function (c, a, d, b, e) {
    this.exterminateInRange(c, a, d, b);
    this.doRestore(e)
};
Entities.prototype.doRestore = function (g) {
    var d, c, f, a = 2000,
        b = 800,
        e;
    for (d = 0; d < g.length; d += 1) {
        if (!g[d].valid) {
            continue
        }
        switch (g[d].type) {
            case "small_brown_key":
            case "yellow_key":
            case "blue_key":
            case "red_key":
            case "star_key":
                this.add(Key.prototype.restore(g[d]));
                break;
            case "keyboard_key":
                this.add(KeyboardKey.prototype.restore(g[d]));
                break;
            case "chest":
                this.add(ClosedChest.prototype.restore(g[d]));
                break;
            case "chest_open":
                e = ClosedChest.prototype.restore(g[d]);
                if (e.isClosed) {
                    e.setOpened()
                }
                this.add(e);
                break;
            case "selector":
                this.add(Selector.prototype.restore(g[d]));
                break;
            case "door":
            case "blue_door":
            case "red_door":
                this.add(Door.prototype.restore(g[d]));
                break;
            case "candle":
                this.add(Candle.prototype.restore(g[d]));
                break;
            case "rock":
                this.add(Rock.prototype.restore(g[d]));
                break;
            case "tall_tree":
                this.add(TallTree.prototype.restore(g[d]));
                break;
            case "short_tree":
                this.add(ShortTree.prototype.restore(g[d]));
                break;
            case "person":
                this.add(Person.prototype.restore(g[d]));
                break;
            case "cursor_npc":
                this.add(CursorNPC.prototype.restore(g[d]));
                break;
            case "princess":
                this.add(Princess.prototype.restore(g[d]));
                break;
            case "timer_girl":
                this.add(TimerGirl.prototype.restore(g[d]));
                break;
            case "stop_timer_girl":
                this.add(StopTimerGirl.prototype.restore(g[d]));
                break;
            case "plus_minus":
                this.add(PlusMinus.prototype.restore(g[d]));
                break;
            case "lights_on":
                this.add(LightsOn.prototype.restore(g[d]));
                break;
            case "north_west_roof":
            case "north_east_roof":
            case "north_roof":
            case "south_west_roof":
            case "south_east_roof":
            case "south_roof":
            case "east_roof":
            case "west_roof":
                this.add(Roof.prototype.restore(g[d]));
                break;
            case "red_bug":
                this.add(RedBug.prototype.restore(g[d]));
                break;
            case "big_bug":
                this.add(BigBug.prototype.restore(g[d]));
                break;
            default:
                console.log("Couldn't match '" + g[d].type + "' entity while restoring!")
        }
    }
    if (vim.buffers.getCurrentBuffer().getEntities() === this) {
        for (d = 0; d < g.length; d += 1) {
            if (g[d].valid && g[d].type === "chest" && !g[d].closed) {
                f = this.list(g[d].x, g[d].y);
                for (c = 0; c < f.length; c += 1) {
                    if (f[c].isInvisible() && f[c].getImageName().indexOf("roof") === -1) {
                        a += b;
                        window.setTimeout(ClosedChest.prototype.removeFromChestCallback(f[c]), a)
                    }
                }
            }
        }
    }
    if (vim.buffers.getCurrentBuffer().getEntities() === this) {
        a = 400;
        b = 400;
        for (d = 0; d < g.length; d += 1) {
            if (g[d].valid && g[d].type === "short_tree" && g[d].isUgly) {
                f = this.list(g[d].x, g[d].y);
                for (c = 0; c < f.length; c += 1) {
                    if (f[c].isInvisible()) {
                        a += b;
                        window.setTimeout(ShortTree.prototype.revealTreeHidingCallback(f[c]), a)
                    }
                }
            }
        }
    }
};
Entities.prototype.getByName = function (a) {
    var b;
    for (b = 0; b < this.entities.length; b += 1) {
        if (this.entities[b].getName() === a) {
            return this.entities[b]
        }
    }
};
Entities.prototype.doListConnectedRoofs = function (b, e) {
    var c, a = [],
        d;
    for (c = 0; c < this.visitedList.length; c += 1) {
        if (this.visitedList[c].x === b && this.visitedList[c].y === e) {
            return a
        }
    }
    this.visitedList.push({
        x: b,
        y: e
    });
    d = this.list(b, e);
    for (c = 0; c < d.length; c += 1) {
        if (d[c].getImageName().indexOf("roof") !== -1) {
            a.push(d[c])
        }
    }
    if (a.length !== 0) {
        a = a.concat(this.doListConnectedRoofs(b - 1, e));
        a = a.concat(this.doListConnectedRoofs(b, e - 1));
        a = a.concat(this.doListConnectedRoofs(b + 1, e));
        a = a.concat(this.doListConnectedRoofs(b, e + 1))
    }
    return a
};
Entities.prototype.listConnectedRoofs = function (a, c) {
    var b;
    this.visitedList = [];
    b = this.doListConnectedRoofs(a, c);
    this.visitedList = [];
    return b
};
Entities.prototype.shiftLeft = function (a, d, c, b) {
    return this.shift(a, d, -c, 0, b)
};
Entities.prototype.shiftUp = function (a, d, c, b) {
    return this.shift(a, d, 0, -c, b)
};
Entities.prototype.shift = function (j, g, e, b, h) {
    var d, l = this.mappingKey(j, g),
        k = this.mappingKey(j + e, g + b),
        a = this.entity_mapping[l] || [],
        c = this.entity_mapping[k] || [],
        f = [];
    for (d in a) {
        if (h === true && (a[d] instanceof RedBug || a[d] instanceof BigBug)) {
            f.push(a[d])
        } else {
            a[d].setX(j + e);
            a[d].setY(g + b);
            c.push(a[d])
        }
    }
    this.entity_mapping[l] = h === true && f.length > 0 ? f : undefined;
    this.entity_mapping[k] = c.length === 0 ? undefined : c
};
Entities.prototype.update = function () {
    var d, g, a, h, c, b = vim.buffers.collection(),
        f;
    for (g = 0; g < b.length; ++g) {
        c = b[g];
        f = c.getName();
        a = c.getEntities().entities;
        for (d = 0; d < a.length; d += 1) {
            h = a[d];
            if (typeof h.update !== "undefined" && !h.isInvisible() && h.isValid()) {
                h.update(f)
            }
        }
    }
};
Entities.prototype.createEntity = function (a, f, e, d, c) {
    var b;
    d = d || 0;
    c = c || 0;
    a = a || e.x;
    f = f || e.y;
    switch (e.type) {
        case "rock":
            b = new Rock(a, f);
            break;
        case "chest":
        case "chest_open":
            b = new ClosedChest(a, f);
            if (e.type === "chest_open" && b.isClosed) {
                b.setOpened()
            }
            break;
        case "selector":
            b = new Selector(a, f);
            break;
        case "short_tree":
            b = new ShortTree(a, f);
            break;
        case "tall_tree":
            b = new TallTree(a, f);
            break;
        case "north_west_roof":
        case "north_east_roof":
        case "north_roof":
        case "south_west_roof":
        case "south_east_roof":
        case "south_roof":
        case "east_roof":
        case "west_roof":
            b = new Roof(a, f, e.type);
            break;
        case "boy":
            b = new Person(a, f, "kid", e.message.split("\n"));
            b.setName(e.name);
            break;
        case "green_boy":
            b = new Person(a, f, "green_kid", e.message.split("\n"));
            b.setName(e.name);
            break;
        case "blond_boy":
            b = new Person(a, f, "blond_kid", e.message.split("\n"));
            b.setName(e.name);
            break;
        case "pink_girl":
            b = new Person(a, f, "pink_girl", e.message.split("\n"));
            b.setName(e.name);
            break;
        case "brown_girl":
            b = new Person(a, f, "brown_girl", e.message.split("\n"));
            b.setName(e.name);
            break;
        case "cat_girl":
            b = new Person(a, f, "cat_girl", e.message.split("\n"));
            b.setName(e.name);
            break;
        case "cursor_npc":
            b = new CursorNPC(a, f, e);
            b.setName(e.name);
            break;
        case "candle":
            b = new Candle(a, f);
            break;
        case "small_brown_key":
            b = new Key(a, f, "small_brown");
            break;
        case "yellow_key":
            b = new Key(a, f, "yellow");
            break;
        case "blue_key":
            b = new Key(a, f, "blue");
            break;
        case "red_key":
            b = new Key(a, f, "red");
            break;
        case "star_key":
            b = new Key(a, f, "star");
            break;
        case "door":
            b = new Door(a, f, "");
            break;
        case "blue_door":
            b = new Door(a, f, "blue");
            break;
        case "red_door":
            b = new Door(a, f, "red");
            break;
        case "keyboard_key":
            b = new KeyboardKey(a, f, e.character);
            break;
        case "princess":
            b = new Princess(a, f, e.message.split("\n"), e.levelToLoad);
            b.setName(e.name);
            break;
        case "timer_start":
            b = new TimerGirl(a, f, e.intervalInSec, e.startMessage.split("\n"), e.stillMessage.split("\n"), e.targetX + d, e.targetY + c, e.name);
            b.setName(e.name);
            break;
        case "timer_stop":
            b = new StopTimerGirl(a, f, e.timerName, e.stopMessage.split("\n"), e.moreMessage.split("\n"));
            b.setName(e.name);
            break;
        case "plus_minus":
            b = new PlusMinus(a, f, e.changes);
            b.setName(e.name);
            break;
        case "lights_on":
            b = new LightsOn(a, f);
            break;
        case "red_bug":
            b = new RedBug(a, f, e.vol, e.volHidden);
            break;
        case "big_bug":
            b = new BigBug(a, f, e.hitpoints);
            break;
        default:
            console.log("Couldn't match '" + e.type + "' entity!");
            b = undefined
    }
    if (b && e.invisible === true) {
        b.setInvisible(true)
    }
    return b
};
Entities.prototype.listOnText = function (c) {
    var f, e, b, d = c ? c.getTopX() : 0,
        a = c ? c.getTopY() : 0,
        g = [],
        h;
    if (!c) {
        return g
    }
    for (f = 0; f < c.getNumberOfLines(); ++f) {
        for (e = 0; e < c.getLineLength(f); ++e) {
            h = this.list(d + e, a + f);
            for (b = 0; b < h.length; ++b) {
                g.push(h[b])
            }
        }
    }
    return g
};
Entities.prototype.invalidateCursorNPCs = function () {
    var c, b, d = [],
        a;
    for (c = 0; c < this.entities.length; c += 1) {
        a = this.entities[c];
        if (a instanceof CursorNPC) {
            a.invalidate();
            this.entity_mapping[this.mappingKey(a.getX(), a.getY())] = undefined;
            vim.model.clearCellCache(a.getX(), a.getY())
        } else {
            d.push(a)
        }
    }
    this.entities = d
};

function TextAreas() {
    this.texts = [];
    this.text_mapping = {}
}
TextAreas.prototype.textMappingKey = function (a, b) {
    return a + "," + b
};
TextAreas.prototype.getData = function () {
    var a, b = [];
    for (a = 0; a < this.texts.length; a += 1) {
        b.push(this.texts[a].getData())
    }
    return b
};
TextAreas.prototype.clear = function () {
    this.texts = [];
    this.text_mapping = {}
};
TextAreas.prototype.setCacheValue = function (b, c) {
    var a, d;
    for (d = b.getTopY(); d < b.getTopY() + b.getNumberOfLines(); ++d) {
        for (a = b.getTopX(); a < b.getTopX() + b.getLineLength(d - b.getTopY()); ++a) {
            this.text_mapping[this.textMappingKey(a, d)] = c
        }
    }
};
TextAreas.prototype.refreshCache = function (b) {
    var a, d, c;
    for (d = b.getTopY(); d < b.getTopY() + b.getNumberOfLines() + 30; ++d) {
        for (a = b.getTopX(); a < b.getTopX() + b.getMaxLength() + 30; ++a) {
            c = this.textMappingKey(a, d);
            if (this.text_mapping[c] === b) {
                this.text_mapping[c] = undefined
            }
        }
    }
    this.setCacheValue(b, b)
};
TextAreas.prototype.add = function (a) {
    this.texts.push(a);
    this.setCacheValue(a, a)
};
TextAreas.prototype.restore = function (b, c) {
    var a;
    this.clear();
    for (a = 0; a < b.length; a += 1) {
        this.add(TextArea.prototype.restore(b[a], c))
    }
};
TextAreas.prototype.get = function (a, b) {
    return this.text_mapping[this.textMappingKey(a, b)]
};
TextAreas.prototype.exist = function (a, b) {
    return !!this.get(a, b)
};
TextAreas.prototype.exterminate = function (a, c) {
    var b;
    for (b = 0; b < this.texts.length; b += 1) {
        if (this.texts[b].getTopX() === a && this.texts[b].getTopY() === c) {
            this.setCacheValue(this.texts[b], undefined);
            this.texts.splice(b, 1);
            break
        }
    }
};
TextAreas.prototype.highlight = function (a) {
    var b;
    for (b = 0; b < this.texts.length; b += 1) {
        this.texts[b].highlight(a)
    }
};
(function () {
    var b = 0;
    var c = ["ms", "moz", "webkit", "o"];
    for (var a = 0; a < c.length && !window.requestAnimationFrame; ++a) {
        window.requestAnimationFrame = window[c[a] + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window[c[a] + "CancelAnimationFrame"] || window[c[a] + "CancelRequestAnimationFrame"]
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (h, e) {
            var d = new Date().getTime();
            var f = Math.max(0, 16 - (d - b));
            var g = window.setTimeout(function () {
                h(d + f)
            }, f);
            b = d + f;
            return g
        }
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (d) {
            clearTimeout(d)
        }
    }
})();
(function () {
    if (typeof window.performance === "undefined") {
        window.performance = {}
    }
    if (!window.performance.now) {
        var b = Date.now();
        if (performance.timing && performance.timing.navigationStart) {
            b = performance.timing.navigationStart
        }
        window.performance.now = function a() {
            return Date.now() - b
        }
    }
})();
var GameColors = (function () {
    var a = {
        regular: ["#000", "#555"],
        iregular: ["#000", "#fff"],
        d: ["#a00", "#a00"],
        id: ["#000", "#f00"],
        x: ["#a00", "#a00"],
        ix: ["#000", "#f00"],
        replaceOriginal: ["rgba(85,85,85,1.0)", "rgba(0,0,0,1.0)"],
        ireplaceOriginal: ["rgba(0,0,0,1.0)", "rgba(255,255,255,1.0)"],
        r: ["rgba(170,0,0,1.0)", "rgba(170,0,0,1.0)"],
        ir: ["rgba(0,0,0,1.0)", "rgba(255,0,0,1.0)"],
        "+": ["#060", "#090"],
        "i+": ["#090", "#fff"],
        watered: ["#000", "#008"],
        on_lava: ["#fc0", "#000"],
        d_on_lava: ["#000", "#500"],
        missing: ["#fff", "#f60"],
        imissing: ["#fff", "#f60"]
    };

    function b(e, d) {
        var c = d ? "i" + e : e;
        if (!a[c]) {
            c = d ? "iregular" : "regular"
        }
        return a[c]
    }
    return {
        get: b
    }
})();
vim.view = (function () {
    var at, O, bW, aN, aG, av, p, ao, aJ, bK, bU, h, aO, aU, aT, bm, X, Z, o, q, bY = vim.model,
        aD, be, bI, s, bX, b8, K, al, E, d, u, ac, aA, bJ, bp, aE, b4, a4, bj, bP, bz, G, F, bw, H, bu, Q, bv, bZ, bi, a0, bh, aH, aw, c, bO, bN, A, z, m, bx, a3, bf, aV, bF, S, b1, b0, ak, W, bt, a6, w, bV, bR, aW, bc, aB, ap = false;

    function aC(cc, cd) {
        Z = cc;
        o = 10;
        w = cd
    }

    function aX(cd, cc, ch, cf, ce) {
        var ci, cg, ck, cj;
        a0 = true;
        H = 0;
        S = ce || 4;
        aH = (cd - ch) * at;
        aw = (cc - cf) * O;
        bO = cd;
        bN = cc;
        A = ch;
        z = cf;
        bh.width = Math.abs(aH) + at * (aG + 4);
        bh.height = Math.abs(aw) + O * (av + 4);
        ci = Math.min(cd, ch);
        ck = Math.max(cd, ch);
        cg = Math.min(cc, cf);
        cj = Math.max(cc, cf);
        if (Cursor.getX() !== aU || Cursor.getY() !== aT) {
            bH()
        }
        au(c, ci, cg, ck + aG, cj + av);
        vim.input.switchToScrollMode()
    }

    function aa() {
        a0 = false;
        aH = 0;
        aw = 0;
        vim.input.leaveScrollMode();
        aQ()
    }

    function a8(cd, cc) {
        aV = cc || "#fff";
        ac = 0;
        aA = 10;
        a4 = cd
    }

    function v() {
        a4 = undefined;
        ac = 2;
        aA = 4
    }

    function j(cc) {
        b1 = cc;
        b0 = 24
    }

    function a9() {
        bW = bU.width;
        aN = bU.height;
        at = 37;
        O = 30;
        aG = Math.floor(bW / at);
        av = Math.floor(aN / O);
        p = 8;
        ao = 6
    }

    function B() {
        return 7
    }

    function e(cg) {
        var cd, ch, cf, ce, cc;
        ah()
    }

    function ah() {
        var cg = bY.getCursorX(),
            ce = bY.getCursorY(),
            cd = bY.getTopX(),
            cc = bY.getTopY(),
            ch = vim.buffers.getCurrentBuffer(),
            ck = ch.getBoard(),
            cj = ch.getTextAreas().get(cg, ce),
            ci, cf;
        if (cj && cj.isBossMode()) {
            ci = cj.getTopX() + Math.round(cj.getMaxLength() / 2);
            cf = cj.getTopY() + Math.round(cj.getNumberOfLines() / 2);
            cd = ci - Math.round(aG / 2);
            cc = cf - Math.round(av / 2) + 1
        } else {
            if (cg < cd + p - 1) {
                cd = Math.max(cg - p + 1, 0)
            }
            if (ce < cc + ao) {
                cc = Math.max(ce - ao, 0)
            }
            if (cg > cd + aG - p) {
                cd = Math.min(ck.getMaxX() - aG + p, cg - aG + p)
            }
            if (ce > cc + av - ao - 2) {
                cc = Math.min(ck.getMaxY() - av + ao, ce - av + ao + 2)
            }
        }
        bY.setTopX(cd);
        bY.setTopY(cc)
    }

    function aP() {
        var cc = bY.getCursorX(),
            cg = bY.getCursorY(),
            ce = bY.getTopX(),
            cd = bY.getTopY(),
            cf = vim.buffers.getCurrentBuffer().getBoard();
        ce = Math.max(cc - Math.floor(aG / 2), 0);
        cd = Math.max(cg - Math.floor(av / 2), 0);
        bY.setTopX(ce);
        bY.setTopY(cd)
    }

    function bo() {
        bU = document.getElementById("screen");
        if (!bU.getContext) {
            vim.game.showScreen("no-canvas");
            return
        }
        bw = 0;
        H = 0;
        h = bU.getContext("2d");
        aZ();
        a9();
        aU = -1;
        aT = -1;
        X = false;
        ak = false;
        W = 1;
        q = -1;
        aE = new Date().getTime();
        bI = false;
        s = false;
        bX = false;
        b8 = undefined;
        bF = false;
        bJ = false;
        bu = false;
        Q = 0;
        a6 = 0;
        bp = 37;
        o = 0;
        bj = "";
        bz = 1;
        bv = [];
        bZ = [];
        a3 = [];
        bt = [];
        bR = [];
        aW = [];
        m = false;
        a0 = false;
        bh = document.createElement("canvas");
        c = bh.getContext("2d");
        aH = 0;
        aw = 0;
        b1 = undefined;
        b0 = 0;
        w = undefined;
        aj.initialize();
        be = 30;
        bi = 30;
        bf = 9;
        bV = 20;
        bc = 5;
        aJ = 14;
        bK = 20;
        requestAnimationFrame(az)
    }

    function br(cd, cq, co, ce, cr) {
        var ch, cl, cf, ci, cc, cg, cj, cn, ck, cp, cm;
        if (!br.msgArray) {
            br.msgArray = []
        }
        if (ce.indexOf("\n") === -1) {
            br.msgArray[0] = ce;
            cp = br.msgArray
        } else {
            cp = ce.split("\n")
        }
        ck = "text_speech";
        cm = "text_speech_line";
        if (cp.length === 1 && cp[0].length === 0) {
            return
        }
        ch = 0;
        cl = 16 * (cp.length - 1);
        cd.font = '12px "Courier 10 Pitch", "Courier New", Courier, monospace';
        for (cj = 0; cj < cp.length; cj += 1) {
            cn = cd.measureText(cp[cj]);
            ch = cn.width > ch ? cn.width : ch
        }
        ci = cq;
        cg = co + O + Math.floor(cl / 2) + 2;
        cf = ci - ch - 13;
        cc = cg - cl - 20;
        vim.images.drawPartScale(cd, ck, 5, 65, 13, 13, cf, cc, 13, 13);
        vim.images.drawPartScale(cd, ck, 87, 65, 13, 13, ci, cc, 13, 13);
        vim.images.drawPartScale(cd, cm, 5, 150, 23, 20, cf, cg, 23, 20);
        vim.images.drawPartScale(cd, ck, 87, 150, 13, 20, ci, cg, 13, 20);
        vim.images.drawPartScale(cd, ck, 20, 65, 1, 13, cf + 13, cc, ch, 13);
        vim.images.drawPartScale(cd, ck, 30, 150, 1, 13, cf + 23, cg, ch - 10, 13);
        vim.images.drawPartScale(cd, ck, 5, 79, 13, 71, cf, cc + 13, 13, cl + 7);
        vim.images.drawPartScale(cd, ck, 87, 79, 13, 71, ci, cc + 13, 13, cl + 7);
        vim.images.drawPartScale(cd, ck, 29, 79, 1, 71, cf + 13, cc + 13, ch, cl + 7);
        vim.images.drawPartScale(cd, cm, 84, 109, 13, 12, ci + 11, cc + 13 - 1 + Math.round(cl / 2) + 4 - 5, 13, 12);
        cd.fillStyle = GameColors.get(undefined, cr)[1];
        for (cj = 0; cj < cp.length; cj += 1) {
            cd.fillText(cp[cj], cf + 13, cc + 20 + cj * 16)
        }
    }

    function aF(cd, cq, co, ce, cr) {
        var ch, cm, cf, ci, cc, cg, ck, cn, cl, cp, cj;
        if (!aF.msgArray) {
            aF.msgArray = []
        }
        if (ce.indexOf("\n") === -1) {
            aF.msgArray[0] = ce;
            cp = aF.msgArray
        } else {
            cp = ce.split("\n")
        }
        cl = "text_speech";
        if (cp.length === 1 && cp[0].length === 0) {
            return
        }
        ch = 0;
        cm = 0;
        cj = 0;
        cd.font = '12px "Courier 10 Pitch", "Courier New", Courier, monospace';
        for (ck = 0; ck < cp.length; ck += 1) {
            cn = cd.measureText(cp[ck]);
            ch = cn.width > ch ? cn.width : ch;
            cm = cm + 16
        }
        cm -= 16;
        if (ch < 11) {
            cj = Math.round((11 - ch) / 2);
            ch = 11
        }
        cf = cq + 5;
        cc = co + 8 - cm;
        ci = cf + 13 + ch - 1;
        cg = cc + 20 + cm;
        vim.images.drawPartScale(cd, cl, 5, 65, 13, 13, cf, cc, 13, 13);
        vim.images.drawPartScale(cd, cl, 87, 65, 13, 13, ci, cc, 13, 13);
        vim.images.drawPartScale(cd, cl, 5, 150, 23, 20, cf, cg, 23, 20);
        vim.images.drawPartScale(cd, cl, 87, 150, 13, 20, ci, cg, 13, 20);
        vim.images.drawPartScale(cd, cl, 20, 65, 1, 13, cf + 13, cc, ch - 1, 13);
        vim.images.drawPartScale(cd, cl, 30, 150, 1, 13, cf + 23, cg, ch - 11, 13);
        vim.images.drawPartScale(cd, cl, 5, 79, 13, 71, cf, cc + 13, 13, cm + 7);
        vim.images.drawPartScale(cd, cl, 87, 79, 13, 71, ci, cc + 13, 13, cm + 7);
        vim.images.drawPartScale(cd, cl, 29, 79, 1, 71, cf + 13, cc + 13, ch, cm + 7);
        cd.fillStyle = GameColors.get(undefined, cr)[1];
        for (ck = 0; ck < cp.length; ck += 1) {
            cd.fillText(cp[ck], cf + 13 + cj, cc + 20 + ck * 16)
        }
    }

    function am(cm, ck, cg, ct, cu, ci) {
        var cd, co, cp, ch, cf, ce, cq, cs, cr, cj, cc, cn = ci === true ? -1 : 1,
            cl = 0;
        cd = 0;
        co = 0;
        h.font = aJ + "px Arial, Helvetica, sans-serif";
        for (cq = 0; cq < cg.length; cq += 1) {
            cs = h.measureText(cg[cq]);
            cd = cs.width > cd ? cs.width : cd;
            co = co + bK
        }
        if (cn === -1) {
            cl = cd + 25;
            cm -= cd + 50
        }
        if (ci) {
            h.save();
            h.scale(-1, 1)
        }
        cp = cm + 45;
        cf = ck - 15 - co;
        ch = cp + 25 + cd;
        ce = cf + 25 + co;
        vim.images.drawPartScale(h, ct, 0, 60, 25, 25, cn * (cp + cl), cf, 25, 25);
        vim.images.drawPartScale(h, ct, 75, 60, 25, 25, cn * (ch - cl), cf, 25, 25);
        vim.images.drawPartScale(h, ct, 0, 140, 25, 30, cn * (cp + cl), ce, 25, 30);
        vim.images.drawPartScale(h, ct, 75, 140, 25, 30, cn * (ch - cl), ce, 25, 30);
        if (ci) {
            vim.images.drawPartScale(h, ct, 25, 60, 50, 25, cn * (ch - cl + cd), cf, cd, 25);
            vim.images.drawPartScale(h, ct, 25, 140, 50, 30, cn * (ch - cl + cd), ce, cd, 30);
            vim.images.drawPartScale(h, ct, 25, 85, 50, 55, cn * (ch - cl + cd), cf + 25 - 1, cd, co + 1)
        } else {
            vim.images.drawPartScale(h, ct, 25, 60, 50, 25, cp + 25, cf, cd, 25);
            vim.images.drawPartScale(h, ct, 25, 140, 50, 30, cp + 25, ce, cd, 30);
            vim.images.drawPartScale(h, ct, 25, 85, 50, 55, cp + 25, cf + 25 - 1, cd, co + 1)
        }
        vim.images.drawPartScale(h, ct, 0, 85, 25, 55, cn * (cp + cl), cf + 25 - 1, 25, co + 1);
        vim.images.drawPartScale(h, ct, 75, 85, 25, 55, cn * (ch - cl), cf + 25 - 1, 25, co + 1);
        if (ci) {
            h.restore()
        }
        h.fillStyle = GameColors.get(undefined, cu)[cu ? 1 : 0];
        for (cq = 0; cq < cg.length; cq += 1) {
            if (cu && vim.input.isInMiddleOfCursorCommand()) {
                if (cg[cq].charAt(cg.length - 1) === "|") {
                    h.fillStyle = "#ff0";
                    h.fillText(cg[cq], cp + 25, cf + 40 + cq * bK);
                    h.fillStyle = GameColors.get(undefined, cu)[1]
                }
                h.fillText(cg[cq].substr(0, cg[cq].length - 1), cp + 25, cf + 40 + cq * bK)
            } else {
                cr = false;
                cj = cg[cq];
                if (cq + 1 === cg.length && cg[cq].indexOf("Press Esc to") !== -1) {
                    h.fillStyle = "#777";
                    cr = true
                }
                if (cg[cq].substr(0, 2) === "^c") {
                    cr = true;
                    cj = cg[cq].substr(2)
                }
                if (cr) {
                    cc = h.measureText(cj).width
                }
                h.fillText(cj, cp + 25 + (ci ? -30 : 0) + (cr ? (cd - cc) / 2 : 0), cf + 40 + cq * bK)
            }
        }
    }

    function U(cd, ce, ci, cf, cl, cm) {
        var cc, cg, cj, ck = U.images,
            cn, ch;
        if (!ck) {
            ck = {};
            U.images = ck
        }
        if (!ck[cl]) {
            ck[cl] = {}
        }
        if (!ck[cl][ce]) {
            ck[cl][ce] = {}
        }
        cn = ck[cl][ce][cm];
        if (!cn) {
            cn = document.createElement("canvas");
            cn.width = 20;
            cn.height = 20;
            ch = cn.getContext("2d");
            if (cm) {
                ch.font = 'bold 18px "Comic Sans MS", Purisa, cursive'
            } else {
                ch.font = "18px Courier New"
            }
            cc = GameColors.get(cl, false);
            ch.fillStyle = cc[1];
            ch.fillText(ce, 5, 16);
            ch.fillStyle = cc[0];
            ch.fillText(ce, 4, 15);
            ck[cl][ce][cm] = cn
        }
        if (cl === "r" || cl === "replaceOriginal") {
            cg = Math.sin(E) / 2 + 0.5;
            cj = cl === "replaceOriginal";
            cd.globalAlpha = cj ? 1 - cg : cg
        }
        cd.drawImage(cn, ci, cf);
        if (cl === "r" || cl === "replaceOriginal") {
            cd.globalAlpha = "1.0"
        }
    }

    function b3(ce, cg, ch, cf, cd, ck) {
        var cc = ck ? ["#0f0", "#000"] : cd ? ["#f00", "#600"] : ["#fff", "#006"],
            ci, cj = 0;
        if (cd) {
            cj = Math.abs((bw % 20) - 10)
        }
        ce.font = "12px Arial";
        ci = ce.measureText(cg).width;
        ch += ck ? -10 - 8 * (cg < 10 ? 1 : 2) : 25 - ci;
        cf -= ck ? -30 : 15 + cj;
        ce.fillStyle = cc[1];
        ce.fillText(cg, ch, cf - 1);
        ce.fillText(cg, ch, cf + 1);
        ce.fillText(cg, ch - 1, cf);
        ce.fillText(cg, ch + 1, cf);
        ce.fillText(cg, ch - 1, cf - 1);
        ce.fillText(cg, ch + 1, cf + 1);
        ce.fillText(cg, ch - 1, cf + 1);
        ce.fillText(cg, ch + 1, cf - 1);
        ce.fillStyle = cc[0];
        ce.fillText(cg, ch, cf)
    }

    function P() {
        var cg, ce, cd = 0,
            cc = ["yellow", "blue", "red", "small_brown", "star"],
            cf;
        for (ce = 0; ce < cc.length; ++ce) {
            cf = cc[ce] === "small_brown";
            for (cg = 0; cg < vim.inventory.getNumberOfKeys(cc[ce]); cg += 1) {
                vim.images.drawScale(h, cc[ce] + "_key", bW - 200 + (cg + cd) * 40, 40 + (cf ? 85 * 0.2 : 0), 50 * (cf ? 0.8 : 1), 85 * (cf ? 0.8 : 1))
            }
            cd += cg
        }
    }

    function ay(cc, ci) {
        var ch, ce, cd, cf = vim.buffers.getCurrentBuffer().getBoard(),
            cg = vim.buffers.getCurrentBuffer().getTextAreas();
        if (!cf.isCodeBG(cc, ci)) {
            return undefined
        }
        ch = cg.get(cc, ci);
        if (ch) {
            return ch
        }
        cd = cc;
        while (cf.isCodeBG(cd, ci) && cf.getBG(cd, ci) !== cf.MISSING) {
            cd--
        }
        if (cd !== cc) {}
        ch = cg.get(cd + 1, ci);
        if (ch) {
            return ch
        }
        ce = ci;
        while (cf.isCodeBG(cd + 1, ce) && cf.getBG(cd + 1, ce) !== cf.MISSING) {
            ce--
        }
        if (ce !== ci) {
            ch = cg.get(cd + 1, ce + 1);
            if (ch) {
                return ch
            }
        }
        return undefined
    }

    function r(cc, cf, cd) {
        var ce = ay(cc, cf);
        return (ce && ce.getTopX() == cd.getTopX() && ce.getTopY() == cd.getTopY())
    }

    function k(cc, cf, cd) {
        var ce = vim.model.getCell(cc, cf).ta;
        return (ce && ce.getTopX() == cd.getTopX() && ce.getTopY() == cd.getTopY())
    }

    function by(cc, cf, cd) {
        var ce = true;
        if (cf < cd.startY) {
            ce = false
        }
        if (cf > cd.endY) {
            ce = false
        }
        if (cf === cd.startY && cc < cd.startX) {
            ce = false
        }
        if (cf === cd.endY && cc > cd.endX) {
            ce = false
        }
        if (cd.isDirectLine && (cc !== cd.startX || cc !== cd.endX)) {
            ce = false
        }
        if (cd.reverseSelection && typeof cd.textArea !== "undefined" && r(cc, cf, cd.textArea)) {
            ce = !ce
        }
        return ce
    }

    function bM() {
        var ce = vim.model,
            cd = ce.getTopX(),
            cc = ce.getTopY();
        if (a0) {
            if (aH !== 0) {
                aH = aH + (aH < 0 ? 1 : -1) * Math.min(S, Math.abs(aH))
            }
            if (aw !== 0) {
                aw = aw + (aw < 0 ? 1 : -1) * Math.min(S, Math.abs(aw))
            }
            h.drawImage(bh, aH + Math.max(0, A - bO) * at, aw + Math.max(0, z - bN) * O, bW, aN, 0, 0, bW, aN);
            T();
            if (aH === 0 && aw === 0) {
                aa()
            }
        } else {
            au(h, cd, cc, cd + aG, cc + av)
        }
    }

    function D(cd, cc, cf, ce) {
        if (typeof D.bubbles === "undefined") {
            D.bubbles = []
        }
        D.bubbles.push({
            context: cd,
            xpos: cc,
            ypos: cf,
            text: ce
        })
    }

    function cb() {
        var cd, cc;
        if (!D.bubbles) {
            return
        }
        for (cd = 0; cd < D.bubbles.length; ++cd) {
            cc = D.bubbles[cd];
            br(cc.context, cc.xpos, cc.ypos, cc.text, true)
        }
        D.bubbles = []
    }

    function au(c3, cv, cu, cj, ch) {
        var cX, cW, cQ, cP, cL, ce, c2, cy, cn, cY, cA, cU, c0, cd, cF, cz, cT, cJ, cZ, cC, cS, cK, ci, co = false,
            cl, cB, cV, ck, ct, cc = cj - cv,
            cf = ch - cu,
            cr = vim.buffers.getCurrentBuffer().getBoard(),
            cM = vim.buffers.getCurrentBuffer().getEntities(),
            c1 = vim.buffers.getCurrentBuffer().getTextAreas(),
            cR, cO, cD, cs, cN, cq, cx, cI, cg = vim.model,
            cG;
        if (!bM.waveValues) {
            bM.waveValues = [];
            bM.lastWaveUpdate = b4 - 2000
        }
        if (b4 - bM.lastWaveUpdate > 1500) {
            co = true;
            bM.lastWaveUpdate = b4
        }
        if (!bM.disappearingCursorVals) {
            bM.disappearingCursorVals = [];
            for (cU = 0; cU < 36 * 30; ++cU) {
                bM.disappearingCursorVals.push(cU)
            }
            for (cU = 0; cU < 36 * 30; ++cU) {
                cB = Math.floor(Math.random() * (36 * 30 - cU));
                cV = bM.disappearingCursorVals[cU];
                bM.disappearingCursorVals[cU] = bM.disappearingCursorVals[cB];
                bM.disappearingCursorVals[cB] = cV
            }
        }
        if (!bM.disappearingCursorPixel) {
            bM.disappearingCursorPixel = c3.createImageData(1, 1);
            bM.disappearingCursorPixel.data[0] = 0;
            bM.disappearingCursorPixel.data[1] = 0;
            bM.disappearingCursorPixel.data[2] = 33;
            bM.disappearingCursorPixel.data[3] = 0.5
        }
        an.x = an.y = 0;
        for (cX = -2; cX < cf + 2; cX += 1) {
            for (cW = -2; cW < cc + 2; cW += 1) {
                cQ = cW + cv;
                cP = cX + cu;
                cI = cg.getCell(cQ, cP);
                cK = cQ === Cursor.getX() && cP === Cursor.getY();
                c0 = cI.bg;
                cL = cW * at;
                ce = cX * O;
                cl = (50 * cP + cQ) % 1500;
                bx = cI.bgHeight;
                if (co || (bx === 0 && typeof bM.waveValues[cl] === "undefined")) {
                    bM.waveValues[cl] = Math.floor(Math.random() * 3) - 1
                }
                if (bx === 0) {
                    ce = ce + O / 2 - 2 + bM.waveValues[cl]
                } else {
                    if (c0 === cr.RAMP_EAST || c0 === cr.RAMP_WEST) {
                        ce = ce - O / 2
                    }
                }
                if (cI.sinked) {
                    ce = ce + B()
                }
                ck = false;
                ct = undefined;
                if (cI.ta) {
                    cF = cI.sa;
                    if (cF && cF.type === "t") {
                        c0 = cI.ta.getShouldClean()
                    }
                    ck = cF && cF.type === "M";
                    if (bv.length > 0 && bv[0].width < 3) {
                        bv.splice(0, 1)
                    }
                    for (cU = 0; cU < bv.length; ++cU) {
                        if (bv[cU].x === cQ && bv[cU].y === cP) {
                            ct = bv[cU]
                        }
                    }
                }
                if (ck) {
                    c3.save();
                    c3.translate(cL + 18, ce + 32);
                    c3.rotate(((bw % 40 > 19 ? 2 : -2) * Math.PI) / 180);
                    cL = -18;
                    ce = -32
                }
                switch (c0) {
                    case cr.GRASS:
                        vim.images.draw(c3, "grass", cL, ce);
                        break;
                    case cr.WATER:
                        vim.images.draw(c3, "water", cL, ce);
                        break;
                    case cr.PATH:
                        vim.images.draw(c3, "dirt", cL, ce);
                        break;
                    case cr.PLAIN:
                        vim.images.draw(c3, "plain", cL, ce);
                        break;
                    case cr.DARK:
                        vim.images.draw(c3, "dark", cL, ce);
                        break;
                    case cr.CRACKED:
                        vim.images.draw(c3, "cracked", cL, ce);
                        break;
                    case cr.WOOD:
                        vim.images.draw(c3, "wood", cL, ce);
                        break;
                    case cr.WALL:
                        vim.images.draw(c3, "stone", cL, ce);
                        break;
                    case cr.TALL_WALL:
                        vim.images.draw(c3, "stone_tall", cL, ce);
                        break;
                    case cr.HOUSE_WALL:
                        vim.images.draw(c3, "stone_tall", cL, ce);
                        vim.images.draw(c3, "stone", cL, ce - 29);
                        break;
                    case cr.RAMP_EAST:
                        vim.images.draw(c3, "stone", cL, ce + 15);
                        vim.images.draw(c3, "ramp_east", cL, ce);
                        break;
                    case cr.RAMP_WEST:
                        vim.images.draw(c3, "stone", cL, ce + 15);
                        vim.images.draw(c3, "ramp_west", cL, ce);
                        break;
                    case cr.WHITE:
                        vim.images.draw(c3, "white", cL, ce);
                        break;
                    case cr.CLOUD:
                        vim.images.draw(c3, "cloud", cL, ce);
                        break;
                    case cr.SAND:
                        vim.images.draw(c3, "sand", cL, ce);
                        break;
                    case cr.LAVA:
                        vim.images.draw(c3, "lava", cL, ce);
                        break
                }
                if (typeof ct !== "undefined" && ct.width > 3) {
                    vim.images.drawScale(c3, "plain", cL + (at - ct.width) / 2, ce + 19 + (O - Math.floor((ct.width * 30) / 37)) / 2 + 8 - ct.width / 5, Math.floor(ct.width), Math.floor((ct.width * 30) / 37));
                    ct.width = ct.width / 1.2
                }
                if (cI.shadows) {
                    var cH = cI.shadows,
                        cw = 0,
                        cp = 0,
                        cm, cE;
                    if (cH.north || cH.ne || cH.nw) {
                        cm = cg.getCell(cQ, cP - 1);
                        if (cm.sinked && !cI.sinked) {
                            cp = B()
                        }
                        if (cP > 0 && cm.bgHeight === 3 && cI.bgHeight === 2) {
                            cp -= 14
                        }
                    }
                    if (cH.south || cH.se || cH.sw) {
                        cE = cg.getCell(cQ, cP + 1);
                        if (!cI.sinked && cE.sinked) {
                            cw = B()
                        }
                    }
                    if (cH.north) {
                        vim.images.draw(c3, "shadow_north", cL, ce + cp)
                    }
                    if (!cH.north && !cH.east && cH.ne && cr.getBG(cQ - 1, cP - 1) !== cr.RAMP_EAST) {
                        vim.images.draw(c3, "shadow_north_east", cL, ce + cp)
                    }
                    if (!cH.north && !cH.west && cH.nw && cr.getBG(cQ + 1, cP - 1) !== cr.RAMP_WEST) {
                        vim.images.draw(c3, "shadow_north_west", cL, ce + cp)
                    }
                    if (cH.south) {
                        if (cE.bg !== cr.RAMP_EAST && cE.bg !== cr.RAMP_WEST) {
                            vim.images.draw(c3, "shadow_south", cL, ce + cw)
                        }
                    }
                    if (!cH.south && !cH.east && cH.se && cr.getBG(cQ + 1, cP + 1) !== cr.RAMP_WEST) {
                        vim.images.draw(c3, "shadow_south_east", cL, ce + cw)
                    }
                    if (!cH.south && !cH.west && cH.sw && cr.getBG(cQ - 1, cP + 1) !== cr.RAMP_EAST) {
                        vim.images.draw(c3, "shadow_south_west", cL, ce + cw)
                    }
                    if (cH.east && cr.getBG(cQ + 1, cP) !== cr.RAMP_WEST) {
                        vim.images.draw(c3, "shadow_east", cL, ce)
                    }
                    if (cH.west && cr.getBG(cQ - 1, cP) !== cr.RAMP_EAST) {
                        vim.images.draw(c3, "shadow_west", cL, ce)
                    }
                }
                cS = cI.bgHeight > 1 ? -14 : 0;
                if ((Z && o > 0 && r(cQ, cP, Z) && c0 !== cr.MISSING && c0 !== cr.SKY_MISSING) || (Z && Z.isBossMode() && cI.ta === Z)) {
                    c3.fillStyle = "rgba(255,255,255," + (o % 2) + ")";
                    c3.fillRect(cL + 2, ce + cS + 19 + 2, at - 4, O - 4)
                } else {
                    if (al && al.count > 0 && (typeof al.textArea === "undefined" || k(cQ, cP, al.textArea)) && by(cQ, cP, al)) {
                        c3.fillStyle = al.color || "rgba(255,0,0,0.5)";
                        if (typeof al.inputCursorBefore === "undefined") {
                            c3.fillRect(cL + 2, ce + cS + 19 + 2, at - 4, O - 4)
                        } else {
                            if (al.inputCursorBefore) {
                                c3.fillRect(cL + 2, ce + cS + 19 + 2, 3, O - 4)
                            } else {
                                c3.fillRect(cL - 7 + at, ce + cS + 19 + 2, 3, O - 4)
                            }
                        }
                    }
                }
                if (cI.sinked) {
                    c3.fillStyle = "rgba(255,255,0,0.5)";
                    c3.fillRect(cL, ce + 19, at, O)
                }
                cA = cI.entitiesList;
                for (cY = 0; cY < cA.length; cY += 1) {
                    cz = cA[cY];
                    if (cz instanceof CursorNPC && cz.isCursorNPCOn(bw) && !cz.isInvisible()) {
                        c3.fillStyle = cz.getFillStyle();
                        c3.fillRect(cL, ce + 19, at, O)
                    }
                }
                for (cY = 0; cY < cA.length; cY += 1) {
                    cz = cA[cY];
                    if (cz instanceof RedBug && "Bram Uganda Charity".indexOf(cz.getVolPattern()) !== -1 && cz.isFrozen()) {
                        switch (cz.getVolPattern()) {
                            case "Bram":
                                c3.fillStyle = "#fff";
                                cq = 1;
                                break;
                            case "Uganda":
                                c3.fillStyle = "#f00";
                                cq = 2;
                                break;
                            case "Charity":
                                c3.fillStyle = "rgba(0,0,255,0.5)";
                                cq = 2;
                                break;
                            default:
                                c3.fillStyle = "rgba(255,255,255,0)";
                                break
                        }
                        if (Math.floor((bw + cq) / 6) % 2) {
                            c3.fillRect(cL, ce + 19, at, O)
                        }
                    }
                }
                if (cK) {
                    an.x = cL;
                    an.y = ce + 19
                }
                if (cK && Cursor.isOn()) {
                    if (m) {
                        if (c0 === cr.MISSING || c0 === cr.SKY_MISSING) {
                            c3.fillStyle = "rgba(255,255,255,0.5)"
                        } else {
                            c3.fillStyle = "rgba(0,0,33,0.5)"
                        }
                        c3.fillRect(cL, ce + 19, 3, O)
                    } else {
                        if (bJ) {
                            c3.fillStyle = "rgba(255,255,255,0.5)";
                            c3.fillRect(cL + (at - bp) / 2, ce + 19 + (O - Math.floor((bp * 30) / 37)) / 2 + 8 - bp / 5, bp, Math.floor((bp * 30) / 37))
                        } else {
                            if (bu) {
                                c3.fillStyle = "rgba(0,0,33,0.5)";
                                if (Q > 14) {
                                    c3.fillRect(cL, ce + 19, at, O)
                                } else {
                                    for (cU = 0; cU < (Q % 15) * 72; ++cU) {
                                        c3.fillRect(cL + (bM.disappearingCursorVals[cU] - Math.floor(bM.disappearingCursorVals[cU] / 36) * 36), ce + 19 + Math.floor(bM.disappearingCursorVals[cU] / 36), 1, 1)
                                    }
                                }
                            } else {
                                c3.fillStyle = "rgba(0,0,33,0.5)";
                                if (c0 !== cr.RAMP_EAST && c0 !== cr.RAMP_WEST) {
                                    c3.fillRect(cL, ce + 19, at, O)
                                }
                                if (c0 === cr.RAMP_EAST) {
                                    c3.beginPath();
                                    c3.moveTo(cL, ce + 19);
                                    c3.lineTo(cL + at, ce + 33);
                                    c3.lineTo(cL + at, ce + 33 + O);
                                    c3.lineTo(cL, ce + 19 + O);
                                    c3.fill()
                                }
                                if (c0 === cr.RAMP_WEST) {
                                    c3.beginPath();
                                    c3.moveTo(cL + at, ce + 19);
                                    c3.lineTo(cL, ce + 33);
                                    c3.lineTo(cL, ce + 33 + O);
                                    c3.lineTo(cL + at, ce + 19 + O);
                                    c3.fill()
                                }
                            }
                        }
                    }
                }
                cd = cI.ta;
                if (cd !== undefined) {
                    cn = cI.letter;
                    cG = cd.isSacred();
                    c2 = cL + Math.floor(at * 0.2);
                    cy = ce + Math.floor(O * 0.8 + 1 + (cI.bgHeight > 1 ? -14 : 0));
                    cF = cI.sa;
                    if (cF && cF.hidden !== true) {
                        switch (cF.type) {
                            case "x":
                            case "r":
                            case "d":
                            case "*":
                                cJ = cF.startX === cQ && cF.startY === cP;
                                cZ = cF.endX === cQ && cF.endY === cP;
                                cC = cI.bgHeight > 1 ? -14 : 0;
                                c3.strokeStyle = c0 === cr.LAVA ? "#500" : "#f00";
                                c3.lineWidth = 2;
                                if (cJ) {
                                    c3.strokeRect(cL + 3.5, ce - 0.5 + 26 + cC, 1, O - 14)
                                }
                                c3.strokeRect(cL + (cJ ? 3.5 : 0.5), ce + 0.5 + 22 + cC, at - 2 + (cZ ? -2 : 0) + (cJ ? -3 : 0), 1);
                                c3.strokeRect(cL + (cJ ? 3.5 : 0.5), ce + 0.5 + O - 9 + 22 + cC, at - 2 + (cZ ? -2 : 0) + (cJ ? -3 : 0), 1);
                                if (cZ) {
                                    c3.strokeRect(cL + 4.5 + at - 9, ce - 0.5 + 26 + cC, 1, O - 14)
                                }
                                break;
                            case "+":
                                if (bx == 1) {
                                    c3.fillStyle = "rgba(127,255,0,0.5)";
                                    c3.fillRect(cL, ce + 19, at, O)
                                }
                                break;
                            case "o":
                                cR = cI.markObj;
                                if (typeof cR === "undefined" || cR.mark !== cF.requiredMark) {
                                    c3.globalAlpha = "0.4";
                                    vim.images.drawFlag(c3, cL + 5, ce - 25, cF.requiredMark);
                                    c3.globalAlpha = "1.0"
                                }
                                break
                        }
                    }
                    if (cd.isHighlighted(cQ, cP)) {
                        c3.fillStyle = "rgba(102,204,255,0.5)";
                        c3.fillRect(cL, ce + 19, at, O)
                    }
                    if (cn !== " ") {
                        if (cF && cF.type === "r" && cF.hidden !== true) {
                            U(c3, cF.originalCharacter, c2, cy, "replaceOriginal", cG);
                            U(c3, cn, c2, cy, cF && cF.hidden !== true ? cF.type : "completed", cG)
                        } else {
                            if (cF && cF.type === "*" && cF.inplace && cF.hidden !== true) {
                                U(c3, cF.originalText.charAt(cQ - cF.startX), c2, cy, "replaceOriginal", cG);
                                U(c3, cn, c2, cy, cF && cF.hidden !== true ? "r" : "completed", cG)
                            } else {
                                if (cF && cF.type === "*" && !cF.inplace && cF.hidden !== true) {
                                    U(c3, cn, c2, cy, cF && cF.hidden !== true ? c0 === cr.LAVA ? "d_on_lava" : "d" : "completed", cG)
                                } else {
                                    ci = cF && cF.hidden !== true ? cF.type : "completed";
                                    if (c0 === cr.WATER) {
                                        ci = "watered"
                                    } else {
                                        if (c0 === cr.LAVA) {
                                            ci = "on_lava"
                                        } else {
                                            if (c0 === cr.MISSING || c0 === cr.SKY_MISSING) {
                                                ci = "missing"
                                            }
                                        }
                                    }
                                    U(c3, cn, c2, cy, ci, cG)
                                }
                            }
                        }
                    }
                }
                if (ck) {
                    c3.restore()
                }
            }
        }
        ae();
        bB();
        a2();
        for (cX = -2; cX < cf + 2; cX += 1) {
            for (cU = -2; cU < cc + 2; cU += 1) {
                cQ = cU + cv;
                cP = cX + cu;
                cI = cg.getCell(cQ, cP);
                cL = cU * at;
                ce = cX * O;
                cd = cI.ta;
                if (!cd) {
                    continue
                }
                cR = cI.markObj;
                if (cR) {
                    cO = ce - (cR.yOffset ? cR.yOffset > 5 ? 10 - cR.yOffset : cR.yOffset - 1 : 0) * 2;
                    if (cR.yOffset > 0) {
                        cR.yOffset -= 2
                    }
                    vim.images.drawFlag(c3, cL + 5, cO - 25, cR.mark);
                    cF = cI.sa;
                    if (cF && cF.hidden !== true && cF.type === "_" && vim.model.getDisplayableMarks().indexOf(cR.mark) !== -1) {
                        vim.images.drawToBeRemovedSign(c3, cL + 5, cO - 25)
                    }
                }
                cF = cI.sa;
                if (cF && cF.type === "n") {
                    cs = cL + 10;
                    cN = Math.floor(ce + O * 1.3 + 1 + (cI.bgHeight > 1 ? -14 : 0));
                    b3(c3, cF.stepNumber, cs, cN, cF.stepNumber === cd.getCurrentNumber())
                }
                if (vim.model.isShowNumbers()) {
                    if (cQ === cd.getTopX() || cQ === cv + 1) {
                        b3(c3, cP - cd.getTopY() + 1, cL, ce, false, true)
                    }
                }
            }
        }
        for (cX = -2; cX < cf + 2; cX += 1) {
            for (cU = -2; cU < cc + 2; cU += 1) {
                cQ = cU + cv;
                cP = cX + cu;
                cI = cg.getCell(cQ, cP);
                cL = cU * at;
                ce = cX * O;
                bx = cI.bgHeight;
                if (cr.isValid(cQ, cP) && bx === 0) {
                    ce = ce + O / 2 + 2 + bM.waveValues[cl]
                }
                cA = cI.entitiesList;
                for (cY = 0; cY < cA.length; cY += 1) {
                    cz = cA[cY];
                    if (typeof cz.getImageName() !== "undefined" && vim.images.exists(cz.getImageName()) && !cz.isInvisible()) {
                        if (cz instanceof KeyboardKey) {
                            cn = cz.getLetter();
                            if (cn.charAt(0) === "\\") {
                                cn = cn.substr(1)
                            }
                            if (cn !== "CTRL-R") {
                                cT = at / 2 + 2;
                                vim.images.drawScale(c3, cz.getImageName(), cL + cz.getXOffset() + at / 5, ce + cz.getYOffset(), cT, cT * 2);
                                c3.fillStyle = "#000";
                                c3.font = "13px Courier New";
                                c3.fillText(cn, cL + cz.getXOffset() + 17 - c3.measureText(cn).width / 2, ce + cz.getYOffset() + 26)
                            } else {
                                vim.images.drawScale(c3, cz.getImageName(), cL + cz.getXOffset() - 5, ce + cz.getYOffset() + 1, at + 10, at + 2);
                                c3.fillStyle = "#000";
                                c3.font = "10px Courier New";
                                c3.fillText(cn, cL + cz.getXOffset() + 17 - c3.measureText(cn).width / 2, ce + cz.getYOffset() + 26)
                            }
                        } else {
                            if (cz instanceof RedBug || cz instanceof BigBug) {
                                bl(c3, cL, ce, cz)
                            } else {
                                if (cz instanceof Selector && cz === b1) {
                                    c3.save();
                                    c3.globalAlpha = Math.min(1, Math.abs(Math.sin(E)) + 0.25);
                                    vim.images.draw(c3, cz.getImageName(), cL + cz.getXOffset(), ce - at / 3 + cz.getYOffset());
                                    c3.restore()
                                } else {
                                    cx = ce + 18 + O;
                                    if (cg.getCell(cQ, cP + 1).bgHeight > 1) {
                                        cx -= 14
                                    }
                                    vim.images.draw(c3, cz.getImageName(), cL + cz.getXOffset(), ce - 12 + cz.getYOffset(), cx)
                                }
                            }
                        }
                    }
                }
            }
            for (cW = -3; cW < cc + 2; cW += 1) {
                cQ = cW + cv;
                cP = cX + cu;
                cI = cg.getCell(cQ, cP);
                cL = cW * at;
                ce = cX * O;
                cd = cg.getCell(cQ, cP - 1).ta;
                if (cd && cP - 1 === cd.getTopY() + cd.getNumberOfLines() - 1 && cd.getTopX() === cQ) {
                    cF = cd.getEmptyLineSpecialArea(cQ, cP - 1, false);
                    if (cF && cF.hidden !== true && cQ === cF.startX && cP === cF.startY && cF.emptyLine) {
                        D(c3, cL - 22, ce - 10, cF.originalText)
                    }
                }
                cd = cI.ta;
                if (!cd) {
                    continue
                }
                if (cQ === cd.getTopX()) {
                    cF = cd.getEmptyLineSpecialArea(cQ, cP, true);
                    if (cF && cF.hidden !== true && cQ === cF.startX && cP === cF.startY && cF.emptyLine) {
                        D(c3, cL - 22, ce - 10, cF.originalText)
                    }
                }
                cF = cI.sa;
                if ((cF && cF.type === "*" && !cF.inplace) || (cF && cF.type === "+")) {
                    if (cF.hidden !== true && cQ === cF.startX && cP === cF.startY) {
                        aF(c3, cL - 22, ce - 15, cF.originalText, true)
                    }
                }
                cF = cd.getEmptySpecialArea(cQ, cP, true);
                if (cF && cF.hidden !== true && cQ === cF.startX && cP === cF.startY && !cF.emptyLine) {
                    aF(c3, cL - 22, ce - 10 - 15 * (cQ % 2), cF.originalText, true)
                }
                if (cQ === cd.getTopX() + cd.getLineLength(cP - cd.getTopY()) - 1) {
                    cF = cd.getEmptySpecialArea(cQ, cP, false);
                    if (cF && cF.hidden !== true && cQ + 1 === cF.startX && cP === cF.startY) {
                        aF(c3, cL - 22 + at, ce - 10 - 15 * ((cQ + 1) % 2), cF.originalText, true)
                    }
                }
            }
        }
        cb();
        a5();
        if (cg.isCandleLightMode() || bI) {
            R(c3)
        }
        if (ac > 0) {
            --ac
        }
        if (ac === 0 && aA > 0) {
            --aA;
            if (aA === 5 && typeof a4 === "function") {
                a4();
                a4 = undefined
            }
            if (aA % 2 === 1) {
                c3.fillStyle = aV;
                c3.fillRect(0, 0, bW, aN)
            } else {
                if (aA === 0) {
                    bH()
                }
            }
        }
        if (o > 0) {
            --o;
            if (o === 0) {
                Z = undefined;
                if (w) {
                    w()
                }
                w = undefined
            }
        }
        if (al && al.count > 0) {
            --al.count;
            if (al.count === 0) {
                al = undefined
            }
        }
        if (a3.length > 0 && a3[0].count === 0) {
            a3.splice(0, 1)
        }
        for (cU = 0; cU < a3.length; ++cU) {
            if (typeof a3[cU].scale === "undefined" || a3[cU].scale <= 1) {
                vim.images.draw(c3, "explosion" + (bf - a3[cU].count + 1), a3[cU].px - at * (vim.model.getTopX() - a3[cU].topX), a3[cU].py - 5 - O * (vim.model.getTopY() - a3[cU].topY))
            } else {
                vim.images.drawMulScale(c3, "explosion" + (bf - a3[cU].count + 1), a3[cU].px - at * (vim.model.getTopX() - a3[cU].topX), a3[cU].py - 5 - O * (vim.model.getTopY() - a3[cU].topY), a3[cU].scale, a3[cU].scale)
            }--a3[cU].count
        }
        if (bZ.length > 0 && bZ[0].count === 0) {
            bZ.splice(0, 1)
        }
        for (cU = 0; cU < bZ.length; ++cU) {
            aF(c3, bZ[cU].px - at * (vim.model.getTopX() - bZ[cU].topX), bZ[cU].py + (-bi + bZ[cU].count) * 4 - O * (vim.model.getTopY() - bZ[cU].topY), bZ[cU].text, true);
            if (bZ[cU].count % 16 < 10) {
                bZ[cU].px = bZ[cU].px + ~(~(Math.random() * 3) % 3) * 2
            }--bZ[cU].count
        }
        if (bu && Q > 0 && !s && !bX) {
            --Q;
            if (Q === 0) {
                bu = false;
                Cursor.hide();
                cD = function () {
                    bS.restorePositionCB();
                    vim.input.enableKeys();
                    if (typeof bS.entities !== "undefined") {
                        for (cU = 0; cU < bS.entities.length; ++cU) {
                            if (typeof bS.entities[cU] !== "undefined") {
                                bS.entities[cU].inCollision = false
                            }
                        }
                        bS.entities.length = 0
                    }
                };
                if (bS.entities && bS.entities.length > 0 && typeof bS.entities[0] !== "undefined") {
                    cD()
                } else {
                    window.setTimeout(cD, 1000)
                }
            }
        }
        if (bJ && !s && !bX) {
            bp = bp / 1.2;
            if (bp < 3) {
                bJ = false;
                Cursor.hide();
                window.setTimeout(function () {
                    ax.restorePositionCB();
                    vim.input.enableKeys();
                    Cursor.blink()
                }, 1000)
            }
        }
        if (b0 > 0) {
            b0--;
            if (b0 === 0) {
                b1 = undefined
            }
        }
    }

    function aK(cc) {
        q = cc
    }

    function R(ce) {
        var ch, cg, ci, cc, cd, cf;
        if (ce === c) {
            cd = bh.width;
            cf = bh.height;
            ch = (Cursor.getX() - Math.min(bO, A)) * at + 18;
            cg = (Cursor.getY() - Math.min(bN, z)) * O + 18 + 16
        } else {
            cd = bW;
            cf = aN;
            ch = (Cursor.getX() - bY.getTopX()) * at + 18;
            cg = (Cursor.getY() - bY.getTopY()) * O + 18 + 16
        }
        if (bI) {
            cc = q;
            if (cc === -1) {
                return
            }
        } else {
            cc = 100
        }
        ce.fillStyle = "#000";
        ce.fillRect(0, 0, cd, cg - cc + 2);
        ce.fillRect(0, 0, ch - cc, cd);
        ce.fillRect(0, cg + cc - 2, cd, cf - cg - cc + 2);
        ce.fillRect(ch + cc, 0, cd - ch - cc, cf);
        ci = ce.createRadialGradient(ch, cg, 0, ch, cg, cc);
        ci.addColorStop(0, "rgba(0,0,0,0)");
        ci.addColorStop(1, "rgba(255,204,0,0.75)");
        ce.fillStyle = ci;
        ce.fillRect(ch - cc, cg - cc, cc * 2, cc * 2);
        ci = ce.createRadialGradient(ch, cg, 0, ch, cg, cc + 3);
        ci.addColorStop(0, "rgba(0,0,0,0)");
        ci.addColorStop(1, "rgba(0,0,0,1)");
        ce.fillStyle = ci;
        ce.fillRect(ch - cc, cg - cc - 1, cc * 2 + 1, cc * 2 + 2)
    }

    function a(cd, ci, ch) {
        var cf, ce, cc, cg, ck, cj;
        if (cd === c) {
            ck = bh.width;
            cj = bh.height;
            cf = (ci - Math.min(bO, A)) * at + 18;
            ce = (ch - Math.min(bN, z)) * O + 18 + 16
        } else {
            ck = bW;
            cj = aN;
            cf = (ci - bY.getTopX()) * at + 18;
            ce = (ch - bY.getTopY()) * O + 18 + 16
        }
        cg = 150;
        cc = cd.createRadialGradient(cf, ce, 0, cf, ce, cg);
        cc.addColorStop(0, "rgba(77,128,179,0.5)");
        cc.addColorStop(0.5, "rgba(255,204,0,0.75)");
        cc.addColorStop(1, "rgba(0,0,0,0)");
        cd.save();
        cd.globalCompositeOperation = "lighter";
        cd.fillStyle = cc;
        cd.fillRect(cf - cg, ce - cg, cg * 2, cg * 2);
        cd.restore()
    }

    function bC(cc) {}

    function aY() {
        var cd, cc;
        if (aU !== -1 && aT !== -1 && aH === 0 && aw === 0) {
            if (ak && (bY.getCursorX() !== aU || bY.getCursorY() !== aT)) {
                ak = false;
                W = 1
            }
            if ((W > 0 || ak) && bm !== "") {
                cd = (aU - bY.getTopX()) * at - 12;
                cc = (aT - bY.getTopY()) * O - 15;
                h.globalAlpha = W > 1 || ak ? "1.0" : "" + W;
                am(cd, cc, bm, "speech", false, X);
                h.globalAlpha = "1.0"
            }
            if (W > 0 && !ak) {
                W = W - 0.1
            }
        }
    }

    function bd() {
        var cd, cc, ce;
        if (a0) {
            return
        }
        if (typeof bd.cursorCommandArray === "undefined") {
            bd.cursorCommandArray = [""]
        }
        if (typeof bd.blinkCounter === "undefined") {
            bd.blinkCounter = 0
        }
        if (bP && (bY.getCursorX() !== G || bY.getCursorY() !== F)) {
            bP = false;
            bz = 1
        }
        if ((bz > 0 || bP) && bj !== "" && (bY.getCursorX() !== aU || bY.getCursorY() !== aT)) {
            if (bj.indexOf("\n") !== -1) {
                ce = bj.split("\n")
            } else {
                bd.cursorCommandArray[0] = bj;
                ce = bd.cursorCommandArray
            }
            if (vim.input.isInMiddleOfCursorCommand()) {
                ce[0] += bd.blinkCounter < 5 ? "|" : " "
            }
            cd = (bY.getCursorX() - bY.getTopX()) * at - 12;
            cc = (bY.getCursorY() - bY.getTopY()) * O - 15;
            h.globalAlpha = bz > 1 || vim.input.isInMiddleOfCursorCommand() || bP ? "1.0" : "" + bz;
            am(cd, cc, ce, "cursor_speech", true);
            h.globalAlpha = "1.0"
        }
        if (bz > 0 && !vim.input.isInMiddleOfCursorCommand() && !bP) {
            bz = bz - 0.1
        }
        bd.blinkCounter = (bd.blinkCounter + 1) % 10
    }

    function bb() {
        var cd, cc, ce;
        if (vim.model.isKeypressCountdownActive()) {
            ce = vim.model.getKeypressCountdownString();
            h.font = "30px Arial";
            h.fillStyle = "#000";
            for (cd = -2; cd < 3; cd += 1) {
                for (cc = -2; cc < 3; cc += 1) {
                    h.fillText(ce, aG * at - 320 + cc, 50 + cd)
                }
            }
            h.fillStyle = "#fff";
            h.fillText(ce, aG * at - 320, 50);
            a1()
        }
    }

    function aq() {
        var cd, cc, ce;
        if (vim.timer.isActive()) {
            ce = vim.timer.getTimeString();
            h.font = "30px Arial";
            h.fillStyle = "#000";
            for (cd = -2; cd < 3; cd += 1) {
                for (cc = -2; cc < 3; cc += 1) {
                    h.fillText(ce, aG * at - 140 + cc, 50 + cd)
                }
            }
            h.fillStyle = "#fff";
            h.fillText(ce, aG * at - 140, 50)
        }
    }

    function b5() {
        var cg, ce, cf = vim.stats.getStatisticsStr(vim.model.getLevel()).split("\n"),
            cd, cc;
        if (vim.model.getLevel() === 0) {
            return
        }
        if (cf.length === 1 && cf[0] === "") {
            return
        }
        h.font = "15px Arial";
        for (cd = 0; cd < cf.length; ++cd) {
            h.fillStyle = "#000";
            for (cg = -2; cg < 3; cg += 1) {
                for (ce = -2; ce < 3; ce += 1) {
                    if (cf[cd].indexOf("\t") === -1) {
                        h.fillText(cf[cd], 50 + ce, 90 + cg + cd * 20)
                    } else {
                        cc = cf[cd].split("\t");
                        h.fillText(cc[0], 50 + ce, 90 + cg + cd * 20);
                        h.fillText(cc[1], 200 - h.measureText(cc[1]).width + ce, 90 + cg + cd * 20)
                    }
                }
            }
            h.fillStyle = "#fff";
            if (cf[cd].indexOf("\t") === -1) {
                h.fillText(cf[cd], 50, 90 + cd * 20)
            } else {
                cc = cf[cd].split("\t");
                h.fillText(cc[0], 50, 90 + cd * 20);
                h.fillText(cc[1], 200 - h.measureText(cc[1]).width, 90 + cd * 20)
            }
        }
    }

    function T() {
        var ce, cd, cf = "To skip scrolling effect, press any key.",
            cc;
        h.font = "20px Arial";
        cc = Math.floor((bW - h.measureText(cf).width) / 2);
        h.fillStyle = "#000";
        for (ce = -2; ce < 3; ce += 1) {
            for (cd = -2; cd < 3; cd += 1) {
                h.fillText(cf, cc + cd, aN - 100 + ce)
            }
        }
        h.fillStyle = "#aaa";
        h.fillText(cf, cc, aN - 100)
    }

    function a1() {
        var ce, cd, cf = "Press Esc twice to cancel the current trial with the limited keystores text.",
            cc;
        if (a0) {
            return
        }
        if (a6 < 3) {
            return
        }
        a6--;
        h.globalAlpha = (a6 < 20 ? "0." + a6 * 5 : "1.0").substr(0, 3);
        h.font = "20px Arial";
        cc = Math.floor((bW - h.measureText(cf).width) / 2);
        h.fillStyle = "#000";
        for (ce = -2; ce < 3; ce += 1) {
            for (cd = -2; cd < 3; cd += 1) {
                h.fillText(cf, cc + cd, aN - 100 + ce)
            }
        }
        h.fillStyle = "#aaa";
        h.fillText(cf, cc, aN - 100);
        h.globalAlpha = "1.0"
    }

    function l() {
        vim.images.drawLevelNumber(h)
    }

    function V() {
        var cd, cc, ce = m ? "-- INSERT --" : "";
        if (ce === "") {
            return
        }
        h.font = "30px Arial";
        h.fillStyle = "#000";
        for (cd = -2; cd < 3; cd += 1) {
            for (cc = -2; cc < 3; cc += 1) {
                h.fillText(ce, 50 + cc, aN - 20 + cd)
            }
        }
        h.fillStyle = "#fff";
        h.fillText(ce, 50, aN - 20)
    }

    function J(co, cn, cq, cp, cm) {
        var ch, ck, cg, ci, ce, cj, cl, cf = cq,
            cd = bY.getTopX(),
            cc = bY.getTopY();
        aU = co;
        aT = cn;
        bm = cq;
        X = cp === true;
        ak = cm !== true;
        W = cm ? 4 : 1;
        if (cq === "") {
            return
        }
        ch = 0;
        ck = 0;
        h.font = aJ + "px Arial, Helvetica, sans-serif";
        for (cj = 0; cj < cf.length; cj += 1) {
            cl = h.measureText(cf[cj]);
            ch = cl.width > ch ? cl.width : ch;
            ck = ck + bK
        }
        cg = (aU - bY.getTopX()) * at - 12 + 45;
        ce = (aT - bY.getTopY()) * O - 15 - 15 - ck;
        ci = cg + 25 + ch - 1 + 25;
        if (ce < 0) {
            cc = cc - (Math.floor((0 - ce) / O) + 1)
        }
        if (ci > bW) {
            cd = cd - (Math.floor((ci - bW) / at) + 1)
        }
        bY.setTopX(cd);
        bY.setTopY(cc)
    }

    function bH() {
        J(-1, -1, "")
    }

    function C() {
        return (d != window.innerWidth - 40 || u != window.innerHeight - 50)
    }

    function aZ() {
        bU.width = window.innerWidth - 40;
        bU.height = window.innerHeight - 50;
        d = bU.width;
        u = bU.height;
        a9()
    }

    function az(cd) {
        var cc = window.performance.now();
        requestAnimationFrame(az);
        if (typeof az.lastTime === undefined) {
            az.lastTime = 1
        }
        if (!az.fpsArray) {
            az.fpsArray = [0, 0, 0, 0, 0]
        }
        aB = 1 / (cc - az.lastTime);
        az.fpsArray.shift();
        az.fpsArray.push(aB);
        aB = Math.max.apply(Math, az.fpsArray);
        if (!vim.model.isEndgame() && cd - az.lastTime < 1000 / be) {
            return
        }
        az.lastTime = cc;
        if (!a0) {
            vim.buffers.getCurrentBuffer().getEntities().update()
        }
        ca()
    }

    function n() {
        var ch, cj, cf, cg, ci, ce = vim.model,
            cd = ce.getTopX() * 3,
            cc = ce.getTopY() * 3;
        if (!n.stars) {
            n.stars = [];
            for (cf = 0; cf < 300; ++cf) {
                ci = {
                    x: Math.floor(Math.random() * bW * 4),
                    y: Math.floor(Math.random() * aN * 4),
                    w: Math.floor(Math.random() * 5) * 2 + 1,
                    delay: Math.floor(Math.random() * 5) + 1
                };
                n.stars.push(ci)
            }
        }
        h.save();
        h.strokeStyle = "rgba(255,255,255,0.2)";
        if (a0) {
            cd += (aH / at) * 3;
            cc += (aw / O) * 3
        }
        for (cf = 0; cf < n.stars.length; ++cf) {
            ci = n.stars[cf];
            ch = Math.floor(((bw + (a0 ? H : 0)) % (ci.delay * ci.w)) / ci.delay);
            cj = ch < ci.w / 2 ? ch : ci.w - ch - 1;
            for (cg = -cj - 2; cg < cj + 2; ++cg) {
                h.beginPath();
                h.moveTo(ci.x - cg - cd, ci.y - cc);
                h.lineTo(ci.x + cg - cd, ci.y - cc);
                h.stroke();
                h.moveTo(ci.x - cd, ci.y - cg - cc);
                h.lineTo(ci.x - cd, ci.y + cg - cc);
                h.stroke()
            }
        }
        h.restore()
    }

    function f() {
        var cc = vim.model.getLevel() > 13;
        if (vim.buffers.getCurrentBuffer().getName() !== "sky") {
            return
        }
        if (!f.dayGrad) {
            f.nightGrad = h.createLinearGradient(0, 0, 0, aN);
            f.nightGrad.addColorStop(0, "#1c3161");
            f.nightGrad.addColorStop(1, "#000");
            f.dayGrad = h.createLinearGradient(0, 0, 0, aN);
            f.dayGrad.addColorStop(0, "#366797");
            f.dayGrad.addColorStop(0.5, "#4f84b6");
            f.dayGrad.addColorStop(1, "#96bad9")
        }
        h.fillStyle = cc ? f.nightGrad : f.dayGrad;
        h.fillRect(0, 0, bW, aN);
        if (cc) {
            n()
        }
    }

    function i() {
        var cc, cd;
        if (vim.buffers.getCurrentBuffer().getName() !== "sky" || vim.model.getLevel() > 13) {
            return
        }
        if (!i.clouds) {
            i.clouds = [];
            cd = i.clouds;
            for (cc = 0; cc < 5; ++cc) {
                cd.push({
                    cloudType: "cloud" + Math.floor(Math.random() * 4) + "b",
                    cloudScale: Math.floor(Math.random() * 2) + 1,
                    cloudSpeed: Math.floor(Math.random() * 5) + 1,
                    cloudYPos: Math.floor(Math.random() * aN),
                    cloudXPos: Math.floor(Math.random() * bW)
                })
            }
        }
        if (bw % 100 === 0) {
            if (Math.random() > 0.5) {
                i.clouds.push({
                    cloudType: "cloud" + Math.floor(Math.random() * 4) + "b",
                    cloudScale: Math.floor(Math.random() * 2) + 1,
                    cloudSpeed: Math.floor(Math.random() * 5) + 1,
                    cloudYPos: Math.floor(Math.random() * aN),
                    cloudXPos: bW
                })
            }
        }
        cd = i.clouds;
        if (cd.length > 0 && cd[0].cloudXPos + 460 * cd[0].cloudScale < 0) {
            cd.splice(0, 1)
        }
        h.globalAlpha = "0.8";
        for (cc = 0; cc < cd.length; ++cc) {
            vim.images.drawMulScale(h, cd[cc].cloudType, cd[cc].cloudXPos, cd[cc].cloudYPos, cd[cc].cloudScale, cd[cc].cloudScale);
            cd[cc].cloudXPos -= cd[cc].cloudSpeed
        }
        h.globalAlpha = "1.0"
    }

    function ba() {
        var cc, cd;
        if (vim.buffers.getCurrentBuffer().getName() !== "sky" || vim.model.getLevel() > 13) {
            return
        }
        if (!ba.clouds) {
            ba.clouds = [];
            cd = ba.clouds;
            for (cc = 0; cc < 5; ++cc) {
                cd.push({
                    cloudType: "cloud" + Math.floor(Math.random() * 4),
                    cloudScale: 1,
                    cloudSpeed: Math.floor(Math.random() * 10) + 2,
                    cloudYPos: Math.floor(Math.random() * aN),
                    cloudXPos: Math.floor(Math.random() * bW)
                })
            }
        }
        if (bw % 100 === 0) {
            if (Math.random() > 0.5) {
                ba.clouds.push({
                    cloudType: "cloud" + Math.floor(Math.random() * 4),
                    cloudScale: 1,
                    cloudSpeed: Math.floor(Math.random() * 10) + 2,
                    cloudYPos: Math.floor(Math.random() * aN),
                    cloudXPos: bW
                })
            }
        }
        cd = ba.clouds;
        if (cd.length > 0 && cd[0].cloudXPos + 460 * cd[0].cloudScale < 0) {
            cd.splice(0, 1)
        }
        h.globalAlpha = "0.8";
        for (cc = 0; cc < cd.length; ++cc) {
            vim.images.drawMulScale(h, cd[cc].cloudType, cd[cc].cloudXPos, cd[cc].cloudYPos, cd[cc].cloudScale, cd[cc].cloudScale);
            cd[cc].cloudXPos -= cd[cc].cloudSpeed
        }
        h.globalAlpha = "1.0"
    }
    var aj = (function () {
        var cr = [],
            cp = null,
            cf = null,
            ce = null,
            cd = null,
            ci = null,
            cn = null,
            cj = null,
            cm = 0,
            ck = 0;

        function ch() {
            cp = h;
            cf = document.createElement("canvas");
            ce = cf.getContext("2d");
            cd = document.createElement("canvas");
            ci = cd.getContext("2d");
            var ct = cp.createRadialGradient(6, 6, 0, 6, 6, 6);
            ct.addColorStop(0, "rgba(30, 30, 30, 0)");
            ct.addColorStop(1, "rgba(30, 30, 30, 1)");
            ci.fillStyle = ct;
            ci.beginPath();
            ci.arc(6, 6, 6, 0, 2 * Math.PI, false);
            ci.fill();
            cn = document.createElement("canvas");
            cj = cn.getContext("2d");
            var cs = cp.createRadialGradient(3, 3, 1, 3, 3, 4);
            cs.addColorStop(0, "rgba(255, 255, 255, 1)");
            cs.addColorStop(1, "rgba(0, 0, 0, 0)");
            cj.fillStyle = cs;
            cj.beginPath();
            cj.arc(3, 3, 20, 0, 2 * Math.PI, false);
            cj.fill();
            cl(12)
        }

        function cl(cu) {
            var cv = cu * 10;
            cf.width = cv;
            cf.height = cv;
            ce.globalCompositeOperation = "source-over";
            for (var cx = 0; cx < 100; cx++) {
                var ct = cx * cu;
                var cs = ct % cv;
                var cw = Math.floor(ct / cv) * cu;
                ce.fillStyle = "hsl(" + Math.round(cx * 3.6) + ",100%,60%)";
                ce.beginPath();
                ce.arc(cs + 6, cw + 6, 5, 0, 2 * Math.PI, false);
                ce.fill();
                ce.drawImage(cd, cs, cw)
            }
        }

        function cc() {
            var cs = cr.length;
            while (cs--) {
                var ct = cr[cs];
                if (ct.update()) {
                    cr.splice(cs, 1);
                    if (!ct.usePhysics) {
                        if (Math.random() < 0.8) {
                            bD.star(ct)
                        } else {
                            bD.circle(ct)
                        }
                    }
                }
                ct.render(cp, cf, cn)
            }
        }

        function cg(cw, cv, cu, ct, cs) {
            cw = cw || {};
            cv = cv || {};
            cu = cu || {};
            cr.push(new bL({
                x: cw.x || bW * 0.5,
                y: cw.y || aN + 10
            }, {
                y: cv.y || 150 + Math.random() * 100
            }, {
                x: cu.x || Math.random() * 3 - 1.5,
                y: cu.y || 0
            }, ct || Math.floor(Math.random() * 100) * 12, cs))
        }

        function co() {
            cm = window.innerWidth;
            ck = window.innerHeight
        }

        function cq() {
            var cs = 0,
                ct = cr.length;
            while (ct--) {
                if (!cr[ct].usePhysics) {
                    ++cs
                }
            }
            return cs
        }
        return {
            initialize: ch,
            createParticle: cg,
            getNumberOfFireworks: cq,
            drawFireworks: cc,
            bigGlowCanvas: cd,
            smallGlowCanvas: cn
        }
    })();
    var bL = function (cg, cf, ce, cc, cd) {
        this.GRAVITY = 0.06;
        this.alpha = 1;
        this.easing = Math.random() * 0.02;
        this.fade = Math.random() * 0.1;
        this.gridX = cc % 120;
        this.gridY = Math.floor(cc / 120) * 12;
        this.color = cc;
        this.pos = {
            x: cg.x || 0,
            y: cg.y || 0
        };
        this.vel = {
            x: ce.x || 0,
            y: ce.y || 0
        };
        this.lastPos = {
            x: this.pos.x,
            y: this.pos.y
        };
        this.target = {
            y: cf.y || 0
        };
        this.usePhysics = cd || false
    };
    bL.prototype = {
        update: function () {
            this.lastPos.x = this.pos.x;
            this.lastPos.y = this.pos.y;
            if (this.usePhysics) {
                this.vel.y += this.GRAVITY;
                this.pos.y += this.vel.y;
                this.alpha -= this.fade
            } else {
                var cc = this.target.y - this.pos.y;
                this.pos.y += cc * (0.03 + this.easing);
                this.alpha = Math.min(cc * cc * 0.00005, 1)
            }
            this.pos.x += this.vel.x;
            return (this.alpha < 0.005 || (this.usePhysics && this.pos.y > aN))
        },
        render: function (ce, ch, cg) {
            var cc = Math.round(this.pos.x),
                ci = Math.round(this.pos.y),
                cf = (cc - this.lastPos.x) * -5,
                cd = (ci - this.lastPos.y) * -5;
            ce.save();
            ce.globalAlpha = Math.random() * this.alpha;
            ce.fillStyle = "rgba(255,255,255,0.3)";
            ce.beginPath();
            ce.moveTo(this.pos.x, this.pos.y);
            ce.lineTo(this.pos.x + 1.5, this.pos.y);
            ce.lineTo(this.pos.x + cf, this.pos.y + cd);
            ce.lineTo(this.pos.x - 1.5, this.pos.y);
            ce.closePath();
            ce.fill();
            ce.drawImage(ch, this.gridX, this.gridY, 12, 12, cc - 6, ci - 6, 12, 12);
            ce.drawImage(cg, cc - 3, ci - 3);
            ce.restore()
        }
    };
    var bD = {
        circle: function (ce) {
            var cf = 100;
            var cg = (Math.PI * 2) / cf;
            while (cf--) {
                var cc = 4 + Math.random() * 4;
                var cd = cf * cg;
                aj.createParticle(ce.pos, null, {
                    x: Math.cos(cd) * cc,
                    y: Math.sin(cd) * cc
                }, ce.color, true)
            }
        },
        star: function (cc) {
            var cs = 6 + Math.round(Math.random() * 15);
            var cg = 3 + Math.round(Math.random() * 7);
            var cn = 10;
            var ce = 80;
            var cj = -(Math.random() * 3 - 6);
            var ch = 0;
            var cd = 0;
            var ci = Math.PI * 2;
            var co = Math.random() * ci;
            do {
                ch = cd;
                cd = (cd + cg) % cs;
                var cf = (ch / cs) * ci - co;
                var cm = ((ch + cg) / cs) * ci - co;
                var ct = {
                    x: cc.pos.x + Math.cos(cf) * ce,
                    y: cc.pos.y + Math.sin(cf) * ce
                };
                var cr = {
                    x: cc.pos.x + Math.cos(cm) * ce,
                    y: cc.pos.y + Math.sin(cm) * ce
                };
                var cq = {
                    x: cr.x - ct.x,
                    y: cr.y - ct.y,
                    a: cm - cf
                };
                for (var cp = 0; cp < cn; cp++) {
                    var ck = cp / cn;
                    var cl = cf + ck * cq.a;
                    aj.createParticle({
                        x: ct.x + ck * cq.x,
                        y: ct.y + ck * cq.y
                    }, null, {
                        x: Math.cos(cl) * cj,
                        y: Math.sin(cl) * cj
                    }, cc.color, true)
                }
            } while (cd !== 0)
        }
    };

    function ai() {
        var cc;
        if (!vim.model.isEndgame()) {
            return
        }
        if (aj.getNumberOfFireworks() === 0) {
            cc = Math.floor(Math.random() * 3) + 1;
            while (cc--) {
                aj.createParticle()
            }
        }
        aj.drawFireworks()
    }

    function ca() {
        if (!a0) {
            bw = (bw + 1) % 20000;
            if (C()) {
                aZ()
            }
            b4 = new Date().getTime();
            E = new Date() / 500;
            if (Cursor.getX() !== aU || Cursor.getY() !== aT) {
                bH()
            }
        } else {
            H = (H + 1) % 20000
        }
        h.clearRect(0, 0, bW, aN);
        if (vim.model.isEndgame()) {
            ai()
        } else {
            f();
            i();
            bM();
            ba();
            P();
            aq();
            if (!N()) {
                l();
                b5()
            }
            V();
            bb();
            bd();
            aY();
            aM();
            if (!a0) {
                an()
            }
            if (ap) {
                h.fillStyle = "#000";
                h.fillRect(300, 5, 20, 20);
                h.fillStyle = "#fff";
                h.fillText(((aB * 1000) | 0).toString(), 302, 20)
            }
            bQ()
        }
    }

    function aM() {
        if (bF) {
            h.fillStyle = ac === 0 && aA > 0 && aA % 2 === 1 ? aV : "rgba(0,0,0,1.0)";
            h.fillRect(0, 0, bW, aN)
        } else {
            if (s || bX) {
                h.fillStyle = "rgba(0,0,0," + K + ")";
                h.fillRect(0, 0, bW, aN);
                K += (s ? -1 : 1) * 0.05;
                if (K < 0) {
                    s = false;
                    if (bt.length > 0) {
                        for (var cc in bt) {
                            vim.audio.play(bt[cc])
                        }
                        bt.length = 0
                    }
                }
                if (K > 1.05) {
                    bX = false;
                    if (typeof b8 !== "undefined") {
                        b8()
                    }
                    b8 = undefined
                }
            }
        }
    }

    function bG(cd) {
        var cc = cd;
        return function () {
            aK(cc);
            if (cc === 100) {
                bI = false
            }
        }
    }

    function ab() {
        var cc = 100,
            ce, cf = 1500,
            cd = 30;
        bI = true;
        q = 0;
        for (ce = 0; ce < cc; ce += 1) {
            window.setTimeout(bG(ce), cf + cd);
            cf += cd
        }
        window.setTimeout(bG(cc), cf + cd)
    }

    function I() {
        a6 = 60
    }

    function ax(ce, cd, cc) {
        ax.oldX = ce;
        ax.oldY = cd;
        ax.oldBufferName = cc;
        ax.restorePositionCB = Cursor.restorePositionCallback(ce, cd, cc);
        bJ = true;
        bp = 37
    }

    function g(cd, cc) {
        bv.push({
            x: cd,
            y: cc,
            width: 37
        })
    }

    function bS(cf, ce, cc, cd, cg) {
        bS.oldX = cf;
        bS.oldY = ce;
        bS.oldBufferName = cc;
        bS.restorePositionCB = Cursor.restorePositionCallback(cf, ce, cc, cg);
        if (!bS.entities) {
            bS.entities = []
        }
        bS.entities.push(cd);
        bu = true;
        Q = 21
    }

    function L() {
        q = -1
    }

    function bk() {
        q = 100
    }

    function b2() {
        bI = false
    }

    function bs() {
        bI = true;
        L();
        window.setTimeout(bk, 200);
        window.setTimeout(L, 500);
        window.setTimeout(bk, 900);
        window.setTimeout(L, 1100);
        window.setTimeout(bk, 1200);
        window.setTimeout(L, 1300);
        window.setTimeout(bk, 1350);
        window.setTimeout(L, 1400);
        window.setTimeout(b2, 1400)
    }

    function aL() {
        bF = false;
        s = true;
        K = 1;
        aQ()
    }

    function bA(cc) {
        bX = true;
        K = 0;
        b8 = cc
    }

    function b7() {
        bF = true
    }

    function b9(ck, cj, ci, ch, cf, cc, cm, cd, cl) {
        var cg, ce, co, cn;
        ce = Math.min(cj, ch);
        cn = Math.max(cj, ch);
        if (ce === cn) {
            cg = Math.min(ck, ci);
            co = Math.max(ck, ci)
        } else {
            cg = ce === cj ? ck : ci;
            co = ce === cj ? ci : ck
        }
        al = {
            startX: cg,
            startY: ce,
            endX: co,
            endY: cn,
            textArea: cf,
            count: 7,
            inputCursorBefore: cc,
            color: cm,
            isDirectLine: cd,
            reverseSelection: cl
        }
    }

    function t() {
        bY.setTopY(bY.getCursorY())
    }

    function af() {
        bY.setTopY(Math.max(0, bY.getCursorY() - av + 1))
    }

    function bE() {
        bY.setTopY(Math.max(0, bY.getCursorY() - Math.floor(av / 2) + 1))
    }

    function b(cf, cg, ce, cd) {
        var cc, cn, co, cl, ci, cp, cq, cj = cf.split("\n"),
            cs = bY.getTopX(),
            cr = bY.getTopY(),
            ch = vim.screens["game-screen"],
            ct, ck, cm;
        G = ce || bY.getCursorX();
        F = cd || bY.getCursorY();
        bj = cf;
        bP = cg || false;
        if (cf === "") {
            return
        }
        bz = cf.length > 7 ? 4 : 2;
        bd.blinkCounter = 0;
        cm = vim.buffers.getCurrentBuffer().getTextAreas().get(G, F);
        if (cm && cm.isBossMode()) {
            return
        }
        if (cf === "H") {
            return
        }
        cc = 0;
        cn = 0;
        h.font = aJ + "px Arial, Helvetica, sans-serif";
        for (cp = 0; cp < cj.length; cp += 1) {
            cq = h.measureText(cj[cp]);
            cc = cq.width > cc ? cq.width : cc;
            cn = cn + bK
        }
        co = (G - bY.getTopX()) * at - 12 + 45;
        ci = (F - bY.getTopY()) * O - 15 - 15 - cn;
        ck = ci + cn + 25 + 25;
        cl = co + 25 + cc - 1 + 25;
        if (ci < 0) {
            cr = cr - (Math.floor((0 - ci) / O) + 1)
        }
        if (cl > bW) {
            cs = cs + (Math.floor((cl - bW) / at) + 1)
        }
        if (ch.getColonCommand() !== "") {
            ct = ch.getColonMessageTopYOffset();
            if (ck > ct) {
                cr = cr + (Math.floor((ck - ct) / O) + 1)
            }
        }
        bY.setTopX(cs);
        bY.setTopY(cr)
    }

    function bg() {
        bu = false;
        bJ = false;
        vim.input.enableKeys();
        Cursor.blink()
    }

    function ar(ce, cd, cc) {
        bZ.push({
            topX: vim.model.getTopX(),
            topY: vim.model.getTopY(),
            px: (ce - vim.model.getTopX()) * at - 22,
            py: (cd - vim.model.getTopY()) * O - 30,
            text: cc,
            count: bi
        })
    }

    function ag(cd, cg, cc, cf, ce) {
        a3.push({
            topX: vim.model.getTopX(),
            topY: vim.model.getTopY(),
            px: (cd - vim.model.getTopX()) * at + (cc ? cc : 0),
            py: (cg - vim.model.getTopY()) * O + (cf ? cf : 0),
            scale: ce,
            count: bf
        })
    }

    function M() {
        m = true
    }

    function bq() {
        m = false
    }

    function bn(co, cl, cm, ct) {
        var cg = vim.model,
            ce = cm.getMaxLength(),
            cc = cm.getNumberOfLines(),
            cx = cm.getTopX(),
            cv = cm.getTopY(),
            cd = cx + ce - 1,
            cA = cv + cc - 1,
            ck = cg.getTopX() + p,
            cn = cg.getTopY() + ao,
            cs = aG - 2 * p,
            cf = av - 2 * ao - 1,
            cr = ck + cs,
            ci = cn + cf,
            cq, cp, cz, cj, cy = cg.getTopX(),
            cw = cg.getTopY(),
            ch = vim.buffers.getCurrentBuffer().getBoard(),
            cu = ch.getBG(co, cl) !== ch.MISSING && ch.getBG(co, cl) !== ch.SKY_MISSING && ch.getBG(co, cl) !== ch.DARK;
        if (cm.isBossMode()) {
            ah();
            cq = cy !== cg.getTopX();
            cp = cw !== cg.getTopY()
        } else {
            cq = !((cx >= ck && cd <= cr) || (cx < ck && cd > cr));
            cp = !((cv >= cn && cA <= ci) || (cv < cn && cA > ci));
            if (cq) {
                if (cx < ck) {
                    cz = 0 - (ck - cx);
                    if (co - cz > cr) {
                        cz = cz + (co - cz - cr)
                    }
                } else {
                    cz = cd - cr;
                    if (co - cz < ck) {
                        cz = cz - (ck - co + cz)
                    }
                }
            }
            if (cp) {
                if (cv < cn) {
                    cj = 0 - (cn - cv);
                    if (cl - cj > ci) {
                        cj = cj + (cl - cj - ci)
                    }
                } else {
                    cj = cA - ci;
                    if (cl - cj < cn) {
                        cj = cj - (cn - cl + cj)
                    }
                }
            }
            if (cq) {
                cg.setTopX(cg.getTopX() + cz)
            }
            if (cp) {
                cg.setTopY(cg.getTopY() + cj)
            }
        }
        if ((cq || cp) && cu && ct !== true) {
            aX(cy, cw, cg.getTopX(), cg.getTopY())
        } else {
            ah()
        }
    }

    function bl(ce, cd, cf, cc) {
        if (typeof bl.bugs === "undefined") {
            bl.bugs = []
        }
        bl.bugs.push({
            context: ce,
            xpos: cd,
            ypos: cf,
            entity: cc
        })
    }

    function a5() {
        var cd, cc, ce;
        if (!bl.bugs && !ce) {
            return
        }
        for (cd = 0; cd < bl.bugs.length; ++cd) {
            cc = bl.bugs[cd];
            if (cc.entity instanceof BigBug) {
                ce = cc
            } else {
                ad(cc.context, cc.xpos, cc.ypos, cc.entity)
            }
        }
        if (ce) {
            b6(ce.context, ce.xpos, ce.ypos, ce.entity)
        }
        bl.bugs = []
    }

    function ad(cg, cf, cc, cd) {
        var ce = cd.getVolPattern();
        if ((ce !== "Bram" && ce !== "Uganda" && ce !== "Charity") || !cd.isFrozen()) {
            vim.images.draw(cg, cd.getImageName(), cf + cd.getXOffset(), cc - at / 3 + cd.getYOffset())
        }
        if (!cd.isVolHidden()) {
            cg.font = "13px Courier New";
            cg.fillStyle = "#000";
            cg.fillText(ce, cf + cd.getXOffset() + 16 - cg.measureText(ce).width / 2, cc + cd.getYOffset() + 31);
            cg.fillStyle = "#fff";
            cg.fillText(ce, cf + cd.getXOffset() + 17 - cg.measureText(ce).width / 2, cc + cd.getYOffset() + 32)
        }
    }

    function b6(cf, ce, cc, cd) {
        var cg = cd.getHitPoints();
        vim.images.draw(cf, cd.getImageName(), ce + cd.getXOffset(), cc - at / 3 + cd.getYOffset());
        cf.fillStyle = "#000";
        cf.fillRect(ce + cd.getXOffset() + 16, cc + cd.getYOffset(), 102, 12);
        cf.fillStyle = cg > 2 ? "#0f0" : cg > 1 ? "#ff0" : "#f00";
        cf.fillRect(ce + cd.getXOffset() + 16 + 1, cc + cd.getYOffset() + 1, Math.floor((100 * cd.getHitPoints()) / 5), 10)
    }

    function a7(cc) {
        bt.push(cc)
    }

    function an() {
        var co = an.x,
            cm = an.y,
            cj = 20,
            cf = typeof an.dropHeight === "number" ? an.dropHeight : cj,
            cd = an.times || 0,
            cl = 2,
            cp = 2,
            ck = "#fff",
            ce = "#000",
            cg = 20,
            cc = 5,
            cn = 10,
            ci = co + at / 2,
            ch = cm - 10 - cg - cf;
        if (co === 0 || cm === 0 || cd === 0) {
            return
        }
        if (cf > 0) {
            an.dropHeight = Math.max(0, cf - cl);
            if (an.dropHeight === 0 && an.times > 0) {
                an.times--;
                an.dropHeight = cj
            }
        }
        h.save();
        h.lineWidth = 5;
        h.lineCap = "round";
        h.strokeStyle = ce;
        h.beginPath();
        h.moveTo(ci + cp, ch + cp);
        h.lineTo(ci + cp, ch + cg + cp);
        h.moveTo(ci - cc + cp, ch + cg - cn + cp);
        h.lineTo(ci + cp, ch + cg + cp);
        h.moveTo(ci + cc + cp, ch + cg - cn + cp);
        h.lineTo(ci + cp, ch + cg + cp);
        h.stroke();
        h.strokeStyle = ck;
        h.beginPath();
        h.moveTo(ci, ch);
        h.lineTo(ci, ch + cg);
        h.moveTo(ci - cc, ch + cg - cn);
        h.lineTo(ci, ch + cg);
        h.moveTo(ci + cc, ch + cg - cn);
        h.lineTo(ci, ch + cg);
        h.stroke();
        h.restore()
    }

    function aQ() {
        if (vim.screens && vim.screens["game-screen"] && vim.screens["game-screen"].isTitleScreenOn()) {
            return
        }
        an.times = 2;
        an.x = an.y = 0
    }

    function N() {
        if (vim.screens["game-screen"].isTitleScreenOn()) {
            return true
        }
        var ch = vim.buffers.getCurrentBuffer().getTextAreas(),
            cf = vim.model.getTopX(),
            cd = vim.model.getTopY(),
            cg, ce, cc;
        for (cg = 0; cg < 4; ++cg) {
            for (ce = 0; ce < 5; ++ce) {
                cc = ch.get(cf + ce + 1, cd + cg);
                if (cc && cc.isBossMode()) {
                    return true
                }
            }
        }
        return false
    }

    function ae() {
        var co = vim.buffers.getCurrentBuffer(),
            cg = Cursor.getX(),
            cf = Cursor.getY(),
            cj = co.getTextAreas().get(cg, cf),
            cm = co.getBoard(),
            ck = vim.model,
            ce = "Biug",
            cn, cl, cp, ci, ch, cd, cc;
        if (!cj) {
            cg = ax.oldX;
            cf = ax.oldY;
            cj = co.getTextAreas().get(cg, cf)
        }
        if (!cj || !cj.isBossMode() || co.getName() !== "underground" || ck.getLevel() !== 14) {
            return
        }
        if (cm.getBG(cj.getTopX(), cj.getTopY()) === cm.PLAIN) {
            return
        }
        for (ci = 0; ci < ce.length; ++ci) {
            cn = ce.charAt(ci);
            if (cn === "B") {
                cl = ck.getGlobalMark("B");
                cp = cl && cl.bufferName === "underground" && cl.row === 8 && cl.col === 1
            } else {
                cl = cj.getLocalMark(cn);
                switch (cn) {
                    case "i":
                        cp = cl && cl.row === 1 && cl.col === 16;
                        break;
                    case "u":
                        cp = cl && cl.row === 16 && cl.col === 16;
                        break;
                    case "g":
                        cp = cl && cl.row === 8 && cl.col === 30;
                        break;
                    default:
                        cp = false;
                        break
                }
            }
            if (cp) {
                a(h, cj.getTopX() + cl.col, cj.getTopY() + cl.row)
            }
        }
    }

    function Y(cn, ck) {
        var ch = [],
            co = [],
            cc = ck,
            cm = 80,
            ci = 1 / cm,
            cf, ce, cd, cl, cp = 0,
            cg, cj = 4;
        ch.push(0);
        for (cf = 0; cf < Math.floor(cc / 4); ++cf) {
            ch.push(Math.random())
        }
        ch.push(1);
        ch.sort(function (cr, cq) {
            return cr - cq
        });
        co.push({
            x: cn,
            y: 0
        });
        for (cf = 1; cf < ch.length; ++cf) {
            cd = cc * ci * (ch[cf] - ch[cf - 1]);
            cg = ch[cf] > 0.95 ? 20 * (1 - ch[cf]) : 1;
            cl = Math.floor(Math.random() * 2 * cm - cm);
            cl -= (cl - cp) * (1 - cd);
            cl *= cg;
            cp = cl;
            co.push({
                x: cn + cl,
                y: Math.floor(ch[cf] * cc)
            })
        }
        co.push({
            x: cn,
            y: ck
        });
        for (ce = cj; ce > 0; --ce) {
            h.strokeStyle = ce === 1 ? "#fff" : "rgba(255,255,0," + (ce === 1 ? 1 : 0.75 / ce) + ")";
            h.lineWidth = ce === 1 ? 1 : ce * 2;
            h.beginPath();
            h.moveTo(co[0].x, co[0].y);
            for (cf = 1; cf < co.length; ++cf) {
                h.lineTo(co[cf].x, co[cf].y)
            }
            h.stroke()
        }
    }

    function aI(cc, ce, cd) {
        bR.push({
            x: cc,
            y: ce,
            bufferName: cd || vim.buffers.getCurrentBuffer().getName(),
            count: bV
        })
    }

    function a2() {
        var cg = vim.buffers.getCurrentBuffer().getName(),
            cf = vim.model.getTopX(),
            ce = vim.model.getTopY(),
            cd, cc, cj, ch, ci;
        if (bR.length > 0 && bR[0].count === 0) {
            bR.splice(0, 1)
        }
        for (cd = 0; cd < bR.length; ++cd) {
            if (cg === bR[cd].bufferName) {
                cc = (bR[cd].x - cf) * at + 18;
                cj = (bR[cd].y - ce) * O + 28;
                ch = 20 + bV - bR[cd].count;
                ci = h.createRadialGradient(cc, cj, ch, cc, cj, ch + 20);
                ci.addColorStop(0, "rgba(0,0,0,0)");
                ci.addColorStop(0.5, "#fff");
                ci.addColorStop(1, "rgba(0,0,0,0)");
                h.strokeStyle = ci;
                h.fillStyle = ci;
                h.lineWidth = 5;
                h.beginPath();
                h.arc(cc, cj, ch + 20, 0, 2 * Math.PI, true);
                h.fill()
            }
            if (bR[cd].count > 0) {
                --bR[cd].count
            }
        }
    }

    function bT(cc, ce, cd) {
        aW.push({
            x: cc,
            y: ce,
            bufferName: cd || vim.buffers.getCurrentBuffer().getName(),
            count: bc,
            alpha: 1
        })
    }

    function bB() {
        var cg = vim.buffers.getCurrentBuffer().getName(),
            cf = vim.model.getTopX(),
            ce = vim.model.getTopY(),
            cd, cc, cj, ch, ci;
        if (aW.length > 0 && aW[0].count === 0) {
            aW.splice(0, 1)
        }
        for (cd = 0; cd < aW.length; ++cd) {
            if (cg === aW[cd].bufferName) {
                cc = (aW[cd].x - cf) * at;
                cj = (aW[cd].y - ce) * O + 20;
                Y(cc + Math.floor(Math.random() * at), cj + Math.floor(Math.random() * O))
            }
            if (aW[cd].count > 0) {
                --aW[cd].count
            }
        }
    }

    function aS() {
        var ce, cf, cd, cc, cg;
        if (isNaN(vim.expirationTime)) {
            return "Timer inactive"
        }
        ce = Math.trunc((vim.expirationTime - Date.now()) / 1000);
        if (ce < 0) {
            return "License expired!"
        }
        cf = Math.floor(ce % 60);
        cd = Math.floor(ce / 60) % 60;
        cc = Math.floor(ce / 60 / 60) % 24;
        cg = Math.floor(ce / 60 / 60 / 24);
        if (cg > 1) {
            return cg + " days left"
        }
        if (cg === 1) {
            return "1 day left"
        }
        if (cc > 4) {
            return cc + " hours left"
        }
        return ((cc > 0 ? cc + " : " : "") + (cd < 10 ? "0" + cd : cd) + " : " + (cf < 10 ? "0" + cf : cf))
    }

    function aR(ch, cg) {
        var ce, cd, cc, cf;
        cf = h.measureText(cg).width;
        cc = Math.floor((bW - cf) / 2);
        h.fillStyle = "#000";
        for (ce = -2; ce < 3; ce += 1) {
            for (cd = -2; cd < 3; cd += 1) {
                h.fillText(cg, cc + cd, ch + ce)
            }
        }
        h.fillStyle = "#fff";
        h.fillText(cg, cc, ch)
    }

    function bQ() {
        var cf, cd, ci, ch, ce, cc, cg;
        if (vim.expirationTime) {
            ch = aS();
            if (ch === "License expired!" && ch !== bQ.prevString) {
                vim.login.logout(false, true, true, vim.emailaddr)
            }
            bQ.prevString = ch;
            h.font = "30px Arial";
            aR(50, ch);
            h.font = "15px Arial";
            aR(75, "to license expiration")
        }
    }
    return {
        init: bo,
        draw: az,
        doDraw: ca,
        recalcTopXY: ah,
        recalcTopXYWithTextArea: e,
        centerScreenAroundCursor: aP,
        notifySpeech: J,
        notifyPrincessFlashAnimation: a8,
        notifyKeyboardKeyAnimation: v,
        notifyTextCompleted: aC,
        notifyFadeInAnimation: aL,
        notifyFadeOutAnimation: bA,
        notifyShowRangeAnimation: b9,
        notifyDisappearingCursorAnimation: bS,
        notifyFallingCursorAnimation: ax,
        notifyFallingBlockAnimation: g,
        notifyBubbleUp: ar,
        notifyExplosion: ag,
        notifyBlank: b7,
        notifyScrollMode: aX,
        notifyAppearingSelector: j,
        notifyPointCursor: aQ,
        notifyDoubleEscMsg: I,
        notifyAppearingGlow: aI,
        notifyLightning: bT,
        notifyCandleLightAnimation: ab,
        notifyLightsOnAnimation: bs,
        scrollTop: t,
        scrollMiddle: bE,
        scrollBottom: af,
        showAsMuchAsPossible: bn,
        resetScrollMode: aa,
        setCursorCommand: b,
        cancelCursorPositionAnimations: bg,
        notifyInputMode: M,
        notifyCommandMode: bq,
        isFadeIn: function () {
            return s
        },
        scheduleSoundAfterFadeIn: a7,
        getHeightInCells: function () {
            return av
        },
        testDraw: function () {
            var cc = window.performance.now(),
                ce = 1000,
                cd;
            while (ce--) {
                ca()
            }
            cd = window.performance.now();
            return cd - cc
        },
        testDrawOneLetter: function () {
            var cd = document.getElementById("screen"),
                cc = cd.getContext("2d"),
                ce = window.performance.now(),
                cg = 100000,
                cf;
            while (cg--) {
                U(cc, "A", 100, 100, "completed", false)
            }
            cf = window.performance.now();
            return cf - ce
        },
        testDrawLevelNumber: function () {
            var cd = document.getElementById("screen"),
                cc = cd.getContext("2d"),
                ce = window.performance.now(),
                cg = 1000,
                cf;
            while (cg--) {
                vim.images.drawLevelNumber(cc)
            }
            cf = window.performance.now();
            return cf - ce
        }
    }
})();
var Cursor = (function () {
    var h, E, f, c = -1,
        g, C, B, a, z, e, d, j;

    function l() {
        return {
            x: h,
            y: f,
            rememberedX: E
        }
    }

    function w(G) {
        if (c !== -1) {
            window.clearInterval(c);
            c = -1
        }
        g = false;
        d = false;
        j = false;
        h = G.x;
        f = G.y;
        E = G.rememberedX;
        if (c === -1) {
            c = window.setInterval(t, 400)
        }
    }

    function t() {
        g = g ? false : true
    }

    function u(G, H) {
        h = G;
        f = H;
        E = h;
        d = false;
        j = false;
        if (c === -1) {
            c = window.setInterval(t, 400)
        }
    }

    function v(I, Q) {
        var O, K, M = true,
            N = h,
            P = vim.buffers.getCurrentBuffer().getBoard(),
            H = false,
            J, L, G = vim.buffers.getCurrentBuffer();
        if (I !== 0 && G.canMoveTo(h, f, h + I, f)) {
            h = h + I;
            E = h;
            J = b(h, f);
            if (J && P.getBG(h, f) !== P.MISSING && P.getBG(h, f) !== P.SKY_MISSING) {
                J.cursorPositionUpdate(h, f)
            }
            M = false
        }
        if (Q !== 0) {
            if (P.getBG(h, f + Q) === P.WATER) {
                N = h;
                while (G.canMoveTo(N, f, N - 1, f) && P.getBG(N - 1, f) !== P.MISSING && P.getBG(N - 1, f) !== P.SKY_MISSING && P.getBG(N - 1, f) !== P.DARK) {
                    N -= 1;
                    if (G.canMoveTo(N, f, N, f + Q)) {
                        break
                    }
                }
            } else {
                if (vim.model.isValidCursorPosition(h, f + Q)) {
                    if (E === -1) {
                        E = h
                    }
                    N = h;
                    while (N < E && G.canMoveTo(N, f, N + 1, f + Q)) {
                        N += 1
                    }
                }
            }
            L = G.getTextAreas().get(h, f);
            if (typeof L !== "undefined") {
                N = Math.min(N, h)
            }
            if (G.canMoveTo(N, f, N, f + Q)) {
                f = f + Q;
                h = N;
                if (typeof L !== "undefined") {
                    E = h
                }
                J = b(h, f);
                if (J && P.getBG(h, f) !== P.MISSING && P.getBG(h, f) !== P.SKY_MISSING) {
                    J.cursorPositionUpdate(h, f)
                }
                M = false
            }
        }
        if ((I !== 0 || Q !== 0) && M) {
            O = vim.buffers.getCurrentBuffer().getEntities().list(N + I, f + Q);
            for (K = 0; K < O.length; K += 1) {
                if (O[K].isBlocking() === true) {
                    H = O[K].collide() || H
                }
            }
        }
        return H
    }

    function n(K, S, G) {
        var T, J, I, N, M, H = false,
            U, V, R = vim.board,
            Q, O, L, P = vim.model;
        D();
        T = vim.buffers.getCurrentBuffer().getTextAreas().get(h, f);
        U = typeof T !== "undefined" && G > 1;
        U = U || (typeof T !== "undefined" && f + S >= T.getTopY() && f + S < T.getTopY() + T.getNumberOfLines() && h + K >= T.getTopX() && h + K < T.getTopX() + T.getLineLength(f - T.getTopY()));
        if (!U) {
            for (J = 0; J < G; ++J) {
                I = b(h + K, f + S);
                if (I !== T && G > 1) {
                    break
                }
                if (typeof T !== "undefined" && typeof targetTA === "undefined" && T.getLimit() > 0) {
                    if (P.isValidCursorPosition(h + K, f + S) && R.getBG(h + K, f + S) !== R.MISSING && R.getBG(h + K, f + S) !== R.SKY_MISSING && R.getBG(h + K, f + S) !== R.DARK) {
                        L = P.getKeyPressCountDownBG(h, f);
                        if (L === " " || L === R.MISSING || L === R.SKY_MISSING || L === R.WATER || L === R.LAVA) {
                            Game.setCursorCommand("Stepping off this text now will\nleave me with no way to return.", true);
                            return false
                        }
                    }
                }
                N = h;
                M = f;
                H = v(K, S);
                if (H || (N === h && M === f)) {
                    return H
                }
                if (R.getBG(h, f) === R.MISSING || R.getBG(h, f) === R.SKY_MISSING) {
                    return false
                }
            }
        } else {
            V = K ? K > 0 ? "l" : "h" : S > 0 ? "j" : "k";
            N = h;
            M = f;
            return A(V, false, G)
        }
        return false
    }

    function r() {
        if (c === -1) {
            c = window.setInterval(t, 400)
        }
    }

    function D() {
        if (c !== -1) {
            window.clearInterval(c);
            c = -1
        }
        g = false;
        t()
    }

    function q(G, J, I, H) {
        C = G;
        B = J;
        a = I;
        e = H
    }

    function i(I, H, G, J) {
        j = true;
        return function () {
            var N = vim.buffers.getCurrentBuffer(),
                M = vim.buffers.getBuffer(G),
                L = N.getName(),
                O = N.getTextAreas().get(Cursor.getX(), Cursor.getY()),
                K = M.getTextAreas().get(I, H);
            if (G === L && (O === K || typeof K === "undefined")) {
                Cursor.set(I, H);
                if (typeof K === "undefined") {
                    vim.model.keypressCountdownFinished(true)
                } else {
                    K.cursorPositionUpdate(I, H)
                }
                vim.model.readjustViewToCursorPosition()
            } else {
                if (G === L && (typeof O === "undefined" && typeof K !== "undefined" && K.getLimit() > 0)) {
                    Cursor.set(I, H);
                    K.cursorPositionUpdate(I, H);
                    vim.model.readjustViewToCursorPosition()
                } else {
                    vim.model.keypressCountdownFinished(true);
                    if (G !== L) {
                        vim.buffers.switchTo(G, !J);
                        vim.screens["game-screen"].setColonCommand("Editing buffer " + G);
                        vim.view.notifyFadeInAnimation()
                    }
                    Cursor.set(I, H);
                    vim.model.readjustViewToCursorPosition();
                    if (!K || !K.isBossMode()) {
                        Game.scrollMiddle()
                    }
                }
            }
            r();
            p();
            j = false
        }
    }

    function m(G, H) {
        h = G;
        f = H;
        E = h
    }

    function b(H, M) {
        var I, L, J = vim.board,
            G, K = vim.buffers.getCurrentBuffer().getTextAreas();
        I = K.get(H, M);
        if (typeof I !== "undefined") {
            return I
        }
        if (J.isCodeBG(H, M)) {
            G = H;
            while (J.isCodeBG(G, M)) {
                --G
            }++G
        }
        I = K.get(G, M);
        if (typeof I !== "undefined") {
            return I
        }
        I = K.get(G, M - 1);
        if (typeof I !== "undefined" && M >= I.getTopY() && M < I.getTopY() + I.getNumberOfLines() && I.getLineLength(M - I.getTopY()) === 0) {
            return I
        }
        I = K.get(G, M + 1);
        if (typeof I !== "undefined" && M >= I.getTopY() && M < I.getTopY() + I.getNumberOfLines() && I.getLineLength(M - I.getTopY()) === 0) {
            return I
        }
        return undefined
    }

    function F() {
        var H, K, I = vim.board,
            G, J = vim.buffers.getCurrentBuffer().getTextAreas();
        H = J.get(h, f);
        if (typeof H !== "undefined") {
            return H
        }
        if (I.isCodeBG(h, f)) {
            G = h;
            while (I.isCodeBG(G, f)) {
                --G
            }++G
        }
        H = J.get(G, f);
        if (typeof H !== "undefined") {
            if (vim.model.isValidCursorPosition(G + H.getLineLength(f - H.getTopY()) - 1, f)) {
                h = G + H.getLineLength(f - H.getTopY()) - 1;
                return H
            } else {
                return undefined
            }
        }
        H = J.get(G, f - 1);
        if (typeof H !== "undefined" && H.getLineLength(f - H.getTopY()) === 0) {
            if (vim.model.isValidCursorPosition(H.getTopX(), f)) {
                h = H.getTopX();
                return H
            } else {
                return undefined
            }
        }
        H = J.get(G, f + 1);
        if (typeof H !== "undefined" && H.getLineLength(f - H.getTopY()) === 0) {
            if (vim.model.isValidCursorPosition(H.getTopX(), f)) {
                h = H.getTopX();
                return H
            } else {
                return undefined
            }
        }
        return undefined
    }

    function A(U, M, G, V) {
        var J, Y, Q, R, L, K, H, aa, Z, O, X, N, P, S, I, W, T;
        Q = (parseInt(U, 10) || 1) * (typeof G === "undefined" ? 1 : G);
        R = isNaN(parseInt(U, 10)) || U === "0" ? 0 : ("" + parseInt(U, 10)).length;
        L = U.charAt(R);
        K = R + 1 < U.length ? U.charAt(R + 1) : "";
        Y = F();
        if (typeof Y === "undefined" && L !== "`" && L !== "'") {
            Game.setCursorCommand("'" + L + "' can only be used on text");
            return false
        }
        switch (L) {
            case "w":
                J = Y.nextWordPos(h, f, false, Q);
                break;
            case "W":
                J = Y.nextWordPos(h, f, true, Q);
                break;
            case "e":
                J = Y.endWordPos(h, f, false, Q);
                break;
            case "E":
                J = Y.endWordPos(h, f, true, Q);
                break;
            case "b":
                J = Y.prevWordPos(h, f, false, Q);
                break;
            case "B":
                J = Y.prevWordPos(h, f, true, Q);
                break;
            case "x":
                J = Y.nextCharPos(h, f, Q - 1);
                break;
            case "0":
                J = Y.hardBOLPos(h, f);
                break;
            case "^":
                J = Y.softBOLPos(h, f);
                break;
            case "|":
                J = Y.columnPos(h, f, Q);
                break;
            case "$":
                J = Y.endOfLine(h, f, Q);
                break;
            case "f":
                J = Y.findNextInLine(h, f, K, Q);
                break;
            case "F":
                J = Y.findPrevInLine(h, f, K, Q);
                break;
            case "t":
                J = Y.findNextTillInLine(h, f, K, Q);
                break;
            case "T":
                J = Y.findPrevTillInLine(h, f, K, Q);
                break;
            case "%":
                J = Y.findMatchingBracket(h, f);
                break;
            case "G":
                if (!parseInt(U, 10)) {
                    J = Y.lastLineSoftBOLPos(h, f)
                } else {
                    J = Y.gotoSoftBOLPosInLine(h, f, Q)
                }
                break;
            case "g":
                if (U.charAt(R + 1) === "g") {
                    if (!parseInt(U, 10)) {
                        J = Y.firstLineSoftBOLPos(h, f)
                    } else {
                        J = Y.gotoSoftBOLPosInLine(h, f, Q)
                    }
                }
                break;
            case "*":
            case "#":
                J = Y.getNextHighlightedPosition(h, f, L === "*", Q);
                break;
            case "/":
            case "?":
                J = Y.getNextHighlightedPosition(h, f, L === "/", Q);
                break;
            case "n":
            case "N":
                J = Y.getNextHighlightedPosition(h, f, (L === "n" && "*/".indexOf(vim.model.getGlobalSearchStr().charAt(0)) !== -1) || (L === "N" && "#?".indexOf(vim.model.getGlobalSearchStr().charAt(0)) !== -1), Q);
                break;
            case "d":
                J = Y.endOfLine(h, f, Q);
                break;
            case "Y":
            case "y":
                J = Y.endOfLine(h, f, Q);
                break;
            case "[":
            case "]":
                J = Y.findUnmatchedBracket(h, f, K, Q);
                break;
            case "}":
                J = Y.getNextParagraphStart(h, f, Q);
                break;
            case "{":
                J = Y.getPrevParagraphStart(h, f, Q);
                break;
            case ")":
                J = Y.getNextSentenceStart(h, f, Q);
                break;
            case "(":
                J = Y.getPrevSentenceStart(h, f, Q);
                break;
            case "H":
                J = Y.gotoSoftBOLPosInLine(h, f, Math.max(vim.model.getTopY() - Y.getTopY(), 0) + Q);
                break;
            case "M":
                aa = Y.gotoSoftBOLPosInLine(h, f, Math.max(vim.model.getTopY() - Y.getTopY(), 0) + 1);
                Z = Y.gotoSoftBOLPosInLine(h, f, Math.min(vim.model.getTopY() + vim.view.getHeightInCells() - Y.getTopY() - 1, Y.getNumberOfLines() + 1 - 1));
                J = {
                    x: aa.x,
                    y: Math.floor((aa.y + Z.y) / 2)
                };
                break;
            case "L":
                J = Y.gotoSoftBOLPosInLine(h, f, Math.min(vim.model.getTopY() + vim.view.getHeightInCells() - Y.getTopY() - Q, Y.getNumberOfLines() + 1 - Q));
                break;
            case "'":
            case "`":
                P = vim.model.getGlobalMark(K);
                if (typeof Y !== "undefined" && !P) {
                    P = Y.getLocalMark(K)
                }
                if (P) {
                    if (typeof P.bufferName !== "undefined") {
                        Y = vim.buffers.getBuffer(P.bufferName).getTextAreas().get(P.x, P.y);
                        if (vim.buffers.getCurrentBuffer().getName() !== P.bufferName) {
                            if (M) {
                                S = P.bufferName
                            } else {
                                vim.buffers.switchTo(P.bufferName);
                                vim.screens["game-screen"].setColonCommand("Editing buffer " + P.bufferName)
                            }
                        }
                    }
                    if (L === "'") {
                        J = Y.gotoSoftBOLPosInLine(Y.getTopX() + Math.min(P.col, Y.getLineLength(P.row) - 1), Y.getTopY() + P.row, P.row + 1)
                    } else {
                        J = {
                            x: Y.getTopX() + Math.min(P.col, Y.getLineLength(P.row) - 1),
                            y: Y.getTopY() + P.row
                        }
                    }
                } else {
                    return false
                }
                break;
            case "h":
                J = Y.prevCharPos(h, f, Q);
                break;
            case "l":
                J = Y.nextCharPos(h, f, Q);
                break;
            case "j":
                J = Y.charBelowPos(h, f, E, Q);
                break;
            case "k":
                J = Y.charAbovePos(h, f, E, Q);
                break;
            default:
                return false
        }
        if (typeof J === "undefined") {
            return false
        }
        if (M) {
            q(J.x, J.y, S || vim.buffers.getCurrentBuffer().getName(), J.wordOutOfBounds)
        }
        if (vim.model.isValidCursorPosition(J.x, J.y)) {
            if (!M) {
                H = Y.getSpecialArea(h, f);
                if (L === "k" || L === "j") {
                    h = J.x;
                    f = J.y
                } else {
                    m(J.x, J.y);
                    if (L === "$") {
                        E = -1
                    } else {
                        if (L === "|") {
                            E = Y.getTopX() - 1 + Q
                        }
                    }
                }
                if (vim.board.getBG(J.x, J.y) !== vim.board.MISSING && vim.board.getBG(J.x, J.y) !== vim.board.SKY_MISSING) {
                    Y.cursorPositionUpdate(J.x, J.y)
                }
            }
            return true
        } else {
            I = vim.buffers.getCurrentBuffer().getEntities();
            T = I.list(J.x, J.y);
            for (W = 0; W < T.length; W += 1) {
                if (!T[W].isInvisible() && T[W].isBlocking() && (T[W] instanceof Door || (T[W] instanceof ClosedChest && T[W].isClosed))) {
                    T[W].collide();
                    return true
                }
            }
        }
        return false
    }

    function s(G) {
        return A(G, false)
    }

    function k() {
        d = true
    }

    function p() {
        d = false
    }

    function o() {
        return j
    }
    return {
        init: u,
        move: n,
        doMotion: A,
        doMotionNoSimulation: s,
        blink: r,
        stopBlink: D,
        getX: function () {
            return h
        },
        getY: function () {
            return f
        },
        getWordOutOfBounds: function () {
            return z
        },
        getSimulationX: function () {
            return C
        },
        getSimulationY: function () {
            return B
        },
        getSimulationBufferName: function () {
            return a
        },
        getSimulationWordOutOfBounds: function () {
            return e
        },
        isOn: function () {
            return g && !d
        },
        isGluedToEOL: function () {
            return E === -1
        },
        hide: k,
        unhide: p,
        isWaitingForRestorePosition: o,
        set: m,
        restorePositionCallback: i,
        getData: l,
        restore: w
    }
})();
vim.gamestate = (function () {
    var a = "start.game",
        i, d;

    function l(t) {
        var u = JSON.parse(t),
            s;
        if (typeof u.buffers === "undefined") {
            vim.buffers.init();
            s = vim.buffers.getCurrentBuffer();
            s.getBoard().restore(u.board);
            vim.board = s.getBoard();
            Cursor.restore(u.cursor);
            vim.validKeys.restore(u.validKeys);
            vim.inventory.restore(u.inventory);
            s.getEntities().restore(u.entities);
            s.getTextAreas().restore(u.textareas);
            vim.timer.restore(u.timer);
            if (u.view) {
                vim.model.restore(u.view)
            } else {
                vim.model.restore(u.model)
            }
            if (u.regs) {
                vim.regs.restore(u.regs)
            } else {
                vim.regs.reset()
            }
        } else {
            vim.buffers.restore(u.buffers);
            vim.board = vim.buffers.getCurrentBuffer().getBoard();
            Cursor.restore(u.cursor);
            vim.validKeys.restore(u.validKeys);
            vim.inventory.restore(u.inventory);
            vim.timer.restore(u.timer);
            vim.model.restore(u.model);
            vim.regs.restore(u.regs)
        }
    }

    function n() {
        var s = {};
        s.buffers = vim.buffers.getData();
        s.cursor = Cursor.getData();
        s.validKeys = vim.validKeys.getData();
        s.inventory = vim.inventory.getData();
        s.timer = vim.timer.getData();
        s.model = vim.model.getData();
        s.regs = vim.regs.getData();
        return JSON.stringify(s)
    }

    function h(u, w) {
        var v = n(),
            t = w ? "1" : "0",
            s;

        s = "operation=save&force=" + t + "&filename=" + encodeURIComponent(u) + "&state_string=" + encodeURIComponent(v),
            d = u,
            vim.fetcher.ajaxRequest("saved/" + u, e, p, "Saving game...", vim.screens["game-screen"].setColonCommand, s, "POST");
    }

    function c(s) {
        l(s.responseText);
        q();
        if (i.indexOf("Level ") === 0 || i === "start.game") {
            vim.stats.startLevel(vim.model.getLevel());
            if (i !== "Level 1" && i !== "start.game" && i !== "Level 14") {
                vim.view.centerScreenAroundCursor()
            }
        } else {
            vim.stats.invalidateLevelStats(vim.model.getLevel())
        }
        if (vim.buffers.getCurrentBuffer().getName() === "lorem") {
            vim.images.toGrayScale()
        } else {
            vim.images.toNormalColor()
        }
        if (vim.model.getLevel() > 13 && (vim.buffers.getCurrentBuffer().getName() === "sky" || vim.buffers.getCurrentBuffer().getName() === "ground")) {
            vim.images.toDark()
        }
        vim.view.notifyFadeInAnimation();
        a = i;
        vim.screens["game-screen"].hideCommandHelp();
        vim.screens["game-screen"].setColonCommand("Editing file: " + a)
    }

    function e(s) {
        a = d;
        p(s)
    }

    function j(t) {
        var s = "operation=restore&filename=" + encodeURIComponent(t);
        if (t.indexOf("Level ") === 0) {
            return f(parseInt(t.substr(6), 10))
        }
        i = t;
        vim.fetcher.ajaxRequest("saved/" + t, c, p, "Restoring game...", vim.screens["game-screen"].setColonCommand, s, "GET");
    }

    function f(t) {
        var s = "level=" + t;
        i = "Level " + t;
        vim.fetcher.ajaxRequest("levels/load/level" + t, c, p, "Loading " + i, vim.screens["game-screen"].setColonCommand, s, "GET");
    }

    function o() {
        a = "start.game";
        Game.restartGame(true)
    }

    function g() {
        return a
    }

    function p(s) {
        vim.screens["game-screen"].setColonCommand(s.responseText)
    }

    function m() {
        vim.fetcher.ajaxRequest("saves", p, p, "Retrieving saved games list...", vim.screens["game-screen"].setColonCommand, undefined, "GET");
    }

    function r(s) {
        vim.fetcher.ajaxRequest("saved/" + s, p, p, "Deleting game...", vim.screens["game-screen"].setColonCommand, undefined, "DELETE")
    }

    function k(s, v) {
        var u = vim.buffers.getBuffer(1).getTextAreas(),
            t = u.get(s, v);
        if (typeof t !== "undefined") {
            Array.prototype.shift.apply(arguments);
            Array.prototype.shift.apply(arguments);
            TextArea.prototype.hotfixPadWithSpaces.apply(t, arguments);
            u.refreshCache(t)
        }
    }

    function q() {
        var u, B, t = Board.prototype.WATER,
            z = Board.prototype.PLAIN,
            C = Board.prototype.MISSING,
            s = Board.prototype.GRASS,
            D = Board.prototype.PATH,
            A = Board.prototype.TALL_WALL,
            w, v;
        B = vim.buffers.getBuffer(1).getBoard();
        w = vim.buffers.getBuffer(1).getEntities();
        v = vim.buffers.getBuffer(1).getTextAreas();
        if (B.getBG(149, 172) === t && B.getBG(150, 172) === z) {
            B.setBG(149, 172, z)
        }
        u = v.get(172, 116);
        if (typeof u !== "undefined") {
            if (u.getLetter(172, 117) === " ") {
                u.hotfixSpaceLinesToEmptyLines();
                v.refreshCache(u)
            }
        }
        u = v.get(168, 146);
        if (typeof u !== "undefined") {
            if (u.getLetter(168, 147) === " ") {
                u.hotfixSpaceLinesToEmptyLines();
                v.refreshCache(u)
            }
        }
        u = v.get(216, 137);
        if (typeof u !== "undefined") {
            u.hotfixSpaceLinesToEmptyLines();
            v.refreshCache(u)
        }
        u = v.get(103, 117);
        if (typeof u !== "undefined") {
            u.hotfixTextLine(0, " k ");
            u.hotfixTextLine(2, " j ");
            v.refreshCache(u)
        }
        u = v.get(103, 120);
        if (typeof u !== "undefined") {
            u.hotfixTextLine(0, "Hello ");
            v.refreshCache(u)
        }
        u = v.get(129, 111);
        if (typeof u !== "undefined") {
            u.hotfixTextLine(0, "Remember:  ");
            u.hotfixTextLine(1, "words are  ");
            u.hotfixTextLine(2, "not WORDs!!");
            v.refreshCache(u)
        }
        if (B.getBG(128, 109) === D) {
            B.setBG(128, 109, A);
            B.setBG(128, 110, A);
            B.setBG(129, 110, D);
            B.setBG(129, 111, D)
        }
        u = v.get(172, 113);
        if (typeof u !== "undefined") {
            u.hotfixTextLine(4, "                 ");
            u.hotfixTextLine(8, "              ");
            u.hotfixTextLine(9, "And the power of VIM will prevail.");
            v.refreshCache(u)
        }
        u = v.get(201, 117);
        if (typeof u !== "undefined") {
            u.hotfixTextLine(1, "back! ");
            v.refreshCache(u)
        }
        if (B.getBG(186, 121) === z) {
            B.setBG(186, 121, t)
        }
        if (B.getBG(206, 122) === z) {
            B.setBG(206, 122, D)
        }
        k(216, 137, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2);
        u = v.get(183, 151);
        if (typeof u !== "undefined") {
            u.hotfixTextLine(1, "        ");
            u.hotfixTextLine(4, "                ");
            u.hotfixTextLine(6, "}             ");
            u.hotfixTextLine(8, "                    ");
            u.hotfixTextLine(9, "<\/script>           ");
            v.refreshCache(u)
        }
        u = v.get(219, 189);
        if (typeof u !== "undefined") {
            k(220, 172, 3, 7, 5, 3, 25, 3, 1, 4, 2, 25, 2, 1, 0, 2, 25, 1, 0, 25, 24)
        } else {
            k(220, 172, 3, 7, 5, 3, 25, 3, 1, 4, 2, 25, 2, 1, 0, 2, 25, 25, 24)
        }
        k(184, 176, 10, 5, 3, 1, 6, 0, 3, 0);
        k(188, 215, 0, 2, 1, 2);
        k(214, 202, 0, 0, 0);
        if (B.isValid(231, 213) && B.getBG(231, 213) === t) {
            B.setBG(231, 213, z)
        }
        if (B.isValid(218, 230) && B.getBG(218, 230) === t) {
            k(218, 218, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0)
        } else {
            k(218, 218, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0)
        }
        k(212, 232, 2, 1, 2);
        k(213, 249, 0, 0, 0, 0, 36, 44, 0, 0, 0, 0, 0, 19, 44, 0, 0, 44, 0, 44, 0, 0, 44, 0, 0, 44, 0, 0);
        if (B.isValid(261, 257) && B.getBG(261, 257) === t) {
            B.setBG(261, 257, z);
            B.setBG(262, 257, z)
        }
        k(208, 294, 0, 5, 1, 2);
        k(203, 302, 1, 0, 3, 5);
        k(215, 313, 0, 0, 0, 0, 1, 0, 0, 0, 0, 14, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0);
        k(232, 342, 0, 0, 0, 0, 0, 0, 6, 0, 9, 0);
        u = v.get(226, 346);
        if (typeof u !== "undefined") {
            u.hotfixTextLine(1, "that is truer than true");
            v.refreshCache(u)
        }
        if (B.getBG(255, 348) === s) {
            B.setBG(255, 348, z);
            B.setBG(254, 350, z);
            B.setBG(253, 350, z);
            B.setBG(228, 322, z);
            B.setBG(229, 322, s);
            B.setBG(229, 321, s);
            B.setBG(228, 320, C);
            B.setBG(225, 345, C);
            B.setBG(226, 346, s);
            B.setBG(259, 350, C);
            B.setBG(247, 345, C);
            B.setBG(248, 345, C);
            B.setBG(249, 345, C);
            B.setBG(261, 257, z);
            B.setBG(262, 257, z)
        }
        w.deleteAtPosition(196, 180);
        w.deleteAtPosition(197, 180);
        w.deleteAtPosition(187, 181);
        w.deleteAtPosition(188, 181);
        if (B.getBG(199, 176) !== t) {
            B.setBG(199, 176, z);
            B.setBG(200, 176, z);
            B.setBG(201, 176, z);
            B.setBG(202, 176, z);
            if (B.getBG(205, 176) !== A) {
                B.setBG(203, 176, z)
            }
        }
        if (!w.exist(208, 233)) {
            w.deleteAtPosition(210, 233);
            w.deleteAtPosition(214, 233)
        }
        if (typeof vim.buffers.getBuffer(3) !== "string") {
            u = vim.buffers.getBuffer(3).getTextAreas().get(182, 165);
            if (typeof u !== "undefined") {
                u.hotfixNoExtraSpacesbutEmptyLines();
                v.refreshCache(u)
            }
        }
    }

    function b(w) {
        var s = JSON.parse(w),
            A, F, J, I, E, B, D, u = false,
            H, G, v, z, C = [],
            t = -1,
            K = 0;
        if (typeof s.buffers === "undefined") {
            C.push(s)
        } else {
            for (F = 0; F < s.buffers.length; ++F) {
                C.push(s.buffers[F])
            }
        }
        for (A = 0; A < C.length; ++A) {
            s = C[A];
            v = s.buffer || "ground";
            z = vim.buffers.getBuffer(v);
            if (typeof s.levelNumber !== "undefined") {
                vim.model.setLevel(s.levelNumber);
                u = true
            }
            if (typeof z === "string") {
                vim.buffers.add(v, undefined);
                z = vim.buffers.getBuffer(v)
            }
            if (u && s.levelNumber === 14 && v === "underground") {
                z.getBoard().setFillerBG(z.getBoard().SKY_MISSING)
            }
            H = z.getEntities();
            G = z.getTextAreas();
            z.getBoard().add(s);
            if (typeof s.cursorX === "number" && typeof s.cursorY === "number") {
                z.cursorX = s.cursorX + s.addX;
                z.cursorY = s.cursorY + s.addY;
                t = A;
                ++K
            }
            if (typeof s.topX === "number") {
                z.topX = s.topX + s.addX
            }
            if (typeof s.topY === "number") {
                z.topY = s.topY + s.addY
            }
            for (F = 0; F < s.textareas.length; F += 1) {
                D = s.textareas[F];
                G.add(new TextArea(D.x + s.addX, D.y + s.addY, D.text.split("\n"), D.zoomOut, D.limit, D.alwaysSink, D.shouldClean, D.sacred, D.marks, v, D.bossMode, D.undos, D.redos))
            }
            for (F = 0; F < s.entities.length; F += 1) {
                J = s.entities[F].x + s.addX;
                I = s.entities[F].y + s.addY;
                E = s.entities[F].data || {};
                E.type = s.entities[F].type;
                E.invisible = s.entities[F].invisible === true;
                if (typeof s.entities[F].character !== "undefined") {
                    E.character = s.entities[F].character
                }
                B = H.createEntity(J, I, E, s.addX, s.addY);
                if (B) {
                    H.add(B);
                    if (!u && B instanceof Princess && B.isValid()) {
                        vim.model.setLevel(B.levelToLoad - 1);
                        u = true
                    }
                }
            }
        }
        q();
        if (!u && vim.model.getLevel() > 1) {
            vim.model.setLevel(vim.model.getLevel() + 1)
        }
        if (t !== -1) {
            vim.buffers.switchTo(C[t].buffer || "ground", K > 1)
        }
        if (vim.model.getLevel() === 11) {
            Game.setCursorCommand("Wh.. what the...?\nHow did I get here?", true)
        }
    }
    return {
        restartGame: o,
        saveGame: h,
        restoreGame: j,
        loadLevel: f,
        loadLevelFromString: b,
        list: m,
        remove: r,
        getCurrentFilename: g,
        serializeState: n,
        deserializeState: l
    }
})();
var level1 = '{"topX":-6,"topY":-3,"addX":100,"addY":100,"cursorX":3,"cursorY":17,"bg":["wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg<ggg.wwwwwww","wwwwwwwwwwwwwwwwwSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSgggggggwwgwwwwwg..wwwwwww       ","wwwwwwwwwwwwwwwwwS+++++++++SS........S.....S........S...gggggggwwwwgggggw...wwwwwww","wwwwwwwwwwwwwwwwwS+++++++++SS.SSSSSS.S.SSS.S.SSSSSS.S.SSSSggggwwwwwwwggwwwwwwwwwwww","wwwwwwwwwwwwwwwwwS+++++++++++.S......S.S.S.S.S.S.SS.S.S.Swgggwwwwgggg<gwwwwwwwwwwww","wwwwwwwwwwwwwwwwwS............SSSSSS.S.S.S.S.S.S.SS.S...Swgggggwwgwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwS.........S.S.....S.>.S.S.S.S......S.S.Swggwwwwwgggwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwSSSSSSSSS.S.S.SSSSS.SSS.S.S.SSSSSSSS.S.Swgggwwwwgggggwwwwwwwwwwwww","wggggggggggggwwwwS...........S.S...S.<...S.S..........S.Swggwwwwwgwwwwwwwwwwwwwwwww","wg...ggggggggwwwwS.SSSSSSSSSSS.S.SSS.S.SSS.SSSSSSSSSS.SSSwggggg<ggwwwwwwwwwwwwwwwww","wg.........ggwwwwS.....S.S.....S.S...S............SSS...Swwwwwwwwwwwwwwwwwwwwwwwwww","wg...ggggg.ggwwwwSSSSS.S.S.SSSSS.S.SSSSSSSSSSSSSS.SSS.S.Swwwwwwwwwwwwwwwwwwwwwwwwww","wggggggggg.ggwwwwS.....S.S.......S.S............S.SSS.S.Swwwwwwwwwwwwwwwwwwwwwwwwww","wggggggggg.ggSSSSS.SSSSS.SSSSSSSSS.S.SSSSSSSSSS.S.SSS.S.Swwwwwwwwwwwwwwwwwwwwwwwwww","wggggggggg.........S...S.S.......S.S.S..........S.>...S.Swwwwwwwwwwwwwwwwwwwwwwwwww","wggggggggggggSSSSS.SSS.S.S.SSSSSSS.S.SSSSSSSSSSSS.SSSSS.Swwwwwwwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwS.>...............S..............<.....Swwwwwwwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSwwwwwwwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww","wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"],"entities":[{"type":"rock","x":18,"y":12},{"type":"rock","x":19,"y":12},{"type":"rock","x":20,"y":12},{"type":"rock","x":21,"y":12},{"type":"rock","x":22,"y":12},{"type":"rock","x":23,"y":12},{"type":"rock","x":24,"y":12},{"type":"rock","x":25,"y":12},{"type":"rock","x":26,"y":12},{"type":"rock","x":27,"y":12},{"type":"rock","x":29,"y":12},{"type":"rock","x":27,"y":11},{"type":"chest","x":23,"y":10},{"type":"tall_tree","x":2,"y":21},{"type":"yellow_key","x":38,"y":21},{"type":"door","x":53,"y":11},{"type":"boy","x":7,"y":17,"data":{"name":"welcome_kid","message":"Hooray! I can\'t believe it!\\nThe Shadowy Cursor has\\ncome at last! Soon, the\\nold prophecy will be\\nfulfilled!!!"}},{"type":"pink_girl","x":60,"y":14,"data":{"name":"water_tip_girl","message":"Moving up or down to a shorter line\\n(i.e. into water) moves you to the\\nlast column in the shorter line,\\nbut if you keep moving to a\\nlonger line you\'ll end up in the\\nsame column where you started!"}},{"type":"princess","x":75,"y":9,"data":{"name":"level_1_princess","levelToLoad":2,"message":"Very good oh Shadowy One!\\nYou learned the hjkl skill.\\n\\nGo on!"}},{"type":"candle","x":23,"y":10,"invisible":true},{"type":"plus_minus","x":23,"y":10,"data":{"name":"darkness_falls_changes","changes":[{"name":"welcome_kid","action":"remove"},{"name":"help_girl","action":"remove"},{"name":"water_tip_girl","action":"remove"},{"name":"prophecy_kid","action":"remove"},{"name":"red_instructions","action":"remove"},{"name":"pinky_goto_artifact","action":"remove"},{"name":"WORDs_maze_girl","action":"remove"},{"name":"level_3_princess","type":"princess","levelToLoad":4,"message":"Help us ho Shadowy One!\\nThis is our darkest hour!\\n(pun intended)","x":205,"y":136,"action":"add"}]},"invisible":true},{"type":"brown_girl","x":24,"y":17,"data":{"name":"help_girl","message":"There is a built-in help system\\nin this game. If you ever need a\\nfull explanation and example on\\nwhat a key does or how it\'s used\\njust type :help followed by the\\nkey, for example try \':help j\'\\n(without the quotes).\\n\\nThe help screen for a specific key\\nwill also be displayed when you\\ncollect a key, but sometimes you\'ll\\nneed to ask specifically for the\\ncapital variation of a key."}},{"type":"cat_girl","x":40,"y":11,"data":{"name":"WORDs_maze_girl","message":"To reach the treasure\\nchest, you should know\\nWORDs are separated\\nby spaces.\\n\\nYou need \'W\', \'E\', and \\n\'B\' buttons (capitals)\\nto navigate WORDs."}}],"textareas":[{"x":2,"y":16,"text":" k \\nh l\\n j ","limit":0,"shouldClean":" "},{"x":3,"y":20,"text":"Hello \\nworld!","limit":0,"shouldClean":" "},{"x":18,"y":9,"text":"Remember:  \\nwords are  \\nnot WORDS!!","limit":0,"shouldClean":" "}]}';
var Game = (function () {
    var b = vim.audio,
        E = vim.dom,
        aD = E.$,
        av, l, au, az, s, f, aQ, ay, j, N, ac, ap, aL, aE = -1;

    function ae(aW) {
        var aV;
        vim.inventory.init();
        vim.validKeys.init();
        Cursor.init(0, 0);
        vim.buffers.init();
        aV = vim.buffers.getCurrentBuffer();
        vim.board = aV.getBoard();
        aV.getEntities().clear();
        aV.getTextAreas().clear();
        vim.view.init();
        vim.model.setCandleLightMode(false);
        vim.screens["game-screen"].hideToBeContinuedMessage();
        vim.screens["game-screen"].hideCommandHelp();
        vim.gamestate.loadLevelFromString(level1);
        vim.input.initialize();
        vim.timer.clear();
        av = undefined;
        l = true;
        az = undefined;
        j = false;
        N = false;
        ac = [];
        ap = 1;
        if (aW) {
            aJ()
        }
    }

    function aJ() {
        if (l) {
            l = false;
            vim.audio.play("appearance");
            vim.stats.startLevel(1)
        } else {
            if (au) {
                vim.screens["game-screen"].setColonCommand(au);
                au = ""
            }
        }
    }

    function V() {
        var aX, aW, a0, aV, aY, aZ;
        ae();
        au = "";
        if (Modernizr.localstorage) {
            aX = window.localStorage["VIM Adventures email"] || "";
            aW = window.localStorage["VIM Adventures password"] || "";
            a0 = window.localStorage["VIM Adventures state"] || "";
            aY = window.localStorage["VIM Adventures token"] || "";
            aZ = window.localStorage["VIM Adventures stats"] || "";
            if (a0.length > 1) {
                vim.emailaddr = aX;
                vim.password = aW;
                vim.token = aY;
                vim.stats.unmarshal(aZ);
                vim.gamestate.deserializeState(a0);
                if (vim.buffers.getCurrentBuffer().getName() === "lorem") {
                    vim.images.toGrayScale()
                } else {
                    vim.images.toNormalColor()
                }
                if (vim.model.getLevel() > 13 && (vim.buffers.getCurrentBuffer().getName() === "sky" || vim.buffers.getCurrentBuffer().getName() === "ground")) {
                    vim.images.toDark()
                }
                au = "Logged in as " + vim.emailaddr + ". Type :logout to restart the game or login as a different user.";
                l = false
            }
            window.setInterval(function () {
                aX = window.localStorage["VIM Adventures email"] || "";
                aW = window.localStorage["VIM Adventures password"] || "";
                if (aX !== "" && aW !== "") {
                    aV = vim.buffers.getCurrentBuffer().getTextAreas().get(Cursor.getX(), Cursor.getY());
                    if (!vim.input.isInInputMode() && (typeof aV === "undefined" || (aV.getLimit() === 0 && !aV.isAlwaysSink())) && !vim.model.isEndgame()) {
                        window.localStorage["VIM Adventures state"] = vim.gamestate.serializeState()
                    }
                    window.localStorage["VIM Adventures stats"] = vim.stats.marshal()
                }
            }, 10000)
        }
    }

    function aa() {
        vim.buffers.getCurrentBuffer().getEntities().collide(Cursor.getX(), Cursor.getY())
    }

    function ab() {
        var aW, aX = vim.board,
            aV = Cursor.getX(),
            aZ = Cursor.getY(),
            aY = vim.buffers.getCurrentBuffer().getTextAreas();
        aW = aY.get(aV, aZ);
        if (typeof aW !== "undefined") {
            return aW
        }
        if (aX.isCodeBG(aV, aZ)) {
            while (aX.isCodeBG(aV, aZ)) {
                --aV
            }++aV
        } else {
            return undefined
        }
        aW = aY.get(aV, aZ);
        if (typeof aW !== "undefined") {
            return aW
        }
        if (aX.isCodeBG(aV, aZ)) {
            while (aX.isCodeBG(aV, aZ - 1)) {
                --aZ
            }++aZ
        }
        aW = aY.get(aV, aZ);
        if (typeof aW !== "undefined") {
            return aW
        }
        return undefined
    }

    function aS(aV, aX, aW) {
        Cursor.set(aV, aX);
        vim.model.readjustViewToCursorPosition();
        vim.buffers.getCurrentBuffer().getEntities().collide(aV, aX, aW)
    }

    function z(aV, ba, aY) {
        var a9 = Cursor.getX(),
            a7 = Cursor.getY(),
            aZ = ab(a9, a7),
            aW, a6 = vim.input,
            aX = vim.audio,
            a4 = vim.view,
            a1 = vim.model,
            a3 = vim.board,
            a8, a5 = false,
            a2, a0 = vim.stats;
        Cursor.set(aV, ba);
        if (a9 === aV && a7 === ba) {
            return
        }
        if (aY !== true) {
            a1.readjustViewToCursorPosition()
        }
        if (a3.getBG(aV, ba) === a3.MISSING || a3.getBG(aV, ba) === a3.SKY_MISSING) {
            a6.disableKeys();
            S();
            a4.notifyFallingCursorAnimation(a9, a7, vim.buffers.getCurrentBuffer().getName());
            aX.play("fall");
            a0.incDeaths(vim.model.getLevel())
        } else {
            a5 = a3.getBG(aV, ba) === a3.DARK;
            if (!a5 && typeof aZ !== "undefined") {
                a2 = aZ.getSpecialArea(aV, ba);
                if (a2 && a2.type === "n" && a2.stepNumber !== aZ.getCurrentNumber()) {
                    a5 = true
                }
            }
            if (a5) {
                a6.disableKeys();
                S();
                a4.notifyDisappearingCursorAnimation(a9, a7, vim.buffers.getCurrentBuffer().getName());
                aX.play("teleport");
                a0.incDeaths(a1.getLevel())
            } else {
                a2 = aZ ? aZ.getSpecialArea(a9, a7) : undefined;
                if (a2 && a2.type === "M") {
                    if (!((aZ.getLimit() > 0 || aZ.isAlwaysSink()) && typeof aZ === "undefined")) {
                        aZ.applySpecialArea(a2.startX, a2.startY);
                        aZ.removeFromSinkList(a2.startX, a2.startY);
                        a3.setBG(a2.startX, a2.startY, a3.MISSING);
                        a4.notifyFallingBlockAnimation(a2.startX, a2.startY);
                        aX.play("avalanche")
                    }
                }
                vim.buffers.getCurrentBuffer().getEntities().collide(aV, ba);
                if (aZ) {
                    aW = aZ.checkForShouldCleanSpecialAreas(aV, ba);
                    a8 = aZ.checkForNumberedSpecialAreas(aV, ba);
                    if (aW || a8) {
                        a1.recacheCell(x, y);
                        aX.play("swipe");
                        aq(aZ)
                    }
                }
            }
        }
    }

    function aN(a5, a1, a6) {
        var a4, a3, aW, ba, a9, a7, a8, aX, bb, aZ, a2, a0, bc = false,
            aY, aV;
        a4 = Cursor.getX();
        a3 = Cursor.getY();
        aW = vim.buffers.getCurrentBuffer().getName();
        aX = ab(a4, a3);
        a8 = a5(a1);
        ba = Cursor.getX();
        a9 = Cursor.getY();
        a7 = vim.buffers.getCurrentBuffer().getName();
        a2 = vim.buffers.getCurrentBuffer().getBoard();
        aV = aW !== a7;
        if (a4 !== ba || a3 !== a9) {
            vim.audio.play("key_press");
            if (a6 !== "H" && a6 !== "M" && a6 !== "L") {
                vim.model.readjustViewToCursorPosition()
            }
            if (a2.getBG(ba, a9) === a2.MISSING || a2.getBG(ba, a9) === a2.SKY_MISSING) {
                vim.input.disableKeys();
                S();
                vim.view.notifyFallingCursorAnimation(a4, a3, aW);
                vim.audio.play("fall", true);
                vim.stats.incDeaths(vim.model.getLevel())
            } else {
                bb = ab(ba, a9);
                if (aV || aX !== bb) {
                    if (typeof aX !== "undefined") {
                        vim.model.keypressCountdownFinished(false, ba - a4, a9 - a3)
                    }
                    if (typeof bb !== "undefined") {
                        vim.model.initKeypressCountdown(bb, a4, a3, aW);
                        vim.view.showAsMuchAsPossible(ba, a9, bb, aV)
                    }
                }
                bc = a2.getBG(ba, a9) === a2.DARK;
                if (!bc && typeof bb !== "undefined") {
                    aY = bb.getSpecialArea(ba, a9);
                    if (aY && aY.type === "n" && aY.stepNumber !== bb.getCurrentNumber()) {
                        bc = true
                    }
                }
                if (bc) {
                    vim.input.disableKeys();
                    S();
                    vim.view.notifyDisappearingCursorAnimation(a4, a3, aW);
                    vim.audio.play("teleport", true);
                    vim.stats.incDeaths(vim.model.getLevel())
                } else {
                    aY = aX ? aX.getSpecialArea(a4, a3) : undefined;
                    if (aY && aY.type === "M") {
                        if (!((aX.getLimit() > 0 || aX.isAlwaysSink()) && typeof bb === "undefined")) {
                            aX.applySpecialArea(aY.startX, aY.startY);
                            aX.removeFromSinkList(aY.startX, aY.startY);
                            a2.setBG(aY.startX, aY.startY, a2.MISSING);
                            vim.view.notifyFallingBlockAnimation(aY.startX, aY.startY);
                            vim.audio.play("avalanche")
                        }
                    }
                    if (aV || Math.abs(ba - a4) >= 10 || Math.abs(a9 - a3) >= 2) {
                        vim.view.notifyPointCursor()
                    }
                    vim.buffers.getCurrentBuffer().getEntities().collide(ba, a9);
                    if (bb) {
                        aZ = bb.checkForShouldCleanSpecialAreas(ba, a9);
                        a0 = bb.checkForNumberedSpecialAreas(ba, a9);
                        if (aZ || a0) {
                            vim.model.recacheCell(ba, a9);
                            vim.audio.play("swipe");
                            aq(bb)
                        }
                    }
                }
            }
        } else {
            if (!a8) {
                vim.audio.play("blocked")
            }
        }
    }

    function K() {
        Cursor.blink()
    }

    function S() {
        Cursor.stopBlink()
    }

    function aH() {
        vim.audio.play("error_beep")
    }

    function an(aV, aZ) {
        var aW = aV || ab(Cursor.getX(), Cursor.getY()),
            aY = aW ? aW.checkForShouldCleanSpecialAreas(Cursor.getX(), Cursor.getY()) : false,
            aX = aW ? aW.checkForNumberedSpecialAreas(Cursor.getX(), Cursor.getY()) : false;
        if (aY || aX) {
            vim.model.recacheCell(Cursor.getX(), Cursor.getY());
            vim.audio.play("swipe");
            if (aZ) {
                aq(aW)
            }
        }
    }

    function O(a0, aX, aW) {
        var aZ = parseInt(a0, 10) || 1,
            a1 = Cursor.getX(),
            aY = Cursor.getY(),
            aV = aN(function () {
                return Cursor.move(aX, aW, aZ)
            });
        if (aZ > 1) {
            R(a0, a1, aY, Cursor.getX(), Cursor.getY(), aW !== 0)
        }
        return aV
    }

    function m(aV) {
        return O(aV, -1, 0)
    }

    function p(aV) {
        return O(aV, 1, 0)
    }

    function Z(aV) {
        return O(aV, 0, -1)
    }

    function aK(aV) {
        return O(aV, 0, 1)
    }

    function R(aY, a1, aZ, bm, bk, bb, a5) {
        var bf = vim.buffers.getCurrentBuffer().getTextAreas(),
            aW = bf.get(a1, aZ),
            a3 = bf.get(bm, bk),
            bc, ba, bn, bl, a8 = a1,
            a7 = aZ,
            bi = bm,
            bh = bk,
            bg, be, a2, bq = a3 ? a3.getTopX() : 0,
            bo = a3 ? a3.getTopY() : 0,
            bp = vim.buffers.getCurrentBuffer().getEntities(),
            a9, bd, a6 = vim.view,
            bj, a4 = false,
            aV = false,
            a0 = false,
            aX = vim.model;
        if (aX.getLevel() < 12) {
            return
        }
        if (a3 !== aW || typeof a3 === "undefined") {
            return
        }
        if (a7 > bh || (a7 === bh && a8 > bi)) {
            a8 = bm;
            a7 = bk;
            bi = a1;
            bh = aZ;
            aV = true
        }
        if (a5 && typeof aX.getGlobalSearchStr() !== "undefined") {
            a0 = "*/".indexOf(aX.getGlobalSearchStr().charAt(0)) !== -1;
            if (aY === "N") {
                a0 = !a0
            }
            a4 = (aV === true && a0) || (aV === false && !a0)
        }
        a6.notifyShowRangeAnimation(a8, a7, bi, bh, a3, undefined, "rgba(33,33,33,0.2)", bb, a4);
        bc = a4 ? bq : a8;
        ba = a4 ? bo : a7;
        bl = a4 ? bo + a3.getNumberOfLines() - 1 : bh;
        bn = a4 ? bq + a3.getLineLength(bh - bo) : bi;
        for (bg = ba; bg <= bl; ++bg) {
            a2 = bq + a3.getLineLength(bg - bo);
            for (be = bg === ba ? bc : bq; be <= (bg === bl ? bn : a2 - 1); ++be) {
                if (!a4 || (bg < a7 || (bg === a7 && be < a8)) || (bg > bh || (bg === bh && be > bi))) {
                    a9 = bp.list(be, bg);
                    for (bd = 0; bd < a9.length; ++bd) {
                        if (a9[bd] instanceof RedBug) {
                            bj = a9[bd];
                            if (aY.indexOf(bj.volPattern) !== -1) {
                                bj.invalidate();
                                aX.recacheCell(bj.getX(), bj.getY());
                                a6.notifyExplosion(bj.getX(), bj.getY(), bj.getXOffset(), bj.getYOffset());
                                vim.audio.play("explosion");
                                aq(a3)
                            }
                        }
                    }
                }
            }
        }
    }

    function r(a9, a8) {
        var a6 = vim.buffers.getCurrentBuffer(),
            a5 = a6.getTextAreas(),
            a2 = a5.get(a9, a8),
            a1, a0, aZ, aW = a2 ? a2.getTopX() : 0,
            aV = a2 ? a2.getTopY() : 0,
            aY = a6.getEntities(),
            a4, a7 = vim.view,
            a3 = vim.model,
            aX;
        if (typeof a2 === "undefined") {
            return
        }
        for (a1 = -5; a1 < 5; ++a1) {
            for (a0 = -7; a0 < 7; ++a0) {
                a4 = aY.list(a9 + a0, a8 + a1);
                for (aZ = 0; aZ < a4.length; ++aZ) {
                    if (a4[aZ] instanceof BigBug) {
                        aX = a4[aZ];
                        if (a4[aZ].isCollidingWithPosition(a9, a8)) {
                            aX.decHitPoints();
                            if (aX.getHitPoints() === 0) {
                                aX.invalidate();
                                a3.recacheCell(aX.getX(), aX.getY());
                                a7.notifyExplosion(aX.getX() - 2, aX.getY() - 8, aX.getXOffset(), aX.getYOffset(), 8);
                                vim.audio.play("explosion");
                                aq(a2)
                            } else {
                                a7.notifyExplosion(a9, a8, 0, 0);
                                vim.audio.play("explosion")
                            }
                        }
                    }
                }
            }
        }
    }

    function A(aX, aW, bf, bd, a5) {
        var be = a5 ? vim.buffers.getBuffer(a5) : vim.buffers.getCurrentBuffer(),
            a7 = be.getTextAreas(),
            aV = a7.get(aX, aW),
            a0 = a7.get(bf, bd),
            a3 = aX,
            a2 = aW,
            bb = bf,
            ba = bd,
            a9, a8, aZ, bi = a0.getTopX(),
            bg = a0.getTopY(),
            bh = be.getEntities(),
            a4, a6, a1 = vim.view,
            bc, aY = 0;
        if (vim.model.getLevel() < 12) {
            return 0
        }
        if (a0 !== aV || typeof a0 === "undefined") {
            return 0
        }
        if (a2 > aW || (a2 === aW && aX > bb)) {
            a3 = bf;
            a2 = bd;
            bb = aX;
            ba = aW
        }
        for (a9 = a2; a9 <= ba; ++a9) {
            aZ = bi + a0.getLineLength(a9 - bg);
            for (a8 = a9 === a2 ? a3 : bi; a8 <= (a9 === ba ? bb : aZ - 1); ++a8) {
                a4 = bh.list(a8, a9);
                for (a6 = 0; a6 < a4.length; ++a6) {
                    if (a4[a6] instanceof RedBug || a4[a6] instanceof BigBug) {
                        ++aY
                    }
                }
            }
        }
        return aY
    }

    function q(aZ, bk, aX) {
        var ba = parseInt(aZ, 10) || 1,
            bf = aZ.substr(isNaN(parseInt(aZ, 10)) || aZ === "0" ? 0 : ("" + parseInt(aZ, 10)).length),
            a1, a0, a7, aW, be, bg = vim.buffers.getCurrentBuffer().getTextAreas(),
            bd, a8 = Cursor.getX(),
            a6 = Cursor.getY(),
            a9, bb, aY = vim.model,
            bj = aY.getTopX(),
            bi = aY.getTopY(),
            bc = vim.view,
            a3 = vim.buffers.getCurrentBuffer(),
            aV = a3.getName(),
            bh = a3.getTextAreas().get(Cursor.getX(), Cursor.getY()),
            a5, a4, a2;
        while (bf.charAt(0) === '"') {
            aW = bf.charAt(1);
            bf = bf.substring(2);
            ba = ba * (parseInt(bf, 10) || 1);
            bf = bf.substr(isNaN(parseInt(bf, 10)) || bf.charAt(0) === "0" ? 0 : ("" + parseInt(bf, 10)).length)
        }
        if (aX !== true && bf !== "CTRL-R" && "PpdDXx~rOosScCAaIi".indexOf(bf.charAt(0)) !== -1) {
            if (aY.isUndoRedoSkyText(bh)) {
                aI("I left this message for\na reason. I'd better\nnot mess up its past\nor future versions.");
                return
            } else {
                if (aY.isBossUndergroundText(bh)) {
                    aI("I'd better not edit\nthis text directly...");
                    return
                }
            }
        }
        switch (bf.charAt(0)) {
            case "w":
            case "W":
            case "B":
            case "e":
            case "E":
            case "0":
            case "^":
            case "$":
            case "|":
            case "f":
            case "F":
            case "t":
            case "T":
            case "%":
            case "g":
            case "G":
            case "[":
            case "]":
            case "(":
            case ")":
            case "{":
            case "}":
            case "H":
            case "M":
            case "L":
            case "/":
            case "?":
                aN(Cursor.doMotionNoSimulation, aZ, bf.charAt(0));
                R(aZ, a8, a6, Cursor.getX(), Cursor.getY());
                break;
            case "b":
                if (Cursor.getX() === 128 && Cursor.getY() === 111) {
                    aM("I can't...\nThere is a '!' under this rock\nso 'b' lands me right on it.\nI should try something else.", true)
                }
                aN(Cursor.doMotionNoSimulation, aZ);
                R(aZ, a8, a6, Cursor.getX(), Cursor.getY());
                break;
            case "#":
            case "*":
                a7 = ab(Cursor.getX(), Cursor.getY());
                if (typeof a7 !== "undefined") {
                    a0 = a7.getSearchClosestWord(Cursor.getX(), Cursor.getY());
                    if (a0 !== undefined) {
                        vim.model.setGlobalSearchStr(aZ.charAt(0) + a0);
                        vim.buffers.getCurrentBuffer().getTextAreas().highlight(vim.model.getGlobalSearchStr());
                        aN(Cursor.doMotionNoSimulation, aZ);
                        R(aZ, a8, a6, Cursor.getX(), Cursor.getY(), false, true)
                    }
                } else {
                    aM(bf.charAt(0) + " can only be used on text")
                }
                break;
            case "n":
            case "N":
                if (typeof vim.model.getGlobalSearchStr() !== "undefined") {
                    aN(Cursor.doMotionNoSimulation, aZ);
                    R(aZ, a8, a6, Cursor.getX(), Cursor.getY(), false, true)
                } else {
                    aM("No previous '*', '#', '?' or '/' was performed")
                }
                break;
            case ";":
                a1 = vim.input.getLastInlineSearch();
                if (typeof a1 !== "undefined") {
                    aN(Cursor.doMotionNoSimulation, ba + vim.input.getLastInlineSearch());
                    R(aZ, a8, a6, Cursor.getX(), Cursor.getY())
                } else {
                    aM("No previous inline search ('f', 'F', 't' or 'T') was performed")
                }
                break;
            case ",":
                a1 = vim.input.getLastInlineSearch();
                if (typeof a1 !== "undefined") {
                    switch (a1.charAt(0)) {
                        case "f":
                            a1 = "F" + a1.charAt(1);
                            break;
                        case "F":
                            a1 = "f" + a1.charAt(1);
                            break;
                        case "t":
                            a1 = "T" + a1.charAt(1);
                            break;
                        case "T":
                            a1 = "t" + a1.charAt(1);
                            break
                    }
                    aN(Cursor.doMotionNoSimulation, ba + a1);
                    R(aZ, a8, a6, Cursor.getX(), Cursor.getY())
                } else {
                    aM("No previous inline search ('f', 'F', 't' or 'T') was performed")
                }
                break;
            case "r":
                v(bf, ba);
                break;
            case "~":
                o(ba);
                break;
            case "x":
                D(ba, aW, aX);
                break;
            case "X":
                am(ba, aW, aX);
                break;
            case "D":
                t(ba, aW, aX);
                break;
            case "d":
                aA(bf, ba, aW, aX);
                break;
            case "p":
            case "P":
                aT(bf, ba, aW);
                break;
            case "y":
            case "Y":
                Q(bf, ba, aW);
                break;
            case "i":
            case "I":
            case "a":
            case "A":
                ax(bf, ba, aX);
                break;
            case "c":
                if (!bg.exist(a8, a6)) {
                    aM("'" + bf.charAt(0) + "' can only be used on text.");
                    vim.audio.play("error_beep");
                    break
                }
                if (bf.charAt(bf.length - 1) === "c") {
                    aA("d" + bf.substring(1, bf.length - 1) + "d", ba, aW, aX, false, true, true, "i");
                    if (j) {
                        ax("i", 1, aX)
                    }
                } else {
                    be = bf.substr(1);
                    a7 = bg.get(Cursor.getX(), Cursor.getY());
                    bd = (be.indexOf("w") !== -1 || be.indexOf("W") !== -1) && a7 && a7.getLetter(Cursor.getX(), Cursor.getY()) !== " ";
                    aA("d" + be, ba, aW, aX, bd, true, true, undefined)
                }
                if (j) {
                    ax(N ? "a" : "i", 1, aX)
                }
                break;
            case "C":
                if (bf === "CTRL-R") {
                    break
                }
                if (!bg.exist(a8, a6)) {
                    aM("'" + bf.charAt(0) + "' can only be used on text.");
                    vim.audio.play("error_beep");
                    break
                }
                aA("d$", ba, aW, aX, false, true, true, "a");
                if (j) {
                    ax("a", 1, aX)
                }
                break;
            case "s":
                if (!bg.exist(a8, a6)) {
                    aM("'" + bf.charAt(0) + "' can only be used on text.");
                    vim.audio.play("error_beep");
                    break
                }
                aA("x", ba, aW, aX, false, true, true, undefined);
                if (j) {
                    console.log("We enter into here!");
                    
                    ax(N ? "a" : "i", 1, aX)
                }
                break;
            case "S":
                if (!bg.exist(a8, a6)) {
                    aM("'" + bf.charAt(0) + "' can only be used on text.");
                    vim.audio.play("error_beep");
                    break
                }
                aA("dd", ba, aW, aX, false, true, true, "i");
                if (j) {
                    ax("i", 1, aX)
                }
                break;
            case "o":
            case "O":
                aw(bf, ba);
                break;
            case ".":
                if (!isNaN(parseInt(aZ, 10))) {
                    ap = ba
                }
                k();
                break;
            case "u":
                n(ba, true);
                break;
            case "m":
                if (!bg.exist(a8, a6)) {
                    aM("'" + bf.charAt(0) + "' can only be used on text.");
                    vim.audio.play("error_beep");
                    break
                }
                aj(bf.charAt(1));
                break;
            case "'":
            case "`":
                a5 = bf.charAt(1);
                if (!aY.isSupportedMark(a5)) {
                    vim.screens["game-screen"].setColonCommand("E78: Unknown Mark (" + a5 + " is not a supported mark name).");
                    vim.audio.play("error_beep");
                    break
                }
                if ((aY.isLocalMark(a5) && bh && !bh.getLocalMark(a5)) || (aY.isGlobalMark(a5) && !aY.getGlobalMark(a5))) {
                    vim.screens["game-screen"].setColonCommand("E20: Mark not set");
                    vim.audio.play("error_beep");
                    break
                }
                if (aY.isLocalMark(a5) && bh && bh.getLocalMark(a5)) {
                    aN(Cursor.doMotionNoSimulation, aZ, bf.charAt(0));
                    R(aZ, a8, a6, Cursor.getX(), Cursor.getY());
                    bc.notifyScrollMode(bj, bi, aY.getTopX(), aY.getTopY(), 8)
                } else {
                    if (aY.isGlobalMark(a5)) {
                        a4 = aY.getGlobalMark(a5);
                        if (aY.isKeypressCountdownActive() && (aV !== aY.getGlobalMark(a5).bufferName || bh !== vim.buffers.getCurrentBuffer().getTextAreas().get(a4.x, a4.y))) {
                            vim.screens["game-screen"].setColonCommand("Changing buffers (or texts) while working on a countdown text is not allowed.\nPlease leave the text area and try again.");
                            vim.audio.play("error_beep")
                        } else {
                            if (aV !== aY.getGlobalMark(a5).bufferName) {
                                aN(Cursor.doMotionNoSimulation, aZ, bf.charAt(0));
                                vim.model.readjustViewToCursorPosition();
                                ak()
                            } else {
                                aN(Cursor.doMotionNoSimulation, aZ, bf.charAt(0));
                                vim.view.showAsMuchAsPossible(Cursor.getX(), Cursor.getY(), vim.buffers.getCurrentBuffer().getTextAreas().get(Cursor.getX(), Cursor.getY()));
                                ak();
                                if (bh && bh === vim.buffers.getCurrentBuffer().getTextAreas().get(a4.x, a4.y)) {
                                    R(aZ, a8, a6, Cursor.getX(), Cursor.getY())
                                }
                                a2 = vim.buffers.getCurrentBuffer().getBoard();
                                if (a2.getBG(Cursor.getX(), Cursor.getY()) === a2.MISSING || a2.getBG(Cursor.getX(), Cursor.getY()) === a2.SKY_MISSING || a2.getBG(Cursor.getX(), Cursor.getY()) === a2.DARK) {
                                    vim.view.notifyPointCursor()
                                } else {
                                    bc.notifyScrollMode(bj, bi, aY.getTopX(), aY.getTopY(), 8)
                                }
                            }
                        }
                    }
                }
                break
        }
        if (bf === "CTRL-R") {
            n(ba, false)
        }
        if ("PpdDXx~rOosScCAaIi".indexOf(bf.charAt(0)) !== -1 && bf !== "CTRL-R") {
            if (typeof vim.model.getGlobalSearchStr() !== "undefined") {
                vim.buffers.getCurrentBuffer().getTextAreas().highlight(vim.model.getGlobalSearchStr())
            }
            if (bk !== true && aX !== true) {
                if (bf.length > 1 && !isNaN(parseInt(bf.substr(1), 10))) {
                    bb = parseInt(bf.substr(1), 10);
                    ap = ba * bb;
                    a9 = bf.charAt(0) + bf.substr(1 + bb.toString().length)
                } else {
                    a9 = bf;
                    ap = ba
                }
                C((typeof aW === "undefined" ? "" : '"' + aW) + a9, true)
            }
        }
    }

    function k() {
        var a1 = vim.buffers.getCurrentBuffer().getTextAreas(),
            aY, aX, aW = vim.input,
            a0, aZ, aV, a2;
        if (!a1.exist(Cursor.getX(), Cursor.getY())) {
            vim.audio.play("error_beep");
            return
        }
        if (ac.length === 0) {
            vim.audio.play("error_beep");
            return
        }
        a0 = ac[0];
        if (a0.charAt(0) === '"') {
            aZ = a0.charAt(1);
            if (aZ >= "1" && aZ < "9") {
                aZ = (parseInt(aZ, 10) + 1).toString()
            }
            ac[0] = '"' + aZ + a0.substr(2)
        }
        a2 = ap;
        aV = ac[0];
        if (aV.length > 2 && (aV.charAt(0) === "d" || aV.charAt(0) === "c") && (aV.charAt(1) === "a" || aV.charAt(1) === "i")) {
            aV = aV.charAt(0) + a2 + aV.charAt(1) + aV.substr(2);
            a2 = 1
        } else {
            if (aV.length === 2 && (aV.charAt(0) === "d" || aV.charAt(0) === "c")) {
                aV = aV.charAt(0) + a2 + aV.charAt(1);
                a2 = 1
            } else {
                if (aV === "s") {
                    aV = a2 + aV;
                    a2 = 1
                }
            }
        }
        for (aY = 0; aY < a2; ++aY) {
            q(aV, true);
            if (aW.isInInputMode()) {
                for (aX = 1; aX < ac.length; ++aX) {
                    aW.emulateInputModeInput(ac[aX])
                }
            }
        }
    }

    function n(a3, bg) {
        var a1 = vim.buffers.getCurrentBuffer(),
            a0 = Cursor.getX(),
            aZ = Cursor.getY(),
            a2 = a1.getTextAreas().get(a0, aZ),
            be, bd, bc, a9, bb, aY, aW, ba, aV, a7, a5, a4 = vim.input,
            bf = vim.audio,
            aX = vim.model,
            a8 = aX.getTopX(),
            a6 = aX.getTopY();
        if (!a2) {
            bf.play("error_beep");
            return
        }
        if (!a2.isBossMode() && a2.isComplete(true)) {
            bf.play("error_beep");
            aM("No point in messing up\nsuch a nicely fixed text.");
            return
        }
        bb = bg ? a2.undos : a2.redos;
        aV = !bg ? a2.undos : a2.redos;
        for (a9 = 0; a9 < a3; ++a9) {
            a2 = a1.getTextAreas().get(Cursor.getX(), Cursor.getY());
            if (aX.isUndoRedoSkyText(a2) && bg && a2.undos && a2.undos.length === 0) {
                bf.play("error_beep");
                if (a9 === 0) {
                    aI("I shouldn't completely fix\nthis text. There might be\nmore information here...")
                }
                return
            }
            if (!bb || bb.length === 0) {
                bf.play("error_beep");
                if (a9 === 0) {
                    aM("Already at " + (bg ? "oldest" : "newest") + " change")
                }
                return
            }
            aW = bb.pop();
            if (typeof aW === "string") {
                ba = aW;
                aW = JSON.parse(ba)
            }
            aV.push(aW);
            aY = bg ? aW.undo : aW.redo;
            aY.count = aY.count || 1;
            Cursor.set(a2.getTopX() + aY.x, a2.getTopY() + aY.y - 1);
            for (bd = 0; bd < aY.count; ++bd) {
                q(aY.command, false, true);
                if (a4.isInInputMode()) {
                    be = aY.params.split("|");
                    for (bc = 0; bc < be.length; ++bc) {
                        a4.emulateInputModeInput(be[bc], true)
                    }
                }
            }
            a7 = a2.getTopX() + (typeof aY.ax === "undefined" ? aY.x : aY.ax);
            a5 = a2.getTopY() + (typeof aY.ay === "undefined" ? aY.y : aY.ay) - 1;
            Cursor.set(a7, a5);
            if (!a2.isBossMode()) {
                aX.setTopX(a8);
                aX.setTopY(a6)
            }
            vim.view.notifyLightning(a7, a5);
            r(a7, a5);
            if (a9 === 0) {
                bf.play("thunder")
            }
            if (a9 + 1 === a3 && (a0 !== Cursor.getX() || aZ !== Cursor.getY())) {
                vim.view.notifyPointCursor(a7, a5)
            }
        }
    }

    function ax(be, a8, bn, aY, bl, a3, a1, bd, a9) {
        var bc = vim.view,
            ba = vim.input,
            a7 = a3 || Cursor.getX(),
            a5 = a1 || Cursor.getY(),
            bq, bg, a6, aV, bh, bf, a0, bj = vim.buffers.getCurrentBuffer().getTextAreas(),
            bp, bb, bi, aX, aZ = bd || vim.board,
            a4, a2, aW = vim.model,
            bo, bk, bm;
        if (typeof a9 !== "undefined") {
            a6 = a9
        } else {
            if (!bj.exist(a7, a5)) {
                if (!bl) {
                    aM("'" + be.charAt(0) + "' can only be used on text.");
                    vim.audio.play("error_beep")
                }
                return false
            }
            a6 = bj.get(a7, a5);
            if (!a6) {
                if (!bl) {
                    vim.audio.play("error_beep")
                }
                return false
            }
        }
        if (a6.isSacred()) {
            aM("Erm... this seems to be one\nof the sacred texts. I'd rather\nstick to exact copy and paste\noperations.", true);
            vim.audio.play("error_beep");
            return false
        }
        aV = a6.getSpecialArea(a7, a5, true);
        if (aV && aV.type === "+" && a6.getLineLength(a5 - a6.getTopY()) === 1 && a6.getLetter(a7, a5) === " " && !aZ.isCodeBG(a7, a5)) {
            be = "i"
        }
        switch (be) {
            case "i":
                bq = true;
                bg = false;
                a0 = false;
                bh = a7;
                bf = a5;
                break;
            case "I":
                bq = true;
                bg = true;
                a0 = false;
                bh = a6.softBOLPos(a7, a5).x;
                bf = a5;
                break;
            case "a":
                bq = false;
                bg = false;
                a0 = false;
                bh = a7;
                bf = a5;
                break;
            case "A":
                bq = false;
                bg = false;
                bh = a6.getTopX() + a6.getLineLength(a5 - a6.getTopY()) - 1;
                bf = a5;
                a0 = true;
                break;
            default:
                if (!bl) {
                    vim.audio.play("error_beep")
                }
                return false
        }
        aV = a6.getEmptySpecialArea(bh, bf, bq) || a6.getSpecialArea(bh, bf) || a6.getSpecialArea(bh + (bq ? -1 : 1), bf);
        if (!aV && bn === true) {
            aV = a6.getEmptyLineSpecialArea(bh, bf, true)
        }
        if (!aV || (aV.type !== "*" && aV.type !== "+") || aV.originalText === "") {
            if (bn !== true) {
                if (!bl) {
                    vim.audio.play("blocked");
                    vim.view.notifyShowRangeAnimation(bh, bf, bh, bf, undefined, bq);
                    aM("There is no missing text there.")
                }
                return false
            } else {
                if (!bl && !aV) {
                    a6.addNewSpecialArea(bh, bf, 0, "^*" + aL.length + "." + aL + ".^");
                    aV = a6.getEmptySpecialArea(bh, bf, bq) || a6.getSpecialArea(bh, bf) || a6.getSpecialArea(bh + (bq ? -1 : 1), bf)
                } else {
                    if (bl && !aV) {
                        alert("Validation");
                        return true
                    }
                }
            }
        }
        bb = bf === aV.startY ? bh + (bq ? 0 : 1) > aV.startX : bh + (bq ? 0 : 1) > a6.getTopX();
        bb = bb && aZ.getHeight(bh - (bq ? 1 : 0), bf) > 0;
        bi = bf === aV.endY ? bh + (bq ? 0 : 1) < aV.endX : bh + (bq ? 0 : 1) < a6.getTopX() + a6.getLineLength(bf - a6.getTopY()) - 1;
        bi = bi && aZ.getHeight(bh + (bq ? 0 : 1), bf) > 0;
        a4 = aV.originalText.split("\n");
        a2 = aV.shownText.split("\n");
        aX = bf - aV.startY < a4.length && a4[bf - aV.startY].length > a2[bf - aV.startY].length;
        bp = !aX && !bi && !bb;
        if (bp && bn !== true) {
            if (!bl) {
                vim.audio.play("blocked");
                vim.view.notifyShowRangeAnimation(bh, bf, bh, bf, undefined, bq);
                aM("This will be a dead end to me; I won't\nbe able to add or delete text there.")
            }
            return false
        }
        bk = 0;
        bm = bh;
        while (bm >= a6.getTopX() && aZ.getHeight(bm, bf) == 1) {
            --bm;
            ++bk
        }
        bm = bh + 1;
        while (bm <= a6.getTopX() + a6.getLineLength(bf - a6.getTopY()) - 1 && aZ.getHeight(bm, bf) == 1) {
            ++bm;
            ++bk
        }
        bo = a4.length >= a2.length && a4[bf - aV.startY].length > a2[bf - aV.startY].length - bk;
        if (!bo && bn !== true) {
            if (!bl) {
                vim.audio.play("blocked");
                vim.view.notifyShowRangeAnimation(bh, bf, bh, bf, undefined, bq);
                aM("This will be a dead end to me; I won't\nbe able to add any text there.")
            }
            return false
        }
        if (!bl) {
            bc.notifyInputMode();
            vim.screens["game-screen"].hideGameMenu();
            Cursor.set(bh + (bq ? 0 : 1), bf);
            vim.model.readjustViewToCursorPosition();
            az = aV;
            s = [];
            f = a8 - 1;
            ay = aY === true;
            aQ = aV.shownText;
            ba.switchToInputMode()
        }
        return true
    }

    function I() {
        var a1 = vim.view,
            aY = vim.model,
            aZ = vim.board,
            a2 = vim.input,
            aW = vim.audio,
            a3 = az,
            aX = a3.textArea,
            a4 = Cursor.getX(),
            a0 = Cursor.getY(),
            aV, a5 = false;
        a1.notifyCommandMode();
        vim.screens["game-screen"].showGameMenu();
        if (f > 0 && (s.length > 0 || ay)) {
            if (!ay && aQ.length + (f + 1) * (a3.shownText.length - aQ.length) > a3.originalText.length) {
                aM("The resulting text of this repeating edit\nis longer than the missing text.\nIgnoring count.", true);
                a5 = true
            }
            if (!a5) {
                while (f > 0 && !a5) {
                    if (ay) {
                        a5 = !a("REPLAY_ENTER", true);
                        if (a5) {
                            break
                        }
                    }
                    for (aV = 0; aV < s.length; ++aV) {
                        a5 = !a(s[aV], true);
                        if (a5) {
                            break
                        }
                    }--f
                }
                a4 = Cursor.getX();
                a0 = Cursor.getY();
                a3 = az
            }
        }
        if (a3.shownText === a3.originalText) {
            aX.applyGivenSpecialArea(a3);
            vim.model.clearTextAreaCellCache(aX);
            a1.notifyBubbleUp(a3.startX, a3.startY, a3.originalText);
            vim.audio.play("deletion")
        }
        if (aY.isValidCursorPosition(a4 - 1, a0) && a4 - 1 >= aX.getTopX()) {
            a4 = a4 - 1
        }
        aS(a4, a0);
        aX.cursorPositionUpdate(a4, a0);
        if (a3.shownText === a3.originalText) {
            aq(aX)
        }
    }

    function ao(a2, aY) {
        var aW = a2,
            aX = aY ? vim.buffers.getBuffer(aY) : vim.buffers.getCurrentBuffer(),
            a5 = aX.getBoard(),
            a3 = aX.getEntities(),
            a1, a0, aZ, a4, aV, a6;
        for (a1 = 0; a1 < aW.getNumberOfLines(); a1 += 1) {
            aV = aW.getLineLength(a1);
            while (a5.isCodeBG(aW.getTopX() + aV, aW.getTopY() + a1)) {
                aV++
            }
            for (a0 = 0; a0 < aV; a0 += 1) {
                if (a3.exist(aW.getTopX() + a0, aW.getTopY() + a1)) {
                    a4 = a3.list(aW.getTopX() + a0, aW.getTopY() + a1);
                    a6 = false;
                    for (aZ = 0; aZ < a4.length; aZ += 1) {
                        if (a4[aZ] instanceof ClosedChest) {
                            a6 = true;
                            break
                        }
                    }
                    if (a6) {
                        return a4[aZ].isInvisible()
                    } else {
                        for (aZ = 0; aZ < a4.length; aZ += 1) {
                            if (a4[aZ] instanceof PlusMinus) {
                                return true
                            } else {
                                if (a4[aZ].isInvisible() === true) {
                                    return true
                                }
                            }
                        }
                    }
                }
            }
        }
        return false
    }

    function aR(aV, a0) {
        var aZ = aV,
            aW = a0 ? vim.buffers.getBuffer(a0) : vim.buffers.getCurrentBuffer(),
            aX = aW.getBoard(),
            aY = aW.getEntities();
        return function () {
            var a4, a3, a2, a6, a5, a1;
            for (a4 = 0; a4 < aZ.getNumberOfLines(); a4 += 1) {
                a5 = aZ.getLineLength(a4);
                while (aX.isCodeBG(aZ.getTopX() + a5, aZ.getTopY() + a4)) {
                    a5++
                }
                for (a3 = 0; a3 < a5; a3 += 1) {
                    if (aY.exist(aZ.getTopX() + a3, aZ.getTopY() + a4)) {
                        a6 = aY.list(aZ.getTopX() + a3, aZ.getTopY() + a4);
                        a1 = false;
                        for (a2 = 0; a2 < a6.length; a2 += 1) {
                            if (a6[a2] instanceof ClosedChest) {
                                a1 = true;
                                break
                            }
                        }
                        if (a1) {
                            a6[a2].setInvisible(false);
                            vim.view.notifyAppearingGlow(aZ.getTopX() + a3, aZ.getTopY() + a4, a0)
                        } else {
                            for (a2 = 0; a2 < a6.length; a2 += 1) {
                                if (a6[a2] instanceof PlusMinus) {
                                    a6[a2].collect()
                                } else {
                                    if (a6[a2].isInvisible() === true) {
                                        a6[a2].setInvisible(false);
                                        vim.view.notifyAppearingGlow(aZ.getTopX() + a3, aZ.getTopY() + a4, a0)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    function g(aW) {
        var a6, a5, ba, a1, a2, a4, bb, aZ, aY = vim.board,
            a3, a8, a0, bc, aX, aV, a9, a7;
        if (aW.type !== "*" && aW.startX >= aW.endX) {
            return
        }
        bc = aW.originalText.indexOf("\n") !== -1;
        aV = aW.emptyLine === true;
        a1 = aW.textArea;
        if (aV) {
            aX = aW.originalText.split("\n").length;
            a7 = vim.model.getEndOfCodeBlocks(a1.getTopX(), aW.startY, true);
            a9 = aY.getBG(a7, aW.startY);
            if (aY.getBG(a7 - 1, aW.startY) === aY.MISSING) {
                a9 = aY.SKY_MISSING
            }
            a8 = 0;
            for (a6 = a1.getTopY() + a1.getNumberOfLines() - 1; a6 >= aW.startY + aX; --a6) {
                if (a1.getLineLength(a6 - a1.getTopY()) > a8) {
                    a8 = a1.getLineLength(a6 - a1.getTopY())
                }
            }
            for (a6 = a1.getTopY() + a1.getNumberOfLines() - 1; a6 >= aW.startY + aX; --a6) {
                for (a5 = a1.getTopX(); a5 < a1.getTopX() + a8; ++a5) {
                    aY.setBG(a5, a6, aY.getBG(a5, a6 - aX))
                }
            }
            vim.view.doDraw();
            for (a6 = 0; a6 < aX; ++a6) {
                a7 = Math.max(vim.model.getEndOfCodeBlocks(a1.getTopX(), aW.startY + a6, true), a1.getTopX() + a1.getLineLength(aW.startY - a1.getTopY() + a6));
                for (a5 = 0; a5 < a7 - a1.getTopX(); ++a5) {
                    if (a5 < a1.getLineLength(aW.startY - a1.getTopY() + a6)) {
                        aY.setBG(a1.getTopX() + a5, aW.startY + a6, aY.PLAIN)
                    } else {
                        aY.setBG(a1.getTopX() + a5, aW.startY + a6, a9)
                    }
                }
            }
        } else {
            if (!bc) {
                a2 = a1.getTopX() + a1.getLineLength(aW.startY - a1.getTopY());
                aX = aW.originalText.length;
                for (a3 = a2 - 1; a3 > aW.startX + aX - 1; --a3) {
                    aY.setBG(a3, aW.startY, aY.getBG(a3 - aX, aW.startY))
                }
                for (a3 = 0; a3 < aX; ++a3) {
                    aY.setBG(aW.startX + a3, aW.startY, aY.PLAIN)
                }
            } else {}
        }
    }

    function u(a5, a7) {
        var aZ, aY, a6, a3, a0, aW, a4 = vim.board,
            aX, aV, a2, a1;
        if (a5.type !== "d" && a5.type !== "x") {
            return
        }
        if (a5.eols === 0) {
            a3 = vim.model.getEndOfCodeBlocks(a5.endX, a5.endY);
            aX = a5.startX;
            for (aZ = a5.endX + 1; aZ < a3; ++aZ) {
                a4.setBG(aX, a5.startY, a4.getBG(aZ, a5.startY));
                ++aX
            }
            while (aX < a3) {
                a4.setBG(aX, a5.startY, a4.getBG(a3, a5.startY));
                ++aX
            }
        } else {
            aV = a5.textArea.getTopX();
            if (aV === a5.startX && a5.endY - a5.startY + 1 === a5.eols) {
                aW = a7;
                a2 = 0;
                for (aZ = a5.startY; aZ < aW - a5.eols; ++aZ) {
                    a3 = vim.model.getEndOfCodeBlocks(aV, aZ + a5.eols);
                    a0 = vim.model.getEndOfCodeBlocks(aV, aZ);
                    a2 = Math.max(a2, a3, a0);
                    a1 = vim.model.getStartOfCodeBlocks(aV, aZ) + 1;
                    for (aY = a1; aY < a0 || aY < a3; ++aY) {
                        a4.setBG(aY, aZ, a4.getBG(aY, aZ + a5.eols))
                    }
                }
                for (; aZ < aW; ++aZ) {
                    a0 = vim.model.getEndOfCodeBlocks(aV, aZ);
                    a2 = Math.max(a2, a0);
                    a1 = vim.model.getStartOfCodeBlocks(aV, aZ);
                    for (aY = a1; aY < a2; ++aY) {
                        a4.setBG(aY, aZ, a4.getBG(aY, aW))
                    }
                }
            } else {}
        }
    }

    function aF(a0) {
        var aY, aX, aW = a0.textArea,
            aV, aZ = vim.buffers.getCurrentBuffer().getEntities();
        if (a0.startY === a0.endY) {
            for (aX = a0.startX; aX <= a0.endX; ++aX) {
                aZ.deleteAtPosition(aX, a0.startY, true);
                aW.removeFromSinkList(aX, a0.startY)
            }
        } else {
            for (aY = aW.getTopY(); aY < Math.max(aW.getTopY() + aW.getNumberOfLines(), a0.endY + 1); ++aY) {
                aV = vim.model.getEndOfCodeBlocks(aW.getTopX(), aY);
                for (aX = aW.getTopX(); aX < aV; ++aX) {
                    if ((aY === a0.startY && aX >= a0.startX) || (aY === a0.endY && aX <= a0.endX) || (aY > a0.startY && aY < a0.endY)) {
                        aZ.deleteAtPosition(aX, aY, true);
                        aW.removeFromSinkList(aX, aY)
                    }
                }
            }
        }
    }

    function af(a7) {
        var a0, aZ, a3, a1, a6, a4 = vim.board,
            aW, aV, aX, aY, a5, a2 = vim.buffers.getCurrentBuffer().getEntities();
        if (a7.type !== "*" && a7.startX >= a7.endX) {
            return
        }
        a5 = a7.emptyLine === true;
        aX = a7.originalText.indexOf("\n") !== -1;
        a1 = a7.textArea;
        if (a5) {
            aY = a7.originalText.split("\n").length;
            for (a0 = a1.getTopY() + a1.getNumberOfLines() - 1; a0 >= a7.startY; --a0) {
                for (aZ = a1.getTopX(); aZ < a1.getTopX() + a1.getLineLength(a0 - a1.getTopY()); ++aZ) {
                    a2.shiftUp(aZ, a0, -aY, false);
                    a1.changeSinkListY(aZ, a0, a0 + aY);
                    a1.updateLocalMarkY(aZ, a0, a0 + aY);
                    vim.model.updateGlobalMarkY(aZ, a0, a0 + aY)
                }
            }
        } else {
            if (!aX) {
                a6 = a1.getTopX() + a1.getLineLength(a7.startY - a1.getTopY());
                aY = a7.originalText.length;
                for (aW = a6 - 1; aW > a7.startX + aY - 1; --aW) {
                    a2.shiftLeft(aW, a7.startY, -aY, true);
                    a1.changeSinkListX(aW, a7.startY, aW + aY)
                }
            } else {}
        }
    }

    function U(a2, a4) {
        var aZ, aX, a1, aV, a3 = vim.board,
            aW = a2.startY !== a2.endY,
            aY = a2.textArea,
            a0 = vim.buffers.getCurrentBuffer().getEntities();
        a1 = vim.model.getEndOfCodeBlocks(a2.endX, a2.endY);
        for (aX = a2.endX + 1; aX < a1; ++aX) {
            a0.shiftLeft(aX, a2.endY, a2.endX - (aW ? aY.getTopX() : a2.startX) + 1, true);
            aY.changeSinkListX(aX, a2.endY, aX - (a2.endX - (aW ? aY.getTopX() : a2.startX) + 1))
        }
        if (a2.eols > 0) {
            aV = a4;
            for (aZ = a2.endY; aZ < aV; ++aZ) {
                a1 = vim.model.getEndOfCodeBlocks(a2.textArea.getTopX(), aZ);
                for (aX = a2.textArea.getTopX(); aX < a1; ++aX) {
                    a0.shiftUp(aX, aZ, a2.eols, false);
                    aY.changeSinkListY(aX, aZ, aZ - a2.eols)
                }
            }
        }
    }

    function D(aX, aW, aV) {
        aA("x", aX, aW, aV, false, true, false)
    }

    function am(aX, aW, aV) {
        if (vim.validKeys.isValid("x")) {
            aA("dh", aX, aW, aV, false, true, false)
        } else {
            vim.audio.play("blocked")
        }
    }

    function t(aX, aW, aV) {
        if (vim.validKeys.isValid("d") && vim.validKeys.isValid("$")) {
            aA("d$", aX, aW, aV, false, true, false)
        } else {
            vim.audio.play("blocked")
        }
    }

    function aq(aV, aW) {
        var a3 = vim.buffers.getCurrentBuffer(),
            a2 = a3.getBoard(),
            a4 = a3.getTextAreas().get(Cursor.getX(), Cursor.getY()),
            a1 = a3.getEntities(),
            aZ = vim.model,
            aY, a0, aX;
        if (aZ.isPreBossUndergroundText(aV) && aV.isComplete()) {
            vim.input.disableKeys();
            vim.audio.play("text_restored");
            vim.view.notifyTextCompleted(aV, function () {
                a3.getTextAreas().exterminate(aV.getTopX(), aV.getTopY());
                vim.buffers.getBuffer("lorem").getEntities().invalidateCursorNPCs();
                vim.buffers.getBuffer("underground").load('{"buffer":"underground","levelNumber":14,"addX":411,"addY":411,"bg":["++++++++++++++++++++++++++++++++","++++++++++++++++++++++++++++++++","++++++++++++++++++++++++++++++++","++++++++++++++++++++++++++++++++","++++++++++++++++++++++++++++++++","++++++++++++++++++++++++++++++++","++++++++++++++++++++++++++++++++","++++++++++++++++++++++++++++++++","++++++++++++++++++++++++++++++++","++++++++++++++++++++++++++++++++","++++++++++++++++++++++++++++++++","++++++++++++++++++++++++++++++++","++++++++++++++++++++++++++++++++","++++++++++++++++++++++++++++++++","++++++++++++++++++++++++++++++++","++++++++++++++++++++++++++++++++","++++++++++++++++++++++++++++++++","++++++++++++++++++++++++++++++++","                                "],"entities":[{"type":"red_bug","x":30,"y":3,"data":{"vol":"Charity","volHidden":true}},{"type":"red_bug","x":30,"y":14,"data":{"vol":"Bram","volHidden":true}},{"type":"red_bug","x":30,"y":16,"data":{"vol":"Uganda","volHidden":true}},{"type":"big_bug","x":27,"y":7,"data":{"hitpoints":5}}],"textareas":[{"x":0,"y":0,"limit":0,"bossMode":true,"shouldClean":" ","alwaysSink":false,"text":"VIM is Charityware.  You can use\\nand copy it as much as you like,\\nbut you are encouraged to make a\\ndonation for needy children in  \\nUganda.  Please see |kcc| below \\nor visit the ICCF web site,     \\navailable at these URLs:        \\n                                \\n  http://iccf-holland.org/      \\n  http://www.vim.org/iccf/      \\n  http://www.iccf.nl/           \\n                                \\nYou can also sponsor the        \\ndevelopment of VIM. VIM sponsors\\ncan vote for features.          \\nThe money goes to Uganda anyway.\\n                                \\n Bram Moolenaar (:help Uganda)  ","undos":["{ \\"undo\\" : { \\"x\\":19,\\"y\\":4,\\"command\\":\\"cw\\",\\"params\\":\\"p|e|n|g|u|i|n|s|ESC\\"}, \\"redo\\" : { \\"x\\":19,\\"y\\":4,\\"command\\":\\"cw\\",\\"params\\":\\"c|h|i|l|d|r|e|n|ESC\\"}}","{ \\"undo\\" : { \\"x\\":22,\\"y\\":5,\\"command\\":\\"c1l\\",\\"params\\":\\"f|ESC\\"}, \\"redo\\" : { \\"x\\":22,\\"y\\":5,\\"command\\":\\"c1l\\",\\"params\\":\\"c|ESC\\"}}","{ \\"undo\\" : { \\"x\\":0,\\"y\\":5,\\"command\\":\\"cf \\",\\"params\\":\\"B|u|g|l|a|n|d|.|ESC\\"}, \\"redo\\" : { \\"x\\":0,\\"y\\":5,\\"command\\":\\"cW\\",\\"params\\":\\"U|g|a|n|d|a|.| |ESC\\"}}","{ \\"undo\\" : { \\"x\\":7,\\"y\\":1,\\"command\\":\\"ctw\\",\\"params\\":\\"A|w|e|s|o|m|e|ESC\\"}, \\"redo\\" : { \\"x\\":7,\\"y\\":1,\\"command\\":\\"c2tw\\",\\"params\\":\\"C|h|a|r|i|t|y|ESC\\"}}","{ \\"undo\\" : { \\"x\\":2,\\"y\\":9,\\"command\\":\\"ct:\\",\\"params\\":\\"f|i|l|e|ESC\\"}, \\"redo\\" : { \\"x\\":2,\\"y\\":9,\\"command\\":\\"ct:\\",\\"params\\":\\"h|t|t|p|ESC\\"}}","{ \\"undo\\" : { \\"x\\":2,\\"y\\":10,\\"command\\":\\"ct:\\",\\"params\\":\\" |f|t|p|ESC\\"}, \\"redo\\" : { \\"x\\":2,\\"y\\":10,\\"command\\":\\"ct:\\",\\"params\\":\\"h|t|t|p|ESC\\"}}","{ \\"undo\\" : { \\"x\\":2,\\"y\\":11,\\"command\\":\\"ct:\\",\\"params\\":\\"s|n|m|p|ESC\\"}, \\"redo\\" : { \\"x\\":2,\\"y\\":11,\\"command\\":\\"ct:\\",\\"params\\":\\"h|t|t|p|ESC\\"}}","{ \\"undo\\" : { \\"x\\":17,\\"y\\":18,\\"command\\":\\"ct)\\",\\"params\\":\\"s|a|v|e| |B|u|g|l|a|n|d|ESC\\"}, \\"redo\\" : { \\"x\\":17,\\"y\\":18,\\"command\\":\\"ct)\\",\\"params\\":\\":|h|e|l|p| |U|g|a|n|d|a|ESC\\"}}","{ \\"undo\\" : { \\"x\\":2,\\"y\\":14,\\"command\\":\\"cw\\",\\"params\\":\\"p|r|e|c|a|t|i|o|n|ESC\\"}, \\"redo\\" : { \\"x\\":2,\\"y\\":14,\\"command\\":\\"cw\\",\\"params\\":\\"v|e|l|o|p|m|e|n|t|ESC\\"}}","{ \\"undo\\" : { \\"x\\":4,\\"y\\":15,\\"command\\":\\"c2w\\",\\"params\\":\\"d|o|w|n|v|o|t|e|ESC\\"}, \\"redo\\" : { \\"x\\":4,\\"y\\":15,\\"command\\":\\"cw\\",\\"params\\":\\"v|o|t|e| |f|o|r|ESC\\"}}"],"undoRedos":[]}]}');
                aZ.clearCellCache();
                aY = a1.listOnText(a4);
                for (aX = 0; aX < aY.length; ++aX) {
                    if (aY[aX] instanceof RedBug || aY[aX] instanceof BigBug) {
                        aY[aX].freeze()
                    }
                }
                window.setTimeout(function () {
                    aY = a1.listOnText(a4);
                    for (aX = 0; aX < aY.length; ++aX) {
                        if (aY[aX] instanceof RedBug || aY[aX] instanceof BigBug) {
                            aY[aX].unfreeze()
                        }
                    }
                }, 5000);
                vim.view.recalcTopXY();
                vim.input.enableKeys()
            })
        } else {
            if (aZ.isBossUndergroundText(aV) && aV.isComplete()) {
                vim.input.disableKeys();
                vim.stats.endLevel(vim.model.getLevel());
                vim.stats.startLevel(vim.model.getLevel() + 1);
                vim.stats.invalidateLevelStats(vim.model.getLevel() + 1);
                vim.screens["game-screen"].hideGameMenu();
                a0 = "level=15&stats=" + encodeURIComponent(vim.stats.marshal());
                vim.fetcher.ajaxRequest("levels/level15", function () {}, function () {}, undefined, a0, "GET");
                vim.view.notifyFadeOutAnimation(function () {
                    vim.model.setEndgame();
                    vim.screens["game-screen"].runEnding();
                })
            } else {
                if (aV.isComplete() && (!aV.hasMarkSpecialAreas() || ao(aV, aW))) {
                    if (aV === a4) {
                        vim.model.clearKeypressCountdown();
                        vim.view.notifyTextCompleted(aV);
                        vim.audio.play("text_restored")
                    }
                    window.setTimeout(aR(aV, aW), 1250);
                    return true
                }
            }
        }
        return false
    }

    function o(aW) {
        var a4 = Cursor.getX(),
            a2 = Cursor.getY(),
            a0 = vim.buffers.getCurrentBuffer().getTextAreas().get(a4, a2),
            a1 = a0 ? a0.getSpecialArea(a4, a2) : undefined,
            aY = false,
            a3 = !a0 ? 0 : Math.min(aW, a0.getLineLength(a2 - a0.getTopY()) - (a4 - a0.getTopX())),
            aZ, aV, aX;
        aY = typeof a0 === "undefined";
        aY = aY || typeof a1 === "undefined";
        if (!aY && a1.type === "+") {
            return ai("~", aW, a0, a1)
        }
        aY = aY || a1.startX !== a4 || a1.endX !== a4 + a3 - 1;
        aY = aY || (a1.type !== "r" && a1.type !== "*");
        aY = aY || (a1.type === "*" && !a1.inplace);
        if (!aY) {
            aX = a1.endX + (a1.endX + 1 - a0.getTopX() < a0.getLineLength(a1.endY - a0.getTopY()) ? 1 : 0);
            aY = aY || !vim.model.isValidCursorPosition(aX, a1.endY)
        }
        if (!aY) {
            for (aZ = 0; aZ < a3; ++aZ) {
                aV = a0.getLetter(a1.startX + aZ, a1.startY);
                if (aV >= "a" && aV <= "z") {
                    aV = aV.toUpperCase()
                } else {
                    aV = aV.toLowerCase()
                }
                if (aV !== (a3 === 1 ? a1.originalCharacter : a1.originalText.charAt(aZ))) {
                    aY = true;
                    break
                }
            }
        }
        if (aY) {
            if (a0) {
                vim.view.notifyShowRangeAnimation(a4, a2, a4 + aW - 1, a2, a0)
            }
            vim.audio.play("error_beep")
        } else {
            a0.applySpecialArea(a4, a2);
            aZ = a3;
            while (aZ--) {
                vim.model.recacheCell(a1.startX + aZ, a1.startY)
            }
            aS(aX, a1.endY);
            if (vim.board.getBG(aX, a1.endY) !== vim.board.MISSING && vim.board.getBG(aX, a1.endY) !== vim.board.SKY_MISSING) {
                a0.cursorPositionUpdate(aX, a1.endY)
            }
            vim.audio.play("deletion");
            aq(a0);
            if (vim.board.getBG(aX, a1.endY) === vim.board.MISSING || vim.board.getBG(aX, a1.endY) === vim.board.SKY_MISSING) {
                vim.input.disableKeys();
                S();
                vim.view.notifyFallingCursorAnimation(a1.endX, a1.endY, vim.buffers.getCurrentBuffer().getName());
                vim.audio.play("fall");
                vim.stats.incDeaths(vim.model.getLevel())
            }
        }
    }

    function ag(aV, aZ, aY, aX, aW) {
        return {
            x: aV,
            y: aZ,
            newText: aY,
            errorMsg: aX,
            operation: aW
        }
    }

    function H(a2, aW, aZ, a4) {
        var a5 = Cursor.getX(),
            a3 = Cursor.getY(),
            aY, aX = a5 - a4.startX,
            a0 = "",
            aV = a2.charAt(1),
            a1;
        if (a4.shownText.length < aX + aW) {
            a1 = "I won't change text out of the required area."
        } else {
            for (aY = 0; aY < aW; ++aY) {
                a0 += aV
            }
            a0 = a4.shownText.substring(0, aX) + a0 + a4.shownText.substring(aX + aW);
            a5 = a5 + aW - 1
        }
        return ag(a5, a3, a0, a1)
    }

    function L(a3, aX, a0, a5) {
        var a6 = Cursor.getX(),
            a4 = Cursor.getY(),
            aZ, aY = a6 - a5.startX,
            a1 = "",
            aW = a3.charAt(1),
            a2, aV;
        if (a5.shownText.length < aY + aX) {
            a2 = "I won't change text out of the required area."
        } else {
            for (aZ = 0; aZ < aX; ++aZ) {
                aV = a5.shownText.charAt(aY + aZ);
                if (aV >= "a" && aV <= "z") {
                    a1 += aV.toUpperCase()
                } else {
                    a1 += aV.toLowerCase()
                }
            }
            a1 = a5.shownText.substring(0, aY) + a1 + a5.shownText.substring(aY + aX);
            a6 = a6 + aX
        }
        return ag(a6, a4, a1, a2)
    }

    function F(bc, bg, a0, be, a5, a6, bv, a1, bq, bl) {
        var bo = a5.sx,
            bn = a5.sy,
            bu, a7 = "",
            bw, bs = a5.ex,
            br = a5.ey,
            bt = false,
            aX = vim.view,
            a9 = vim.board,
            aW, a4, a3, a2, bm, bb = bc === "x" ? "x" : bc.substr(1),
            bf = parseInt(bb, 10) || 1,
            aV = bb.substr(isNaN(parseInt(bb, 10)) || bb === "0" ? 0 : ("" + parseInt(bb, 10)).length),
            ba, bi, bk, bd, a8 = false,
            bx, aY, by, aZ, bj, bp, bh;
        j = false;
        N = false;
        if (!((a5.sy === a5.ey && bo <= bs) || a5.sy < a5.ey)) {
            bo = bs;
            bn = br;
            bs = a5.sx;
            br = a5.sy;
            a5.sx = bo;
            a5.sy = bn;
            a5.ex = bs;
            a5.ey = br
        }
        N = a0.getTopX() + a0.getLineLength(br - a0.getTopY()) - 1 === bs;
        if (a1 && typeof bq === "undefined") {
            bq = N ? "a" : "i"
        }
        if (a5.sy === a5.ey && a5.linewise !== true) {
            bv = true
        }
        if (bl && !be) {
            bp = a0.getRangeText(a5);
            bh = "^*0.." + bp + "^";
            a0.addNewSpecialArea(a5.sx, a5.sy, bp.length, bh);
            be = a0.getSpecialArea(a5.sx, a5.sy)
        }
        bt = bt || br < be.startY || br > be.endY;
        bt = bt || (br === be.startY && bs < be.startX);
        bt = bt || (br === be.endY && bs > be.endX);
        if (!bt) {
            ba = {
                startX: bo,
                startY: bn,
                endX: bs,
                endY: br,
                bol: bo === a0.getTopX(),
                eol: bs === a0.getTopX() + a0.getLineLength(br - a0.getTopY()) - 1
            };
            bk = be.bol && be.eol && a5.linewise !== true && be.type !== "+";
            if (!bk) {
                if (!a5.linewise && be.type === "+" && a0.getLineLength(bn - a0.getTopY()) === 1 && a0.getLetter(bo, bn) === " " && !a9.isCodeBG(bo, bn)) {
                    j = true;
                    return ag(bo, bn, " ", "NOP", undefined)
                }
                a4 = aB(a0, ba, aV, bv);
                a3 = a4.beforeX;
                a2 = a4.beforeY;
                bm = !vim.model.isValidCursorPosition(a3, a2) || a9.getBG(a3, a2) === a9.MISSING || a9.getBG(a3, a2) === a9.SKY_MISSING || a9.getBG(a3, a2) === a9.DARK;
                if (bm && a1) {
                    by = new Board();
                    by.setFillerBG(a9.getFillerBG());
                    aZ = TextArea.prototype.restore(a0.getData());
                    bj = aZ.getSpecialArea(be.startX, be.startY);
                    aW = a0.getTextInRange(bo, bn, bs, br);
                    if (a5.sy === a5.ey && a5.linewise !== true) {
                        bi = aG(a0, be, bo, bn, aW.length, bv, by)
                    } else {
                        bi = X(a0, be, bo, bn, aW, bv, by)
                    }
                    a7 = ah(be, a5, ba, aW, bv);
                    aY = ag(a4.afterX, a4.afterY, a7, bw, bi);
                    at(aY, aZ, bj, false, by);
                    a8 = !ax(bq, 1, bl, undefined, true, a4.afterX, a4.afterY, by, aZ)
                }
            }
        }
        bx = bl ? 0 : A(a5.sx, a5.sy, a5.ex, a5.ey);
        if (bt) {
            bw = "I won't change text out of the required area.";
            aX.notifyShowRangeAnimation(bo, bn, bs, br, a0)
        } else {
            if (bk) {
                if (a5.linewise !== true) {
                    bw = "The deleted range should be linewise (i.e. include the\nwhole line along with the following end of line character)."
                } else {
                    bw = "The deleted range shouldn't be linewise (i.e. it\nshouldn't include the following end of line character)."
                }
            } else {
                if (bm && (!a1 || a8)) {
                    bw = "I won't have a valid location after delete.";
                    aX.notifyShowRangeAnimation(a3, a2, a3, a2, undefined)
                } else {
                    if (bx > 0) {
                        bw = "I should probably get\nrid of " + (bx > 1 ? "these bugs" : "this bug") + " first."
                    } else {
                        aW = a0.getTextInRange(bo, bn, bs, br);
                        bd = a9.getBG(vim.model.getEndOfCodeBlocks(bo, bn), bn);
                        if (a9.getBG(vim.model.getEndOfCodeBlocks(bo, bn) - 1, bn) === a9.MISSING) {
                            bd = a9.SKY_MISSING
                        }
                        if (!vim.validKeys.isValid(a5.linewise ? "o" : "i") && !a1 && aW.length === be.shownText.length && !(a5.linewise && bv)) {
                            bw = "It's not a good idea to delete the whole range\nwithout entering insert mode to add some text here.\nWait until you have the '" + (a5.linewise ? "o" : "i") + "' key to do this..."
                        } else {
                            if (!a5.linewise && !a1 && bv && aW.length === be.shownText.length && bd === a9.SKY_MISSING) {
                                bw = "This will leave me standing on air.\nYou can either use a command\nthat also enters insert mode, or\nmake the deletion linewise."
                            } else {
                                aX.notifyShowRangeAnimation(bo, bn, bs, br, a0);
                                if (a5.sy === a5.ey && a5.linewise !== true) {
                                    bi = aG(a0, be, bo, bn, aW.length, bv)
                                } else {
                                    bi = X(a0, be, bo, bn, aW, bv)
                                }
                                a7 = ah(be, a5, ba, aW, bv);
                                vim.regs.doDelete(aW + (a5.linewise ? "\n" : ""), a6);
                                aL = aW + (a5.linewise ? "\n" : "");
                                j = true
                            }
                        }
                    }
                }
            }
        }
        return ag(bt || bk ? bo : a4.afterX, bt || bk ? bn : a4.afterY, a7, bw, bi)
    }

    function ah(a3, aZ, a2, aW, aY) {
        var aV, aX, a5, a4, a1 = aZ.sx,
            a0 = aZ.sy;
        if (a3.shownText.indexOf("\n") === -1) {
            aV = a1 - a3.startX;
            aX = a3.shownText.substring(0, aV) + (a2.bol && a2.eol && aY ? " " : "") + a3.shownText.substring(aV + aW.length)
        } else {
            a5 = a3.shownText.split("\n");
            if (aZ.linewise) {
                if (aY === true) {
                    a5.splice(a0 - a3.startY, aZ.ey - aZ.sy + 1, " ")
                } else {
                    a5.splice(a0 - a3.startY, aZ.ey - aZ.sy + 1)
                }
            } else {
                if (aW.indexOf("\n") !== -1) {
                    a4 = aW.split("\n");
                    a5[a0 - a3.startY] = a5[a0 - a3.startY].substr(0, a1 - (a0 === a3.startY ? a3.startX : a3.textArea.getTopX()));
                    if (a5[aZ.ey - a3.startY].length === a4[a4.length - 1].length) {
                        a5.splice(aZ.ey - a3.startY, 1)
                    } else {
                        a5[aZ.ey - a3.startY] = a5[aZ.ey - a3.startY].substring(aZ.ex - a3.startX + 1);
                        a5[a0 - a3.startY] += a5[aZ.ey - a3.startY];
                        a5.splice(aZ.ey - a3.startY, 1)
                    }
                    if (aZ.ey - a0 - 1 > 0) {
                        a5.splice(a0 - a3.startY + 1, aZ.ey - a0 - 1)
                    }
                } else {
                    aV = a1 - (a0 === a3.startY ? a3.startX : a3.textArea.getTopX());
                    a5[a0 - a3.startY] = a5[a0 - a3.startY].substring(0, aV) + (a2.bol && a2.eol && aY ? " " : "") + a5[a0 - a3.startY].substring(aV + aW.length)
                }
            }
            aX = a5.join("\n")
        }
        return aX
    }

    function i(a0, a9, a7, aX, aY, a3) {
        var bf, a8 = Cursor.getX(),
            a6 = Cursor.getY(),
            bg, a2, bi = "",
            aZ, bb = vim.view,
            a4 = vim.board,
            aV, bd, bc, ba, aW, bk, bj, bh, be, a5, a1;
        j = false;
        a1 = aY === "\n" || aY === " \n";
        aW = aY.charAt(aY.length - 1) === "\n";
        bj = a0.charAt(0) === "P";
        bk = aY.indexOf("\n") !== -1;
        if (aW) {
            aY = aY.substr(0, aY.length - 1)
        }
        if (aW && (aX.bol === false || aX.eol === false)) {
            if (a1) {
                aZ = "Can't open another line.\nThat's not a linewise range."
            } else {
                aZ = "Can't paste line-wise text into a non-line-wise area"
            }
        } else {
            if (aW) {
                bh = aY.split("\n");
                a5 = aX.originalText.split("\n");
                bg = a6 - aX.startY + (bj ? 0 : 1);
                be = aX.shownText.length > 0 ? aX.shownText.split("\n") : [];
                be.splice.apply(be, [bg, 0].concat(bh));
                bi = be.join("\n");
                if (a3 !== true) {
                    if (be.length > a5.length) {
                        aZ = "Corrected text can't have more\nlines than the original text."
                    } else {
                        if (a5.length === 1) {
                            if (a5[0].length < be[0].length) {
                                aZ = "Corrected text ('" + be[0] + "')\ncan't exceed the original length\n(it should contain '" + a5[0] + "')"
                            }
                        } else {
                            for (bf = 0; bf < a5.length; ++bf) {
                                if (typeof be[bf] !== "undefined" && a5[bf].length < be[bf].length) {
                                    aZ = "Line number " + (bf + 1) + " in the corrected text\n'" + be[bf] + "'\ncan't exceed the original length\n(it should contain '" + a5[bf] + "')";
                                    break
                                }
                            }
                        }
                    }
                }
                if (!aZ) {
                    if (a7.isSacred() && aX.originalText !== aY) {
                        aZ = "The texts don't match, and it's\none of the sacred texts... Try to\nbe more precise. You're trying\nto paste" + (aW ? "\n" : " '") + aY.substr(0, 80) + (aW ? "\n" : "' ") + "there."
                    } else {
                        ba = aP(a7, aX, a7.getTopX(), a6 - (bj ? 1 : 0), aY);
                        a6 = a6 - (bj ? 1 : 0) + (bi === " \n" ? bh.length : 1);
                        a8 = a7.getTopX() + (bi === " \n" ? bh[bh.length - 1].length - 1 : 0);
                        j = true
                    }
                }
            } else {
                if (bk) {
                    aZ = "This works in VIM\nbut isn't supported\nin this game."
                } else {
                    a5 = aX.originalText.split("\n");
                    be = aX.shownText.split("\n");
                    bg = a6 - aX.startY;
                    if (be[bg] === " " && a7.getLineLength(a6 - a7.getTopY()) === 1 && !a4.isCodeBG(a8, a6)) {
                        be[bg] = "";
                        bj = true
                    }
                    a2 = a8 - (a6 === aX.startY ? aX.startX : a7.getTopX()) + (bj ? 0 : 1);
                    be[bg] = be[bg].substring(0, a2) + aY + be[bg].substring(a2);
                    bi = be.join("\n");
                    if (a7.isSacred() && aX.originalText !== bi) {
                        aZ = "The texts don't match, and it's\none of the sacred texts... Try to\nbe more precise. You're trying\nto paste" + (aW ? "\n" : " '") + aY.substr(0, 80) + (aW ? "\n" : "' ") + "there."
                    } else {
                        if (be[bg].length <= a5[bg].length) {
                            ba = G(a7, aX, a8, a6, aY, !bj);
                            a8 = a8 + aY.length - 1 + (bj ? 0 : 1);
                            j = true
                        } else {
                            aZ = "In this game, you are not allowed to add more than\nthe length of the required text."
                        }
                    }
                }
            }
        }
        return ag(a8, a6, bi, aZ, ba)
    }

    function aG(aZ, ba, a0, aY, a3, a1, a4) {
        var aV = aZ.getLineLength(aY - aZ.getTopY()),
            a9 = a0,
            a8 = aY,
            a7 = a0 + a3 - 1,
            aX = aZ.getTopX() + aV,
            a6 = vim.board,
            a2 = a4 || a6,
            a5 = vim.buffers.getCurrentBuffer().getEntities(),
            aW = typeof a4 !== "undefined";
        return function () {
            var bb, bc;
            if (!aW) {
                for (bb = a9; bb <= a7; ++bb) {
                    a5.deleteAtPosition(bb, a8, true);
                    aZ.removeFromSinkList(bb, a8)
                }
            }
            for (bb = a9; bb < aX; ++bb) {
                bc = Math.min(bb + a3, aX);
                a2.setBG(bb, a8, a6.getBG(bc, a8));
                if (bc < aX) {
                    a5.shiftLeft(bc, a8, a3, true);
                    aZ.changeSinkListX(bc, a8, bb)
                }
            }
        }
    }

    function X(a7, aY, a4, a2, bk, a8, ba) {
        var be = bk.split("\n"),
            bc = a4,
            bb = a2,
            bj = bb + be.length - 1,
            bl = a7.getTopX() + be[be.length - 1].length - 1,
            a5 = vim.board,
            aZ = vim.buffers.getCurrentBuffer().getEntities(),
            a9, a0, a1 = vim.model,
            a3, bm, a6, bh, aX, bd, bp, bo = a7.getTopX(),
            bn = a7.getTopY(),
            aW, aV, bg = ba || a5,
            bi = typeof ba !== "undefined",
            bf;
        bf = bo + a7.getLineLength(bj - bn) - 1 - bl;
        a9 = bf === 0;
        aW = a4 === bo;
        a3 = bb === bj;
        bm = a8 && a4 === bo && a9;
        a6 = a1.getBottomEndOfCodeBlocks(bo, bj + (a3 ? 1 : 0));
        aX = [];
        bd = [];
        for (bh = bb; bh < a6; ++bh) {
            aX[bh - bb] = a1.getEndOfCodeBlocks(bo, bh);
            aV = !a5.isCodeBG(bo, bh);
            bp = bh - bn < a7.getNumberOfLines() && a7.getLineLength(bh - bn) === 1 && a7.getLetter(bo, bh) === " " && !a5.isCodeBG(bo, bh);
            bd[bh - bb] = a1.getStartOfCodeBlocks(bo, bh) + (bp || aV ? 0 : 1)
        }
        a0 = aG(a7, aY, a4, a2, be[0].length, bm, ba);
        return function () {
            var bs, br, bq = a7.getTopX(),
                by, bz, bt, bv, bu, bw, bx;
            a0();
            by = be.length - (a9 ? 1 : 2);
            if (!bi) {
                for (bs = 1; bs <= by; ++bs) {
                    for (br = 0; br < be[bs].length; ++br) {
                        aZ.deleteAtPosition(bq + br, bb + bs, true);
                        a7.removeFromSinkList(bq + br, bb + bs);
                        a7.deleteLocalMarkAtPosition(bq + br, bb + bs)
                    }
                }
            }
            if (a9) {
                bz = a3 ? 1 : be.length - (aW ? 0 : 1);
                if (bm) {
                    --bz
                }
                if (!bi) {
                    for (bs = bb + (a3 || aW ? 0 : 1); bs < a6; ++bs) {
                        bw = aX[bs - bb];
                        for (br = bq; br < bw; ++br) {
                            aZ.shiftUp(br, bs, bz, false);
                            a7.changeSinkListY(br, bs, bs - bz);
                            a7.updateLocalMarkY(br, bs, bs - bz);
                            a1.updateGlobalMarkY(br, bs, bs - bz)
                        }
                    }
                }
                bv = 0;
                for (bs = bb + (a3 || aW ? 0 : 1); bs < a6 - bz; ++bs) {
                    bw = aX[bs - bb + bz];
                    bt = aX[bs - bb];
                    bv = Math.max(bv, bw, bt);
                    bu = bd[bs - bb];
                    for (br = bu; br < bt || br < bw; ++br) {
                        bg.setBG(br, bs, a5.getBG(br, bs + bz))
                    }
                }
                for (; bs < a6; ++bs) {
                    bt = aX[bs - bb];
                    bv = Math.max(bv, bt);
                    bu = bd[bs - bb];
                    for (br = bu; br < bv; ++br) {
                        bg.setBG(br, bs, a5.getBG(br, a6))
                    }
                }
            } else {
                if (!bi) {
                    for (br = 0; br < bf; ++br) {
                        aZ.shift(bl + 1 + br, bj, -(bl - bc), -(bj - bb), bj !== bb);
                        a7.changeSinkList(bl + 1 + br, bj, bc + br, bb);
                        a7.updateLocalMark(bl + 1 + br, bj, bc + br + (bl + 1 - bq), bb)
                    }
                }
                bx = a5.getBG(aX[0], bb);
                for (br = bc; br < Math.max(bc + bf, aX[0]); ++br) {
                    bg.setBG(br, bb, br < bc + bf ? a5.getBG(bl + br - bc, bj) : bx)
                }
                bz = be.length - 1;
                if (!bi) {
                    for (bs = bb + 1; bs < a6; ++bs) {
                        bw = aX[bs - bb];
                        for (br = bq; br < bw; ++br) {
                            aZ.shiftUp(br, bs, bz, false);
                            a7.changeSinkListY(br, bs, bs - bz);
                            a7.updateLocalMarkY(br, bs, bs - bz);
                            a1.updateGlobalMarkY(br, bs, bs - bz)
                        }
                    }
                }
                bv = 0;
                for (bs = bb + 1; bs < a6 - bz; ++bs) {
                    bw = aX[bs - bb + bz];
                    bt = aX[bs - bb];
                    bv = Math.max(bv, bw, bt);
                    bu = bd[bs - bb];
                    for (br = bu; br < bt || br < bw; ++br) {
                        bg.setBG(br, bs, a5.getBG(br, bs + bz))
                    }
                }
                for (; bs < a6; ++bs) {
                    bt = aX[bs - bb];
                    bv = Math.max(bv, bt);
                    bu = bd[bs - bb];
                    for (br = bu; br < bv; ++br) {
                        bg.setBG(br, bs, a5.getBG(br, a6))
                    }
                }
            }
        }
    }

    function G(aZ, a6, a7, a5, a8, a9) {
        var aX = a8.length,
            aV = aZ.getLineLength(a6.startY - aZ.getTopY()),
            a4 = a7 + (a9 ? 1 : 0),
            a3 = a5,
            a2 = a4 + aX - 1,
            aY = aZ.getTopX() + aV,
            a1 = vim.board,
            a0 = vim.buffers.getCurrentBuffer().getEntities(),
            aW;
        aW = aZ.getLineLength(a3 - aZ.getTopY()) === 1 && !a1.isCodeBG(a4, a3);
        return function () {
            var bb, bc, ba = Cursor.getX(),
                bd = Cursor.getY();
            if (!aW) {
                for (bb = aY + aX - 1; bb > a2; --bb) {
                    bc = bb - aX;
                    a1.setBG(bb, bd, a1.getBG(bc, bd));
                    a0.shiftLeft(bc, bd, -aX, true);
                    aZ.changeSinkListX(bc, bd, bb)
                }
            }
            for (bb = a4; bb <= a2; ++bb) {
                a1.setBG(bb, bd, a1.PLAIN)
            }
            if (a1.getBG(ba, bd) !== a1.MISSING && a1.getBG(ba, bd) !== a1.SKY_MISSING && a1.getBG(ba, bd) !== a1.DARK && vim.input.isInInputMode()) {
                aZ.cursorPositionUpdate(ba, bd)
            }
        }
    }

    function aP(a1, aW, a8, a7, ba) {
        var bc = ba.split("\n"),
            a3 = a8,
            a2 = a7 + 1,
            aZ = vim.board,
            aX = vim.buffers.getCurrentBuffer().getEntities(),
            aY = vim.model,
            a0 = aY.getBottomEndOfCodeBlocks(a1.getTopX(), a2),
            a5 = ba !== " ",
            aV, a4, bd, bb = a1.getTopX(),
            a9 = a1.getTopY(),
            a6;
        aV = [];
        a4 = [];
        for (a6 = a2; a6 < a0; ++a6) {
            aV[a6 - a2] = aY.getEndOfCodeBlocks(bb, a6);
            bd = a6 - a9 < a1.getNumberOfLines() && a1.getLineLength(a6 - a9) === 1 && a1.getLetter(bb, a6) === " " && !aZ.isCodeBG(bb, a6);
            a4[a6 - a2] = aY.getStartOfCodeBlocks(bb, a6) + (bd ? 0 : 1)
        }
        return function () {
            var bg, bf, bn, bm, be = a1.getTopX(),
                bo = bc.length,
                bh, bj, bi, bk, bl;
            for (bg = a0 - 1; bg >= a2; --bg) {
                bk = aV[bg - a2];
                for (bf = be; bf < bk; ++bf) {
                    aX.shiftUp(bf, bg, -bo, false);
                    a1.changeSinkListY(bf, bg, bg + bo);
                    a1.updateLocalMarkY(bf, bg, bg + bo);
                    vim.model.updateGlobalMarkY(bf, bg, bg + bo)
                }
            }
            bl = aZ.getBG(aV[0], a2);
            if (aZ.getBG(aV[0] - 1, a2) === aZ.MISSING) {
                bl = aZ.SKY_MISSING
            }
            bj = 0;
            for (bg = a0 - 1; bg >= a2; --bg) {
                bk = aV[bg + bo - a2] || be;
                bh = aV[bg - a2];
                bj = Math.max(bj, bk, bh);
                bi = a4[bg - a2];
                for (bf = bi; bf < bh || bf < bk; ++bf) {
                    aZ.setBG(bf, bg + bo, aZ.getBG(bf, bg))
                }
            }
            for (bg = a2; bg < a2 + bo; ++bg) {
                bh = aV[bg - a2] || be;
                for (bf = be; bf < Math.max(be + bc[bg - a2].length, bh); ++bf) {
                    aZ.setBG(bf, bg, a5 && bf - be < bc[bg - a2].length ? aZ.PLAIN : bl)
                }
            }
            bn = Cursor.getX();
            bm = Cursor.getY();
            if (aZ.getBG(bn, bm) !== aZ.MISSING && aZ.getBG(bn, bm) !== aZ.SKY_MISSING && aZ.getBG(bn, bm) !== aZ.DARK && vim.input.isInInputMode()) {
                a1.cursorPositionUpdate(bn, bm)
            }
        }
    }

    function ai(a3, aW, aZ, a6, a2, a7, a8, a1, a4, aX, a5, a0) {
        var a9, aV, aY = a5 === "i" || a5 === "I";
        switch (a3.charAt(0)) {
            case "r":
                a9 = H(a3, aW, aZ, a6);
                break;
            case "~":
                a9 = L(a3, aW, aZ, a6);
                break;
            case "d":
            case "x":
            case "X":
                a9 = F(a3, aW, aZ, a6, a2, a7, a1, a4, a5, a0);
                break;
            case "P":
            case "p":
                a9 = i(a3, aW, aZ, a6, a8, a0);
                break;
            default:
                a9 = ag(x, y, "", "Operation not supported")
        }
        if (!a6 && a0) {
            a6 = aZ.getEmptySpecialArea(a2.sx, a2.sy, aY) || aZ.getSpecialArea(a2.sx, a2.sy) || aZ.getSpecialArea(a2.sx + (aY ? -1 : 1), a2.sy)
        }
        return at(a9, aZ, a6, aX, undefined, a0)
    }

    function at(a7, aY, a5, aV, a0, aZ) {
        var a6 = Cursor.getX(),
            a3 = Cursor.getY(),
            a1 = a0 || vim.board,
            a2 = vim.view,
            aX = vim.audio,
            a4 = vim.input,
            aW = typeof a0 !== "undefined";
        if (a7.errorMsg) {
            if (a7.errorMsg === "NOP") {
                return true
            }
            aX.play("blocked");
            if (aV) {
                a7.errorMsg += "\nCount expansion is stopped."
            }
            aM(a7.errorMsg, true, aV && vim.model.isValidCursorPosition(a6 - 1, a3) && a6 - 1 >= aY.getTopX() ? a6 - 1 : a6);
            return false
        }
        a5.shownText = a7.newText;
        aY.patchSpecialArea(a5, "^" + (a5.hidden === true ? "h" : "") + "+" + a5.originalText.length + "." + a5.originalText + "." + a5.shownText + "^");
        if (!aW) {
            vim.buffers.getCurrentBuffer().getTextAreas().refreshCache(aY);
            az = a5.shownText === "" ? a5.bol && a5.eol && a5.originalText !== "" ? aY.getEmptyLineSpecialArea(a5.startX, a5.startY, true) : aY.getEmptySpecialArea(a5.startX, a5.startY, true) : aY.getSpecialArea(a5.startX, a5.startY);
            if (az.shownText === az.originalText && !a4.isInInputMode() && aV !== true) {
                aY.applyGivenSpecialArea(az);
                a2.notifyBubbleUp(az.startX, az.startY, az.originalText);
                aX.play("deletion")
            }
        }
        if (a7.operation) {
            a7.operation()
        }
        if (!aW) {
            vim.model.clearTextAreaCellCache(aY);
            a6 = a7.x;
            a3 = a7.y;
            aS(a6, a3, aZ);
            if (a1.getBG(a6, a3) !== a1.MISSING && a1.getBG(a6, a3) !== a1.SKY_MISSING && a1.getBG(a6, a3) !== a1.DARK && !vim.input.isInInputMode() && aV !== true) {
                aY.cursorPositionUpdate(a6, a3)
            }
            an(aY, false);
            aq(aY)
        }
        return true
    }

    function v(a1, aW) {
        var a3 = Cursor.getX(),
            a2 = Cursor.getY(),
            aZ = vim.buffers.getCurrentBuffer().getTextAreas().get(a3, a2),
            a0 = aZ ? aZ.getSpecialArea(a3, a2) : undefined,
            aX = false,
            aY, aV;
        aX = typeof aZ === "undefined";
        aX = aX || typeof a0 === "undefined";
        if (!aX && a0.type === "+") {
            return ai(a1, aW, aZ, a0)
        }
        aX = aX || a0.startX !== a3 || a0.endX !== a3 + aW - 1;
        aX = aX || (a0.type !== "r" && a0.type !== "*");
        aX = aX || (a0.type === "*" && !a0.inplace);
        aX = aX || !vim.model.isValidCursorPosition(a0.endX, a0.endY);
        if (!aX) {
            for (aY = 0; aY < aW; ++aY) {
                if (a1.charAt(1) !== (aW === 1 ? a0.originalCharacter : a0.originalText.charAt(aY))) {
                    aX = true;
                    break
                }
            }
        }
        if (aX) {
            if (aZ) {
                vim.view.notifyShowRangeAnimation(a3, a2, a3 + aW - 1, a2, aZ)
            }
            vim.audio.play("error_beep")
        } else {
            aZ.applySpecialArea(a3, a2);
            vim.audio.play("deletion");
            aq(aZ);
            aS(a0.endX, a0.endY);
            if (vim.board.getBG(a0.endX, a0.endY) !== vim.board.MISSING && vim.board.getBG(a0.endX, a0.endY) !== vim.board.SKY_MISSING) {
                aZ.cursorPositionUpdate(a0.endX, a0.endY)
            }
        }
    }

    function aO(aY, a6, aW, a4, aX, a5, aV, a3) {
        var a2, ba, a1, a9, a0, a8, aZ, a7;
        ba = Math.min(a6, a4);
        a9 = Math.max(a6, a4);
        if (ba === a9) {
            a2 = Math.min(aY, aW);
            a1 = Math.max(aY, aW)
        } else {
            a2 = ba === a6 ? aY : aW;
            a1 = ba === a6 ? aW : aY
        }
        a8 = Math.min(a5, a3);
        a7 = Math.max(a5, a3);
        if (a8 === a7) {
            a0 = Math.min(aX, aV);
            aZ = Math.max(aX, aV)
        } else {
            a0 = a8 === a5 ? aX : aV;
            aZ = a8 === a5 ? aV : aX
        }
        return (a2 === a0 && ba === a8 && a1 === aZ && a9 === a7)
    }

    function aU(a4, a3, ba, a8, a7, a9, a2, bb) {
        var aW = false,
            aY = false,
            a5, aZ, bd, aV, aX = vim.model,
            bc = vim.buffers,
            a6 = a8 < a3 || (a8 === a3 && ba < a4),
            a1, a0;
        switch (a7.charAt(0)) {
            case "f":
            case "F":
            case "t":
            case "T":
                if (a4 === ba && a3 === a8) {
                    aW = true
                }
                break
        }
        switch (a7.charAt(0)) {
            case "x":
            case "e":
            case "E":
                break;
            case "w":
            case "W":
                if (a4 !== ba || a3 !== a8) {
                    if (!bb) {
                        if (ba > a9.getTopX()) {
                            ba = ba - 1
                        } else {
                            if (a8 > a9.getTopY()) {
                                a8 = a8 - 1;
                                ba = a9.getLineLength(a8 - a9.getTopY()) + a9.getTopX() - 1
                            }
                        }
                    }
                    if (a2 === true) {
                        while (ba > a9.getTopX() && a9.getLetter(ba, a8) === " ") {
                            ba = ba - 1
                        }
                    }
                }
                if (a2 === true) {
                    while (ba > a9.getTopX() && a9.getLetter(ba, a8) === " ") {
                        ba = ba - 1
                    }
                }
                break;
            case "b":
            case "B":
            case "h":
            case "F":
            case "T":
                if (a4 > a9.getTopX()) {
                    a4 = a4 - 1
                }
                break;
            case "0":
                if (a4 > a9.getTopX()) {
                    a4 = a4 - 1
                } else {
                    aW = true
                }
                break;
            case "|":
            case "^":
                if (a4 < ba) {
                    ba = ba - 1
                } else {
                    if (a4 > ba) {
                        a4 = a4 - 1
                    } else {
                        aW = true
                    }
                }
                break;
            case "`":
                if (a8 < a3 || (a8 === a3 && ba < a4)) {
                    if (a4 > a9.getTopX()) {
                        a4 = a4 - 1
                    } else {
                        if (a3 > a9.getTopY()) {
                            a3 = a3 - 1;
                            a4 = a9.getLineLength(a3 - a9.getTopY()) + a9.getTopX() - 1
                        }
                    }
                } else {
                    if (ba > a9.getTopX()) {
                        ba = ba - 1
                    } else {
                        if (a8 > a9.getTopY()) {
                            a8 = a8 - 1;
                            ba = a9.getLineLength(a8 - a9.getTopY()) + a9.getTopX() - 1
                        }
                    }
                }
                break;
            case "'":
                if (a3 > a8) {
                    a3 = a8;
                    a8 = Cursor.getY()
                }
                a4 = a9.getTopX();
                ba = a9.getTopX() + a9.getLineLength(a8 - a9.getTopY()) - 1;
                aY = true;
                a1 = a7.charAt(1);
                a0 = a9.getLocalMark(a1) || aX.getGlobalMark(a1);
                if (a0 && (typeof a0.bufferName !== "undefined" && a0.bufferName !== bc.getCurrentBuffer().getName())) {
                    aW = true
                }
                break;
            case "/":
            case "?":
            case "n":
            case "N":
                if (a6) {
                    if (a4 > a9.getTopX()) {
                        a4 = a4 - 1
                    } else {
                        if (a3 > a9.getTopY()) {
                            a3 = a3 - 1;
                            a4 = a9.getLineLength(a3 - a9.getTopY()) + a9.getTopX() - 1
                        }
                    }
                } else {
                    if (ba > a9.getTopX()) {
                        ba = ba - 1
                    } else {
                        if (a8 > a9.getTopY()) {
                            a8 = a8 - 1;
                            ba = a9.getLineLength(a8 - a9.getTopY()) + a9.getTopX() - 1
                        }
                    }
                }
                break;
            case "gg":
                a8 = a3;
                ba = a9.getTopX() + a9.getLineLength(a8 - a9.getTopY()) - 1;
                a4 = a9.getTopX();
                a3 = a9.getTopY();
                aY = true;
                break;
            case "G":
                a4 = a9.getTopX();
                a8 = a9.getTopY() + a9.getNumberOfLines() - 1;
                ba = a9.getTopX() + a9.getLineLength(a8 - a9.getTopY()) - 1;
                aY = true;
                break;
            case "H":
            case "M":
            case "L":
                if (a3 > a8) {
                    aV = a3;
                    a3 = a8;
                    a8 = aV
                }
                a4 = a9.getTopX();
                ba = a9.getTopX() + a9.getLineLength(a8 - a9.getTopY()) - 1;
                aY = true;
                break;
            case "d":
            case "j":
            case "k":
            case "y":
            case "Y":
                if (a3 === a8 && ((a7 === "j" && a3 == a9.getTopY() + a9.getNumberOfLines() - 1) || (a7 === "k" && a3 == a9.getTopY()))) {
                    aW = true
                } else {
                    if (a3 > a8) {
                        a3 = a8;
                        a8 = Cursor.getY()
                    }
                    a4 = a9.getTopX();
                    ba = a9.getTopX() + a9.getLineLength(a8 - a9.getTopY()) - 1
                }
                aY = true;
                break;
            case "%":
                if (a4 === a9.getTopX() && ba === a9.getTopX() + a9.getLineLength(a8 - a9.getTopY()) - 1) {
                    aY = true
                }
                break;
            case "{":
            case "(":
                if (a4 > a9.getTopX()) {
                    a4 = a4 - 1
                } else {
                    a3 = a3 - 1;
                    a4 = a9.getTopX() + a9.getLineLength(a3 - a9.getTopY()) - 1
                }
                if (a4 === a9.getTopX() && ba === a9.getTopX() + a9.getLineLength(a8 - a9.getTopY()) - 1) {
                    aY = true
                }
                break;
            case "}":
                a8 = a8 - 1;
                ba = a9.getTopX() + a9.getLineLength(a8 - a9.getTopY()) - 1;
                if (a4 === a9.getTopX() && ba === a9.getTopX() + a9.getLineLength(a8 - a9.getTopY()) - 1) {
                    aY = true
                }
                break;
            case ")":
                if (ba > a9.getTopX()) {
                    ba = ba - 1
                } else {
                    a8 = a8 - 1;
                    ba = a9.getTopX() + a9.getLineLength(a8 - a9.getTopY()) - 1
                }
                if (a4 === a9.getTopX() && ba === a9.getTopX() + a9.getLineLength(a8 - a9.getTopY()) - 1) {
                    aY = true
                }
                break;
            case "a":
                if ("wWs\"'`".indexOf(a7.charAt(1)) !== -1) {
                    a5 = false;
                    if (a9.getLetter(Cursor.getX(), Cursor.getY()) !== " ") {
                        aZ = a9.getTopX() + a9.getLineLength(a8 - a9.getTopY()) - 1;
                        while (ba + 1 <= aZ && a9.getLetter(ba + 1, a8) === " ") {
                            ba = ba + 1;
                            a5 = true
                        }
                    }
                    if (!a5) {
                        bd = a9.getTopX();
                        while (a4 - 1 >= bd && a9.getLetter(a4 - 1, a3) === " ") {
                            a4 = a4 - 1
                        }
                    }
                    aY = a7.charAt(1) === "s" && a4 === a9.getTopX() && ba === a9.getTopX() + a9.getLineLength(a8 - a9.getTopY()) - 1
                } else {
                    if (a7.charAt(1) === "p") {
                        a5 = false;
                        if (!(a9.getLineLength(a3 - a9.getTopY()) === 1 && a9.getLetter(a9.getTopX(), a3) === " ")) {
                            while (a8 + 1 <= a9.getTopY() + a9.getNumberOfLines() - 1 && a9.getLineLength(a8 + 1 - a9.getTopY()) === 1 && a9.getLetter(a9.getTopX(), a8 + 1) === " ") {
                                ba = a9.getTopX();
                                a8 = a8 + 1;
                                a5 = true
                            }
                        }
                        if (!a5) {
                            while (a3 - 1 >= a9.getTopY() && a9.getLineLength(a3 - 1 - a9.getTopY()) === 1 && a9.getLetter(a9.getTopX(), a3 - 1) === " ") {
                                a4 = a9.getTopX();
                                a3 = a3 - 1
                            }
                        }
                        aY = false
                    } else {
                        aY = false
                    }
                }
                break;
            case "i":
                if ("wWsp\"'`".indexOf(a7.charAt(1)) !== -1) {
                    if ("\"'`".indexOf(a7.charAt(1)) !== -1) {
                        a4 = a4 + 1;
                        ba = ba - 1
                    } else {}
                    aY = false
                } else {
                    if (a4 < a9.getTopX() + a9.getLineLength(a3 - a9.getTopY()) - 1) {
                        a4 = a4 + 1
                    } else {
                        a4 = a9.getTopX();
                        a3 = a3 + 1
                    }
                    if (ba > a9.getTopX()) {
                        ba = ba - 1
                    } else {
                        a8 = a8 - 1;
                        ba = a9.getTopX() + a9.getLineLength(a8 - a9.getTopY()) - 1
                    }
                    aY = a3 !== a8 && a4 === a9.getTopX() && ba === a9.getTopX() + a9.getLineLength(a8 - a9.getTopY()) - 1
                }
                break
        }
        return {
            sx: a4,
            sy: a3,
            ex: ba,
            ey: a8,
            cancel: aW,
            linewise: aY
        }
    }

    function aB(a1, a4, a5, a2) {
        var aV, a7, aX, aW, a3, aY, aZ, a0, a6;
        aZ = a4.endY - a4.startY > 0 || a5 === "d";
        a3 = a1.getTopX() + a1.getLineLength(a4.endY - a1.getTopY()) - 1;
        aY = a1.getTopX() + a1.getLineLength(a4.startY - a1.getTopY()) - 1;
        a0 = a1.getTopY() + a1.getNumberOfLines() - 1;
        a6 = a2 && a4.bol && a4.eol;
        aV = a4.endX;
        a7 = a4.endY;
        if (a6) {
            aV = a4.startX;
            a7 = a4.startY
        } else {
            if (aV !== a3) {
                ++aV
            } else {
                if (!aZ) {
                    if (a4.startX > a1.getTopX()) {
                        aV = a4.startX - 1
                    }
                } else {
                    if (a7 !== a0) {
                        aV = a1.softBOLPos(a1.getTopX(), a4.endY + 1).x;
                        ++a7
                    } else {
                        if (a4.startX > a1.getTopX()) {
                            aV = a4.startX - 1;
                            a7 = a4.startY
                        } else {
                            aV = a1.softBOLPos(a1.getTopX(), a4.startY - 1).x;
                            a7 = a4.startY - 1
                        }
                    }
                }
            }
        }
        aX = a4.startX;
        aW = a4.startY;
        if (a6) {} else {
            if (aZ && a4.bol === true && a4.eol === true) {
                if (a4.endY !== a0) {
                    aX = a1.softBOLPos(a1.getTopX(), a4.endY + 1).x
                } else {
                    aX = a1.softBOLPos(a1.getTopX(), a4.startY - 1).x;
                    aW = a4.startY - 1
                }
            } else {
                if (aZ && a4.eol !== true) {} else {
                    if (a4.startX > a1.getTopX() && aZ) {
                        --aX
                    } else {
                        if (a4.endX === aY && !aZ) {
                            --aX
                        } else {
                            if (a4.endX === a3 && a4.endY === a0) {
                                aX = a1.softBOLPos(a1.getTopX(), a4.startY - 1).x;
                                aW = a4.startY - 1
                            } else {
                                if (a4.startX === a1.getTopX() && aZ) {
                                    aX = a1.softBOLPos(a1.getTopX(), a4.endY + 1).x
                                }
                            }
                        }
                    }
                }
            }
        }
        return {
            beforeX: aV,
            beforeY: a7,
            afterX: aX,
            afterY: aW
        }
    }

    function aw(a5, aW) {
        var aX, aY, ba = Cursor.getX(),
            a8 = Cursor.getY(),
            aZ, bb, a4 = vim.board,
            a9, a7, a6, a3, a2 = vim.buffers.getCurrentBuffer().getTextAreas(),
            a1 = vim.buffers.getCurrentBuffer().getEntities(),
            aV, a0;
        aX = a5.charAt(0) === "O";
        aZ = a2.get(ba, a8);
        if (!aZ) {
            aM("'" + a5.charAt(0) + "' can only be used on text.");
            vim.audio.play("error_beep");
            return
        }
        a0 = false;
        bb = aZ.getEmptyLineSpecialArea(ba, a8, aX);
        if (bb && (bb.type === "*" || bb.type === "+")) {
            a0 = true
        }
        if (!a0 && !bb) {
            bb = aZ.getSpecialArea(ba, a8);
            if (bb && bb.type === "+") {
                if (aX && !(!bb.bol && a8 === bb.startY)) {
                    a0 = true
                } else {
                    if (!aX && !(!bb.eol && a8 === bb.endY)) {
                        a0 = true
                    }
                }
            }
        }
        if (!a0) {
            vim.audio.play("blocked");
            a9 = aZ.getTopX();
            a7 = a8 + (aX ? -1 : 1);
            a3 = a7;
            a6 = a7 >= aZ.getTopY() && a7 <= aZ.getTopY() + aZ.getNumberOfLines() - 1 ? a9 + aZ.getLineLength(a7 - aZ.getTopY()) - 1 : a3;
            vim.view.notifyShowRangeAnimation(a9, a7, a6, a3, undefined);
            aM("There is no missing text there.")
        } else {
            aV = (a5.charAt(0) === "o" ? "p" : "P") + a5.substr(1);
            ai(aV, 1, aZ, bb, undefined, undefined, " \n");
            if (j) {
                ax("a", aW, false, true, false)
            }
        }
    }

    function aT(a0, a5, aX) {
        var a6 = vim.regs,
            aW, a7, bg, bd, a4 = Cursor.getX(),
            a2 = Cursor.getY(),
            a3, aY, a1 = vim.board,
            bh, aV, ba, a9, bf, be, bc = vim.buffers.getCurrentBuffer().getTextAreas(),
            aZ = vim.buffers.getCurrentBuffer().getEntities(),
            bb, a8;
        aX = aX || '"';
        if (aX === "_") {
            return
        }
        if (!a6.getRegister(aX)) {
            vim.audio.play("error");
            aM("Nothing in register " + aX);
            return
        }
        a7 = "";
        for (bd = 0; bd < a5; ++bd) {
            a7 += a6.getRegister(aX)
        }
        aV = a7.charAt(a7.length - 1) === "\n";
        bg = a0.charAt(0) === "P";
        bh = a7.indexOf("\n") !== -1;
        if (aV) {
            a7 = a7.substr(0, a7.length - 1)
        }
        a3 = bc.get(a4, a2);
        if (!a3) {
            aM("'" + a0.charAt(0) + "' can only be used on text.");
            vim.audio.play("error_beep");
            return
        }
        bb = false;
        a8 = false;
        aY = aV ? a3.getEmptyLineSpecialArea(a4, a2, bg) : a3.getEmptySpecialArea(a4, a2, bg) || a3.getSpecialArea(a4, a2) || (bg ? a3.getSpecialArea(a4 - 1, a2) : !bg ? a3.getSpecialArea(a4 + 1, a2) : undefined);
        if (aY && (aY.type === "*" || (aY.type === "+" && aY.shownText === ""))) {
            bb = true
        } else {
            aY = a3.getSpecialArea(a4, a2);
            if (aY && aY.type === "+") {
                a8 = true
            }
        }
        if (!bb && !a8) {
            vim.audio.play("blocked");
            if (!aV && !bh) {
                ba = a4 + (bg ? 0 : 1);
                bf = ba + a7.length - 1;
                a9 = a2;
                be = a9
            } else {
                if (aV) {
                    ba = a3.getTopX();
                    bf = ba + a7.split("\n")[0].length - 1;
                    a9 = a2 + (bg ? -1 : 1);
                    be = a9
                } else {}
            }
            vim.view.notifyShowRangeAnimation(ba, a9, bf, be, undefined);
            aM("There is no missing text there.")
        } else {
            if (vim.model.getLevel() < 11 && bb && aY.originalText === a7 && !aY.shownText) {
                af(aY);
                a3.applyGivenSpecialArea(aY);
                bc.refreshCache(a3);
                vim.audio.play("deletion");
                g(aY);
                vim.model.clearTextAreaCellCache(a3);
                if (aV) {
                    Cursor.set(a3.softBOLPos(a3.getTopX(), aY.startY).x, aY.startY)
                } else {
                    if (!bh) {
                        Cursor.set(aY.startX + a7.length - 1, aY.startY)
                    } else {}
                }
                if (Cursor.getX() !== a4 || Cursor.getY() !== a2) {
                    vim.model.readjustViewToCursorPosition();
                    aZ.collide(Cursor.getX(), Cursor.getY())
                }
                if (a1.getBG(Cursor.getX(), Cursor.getY()) !== a1.MISSING && a1.getBG(Cursor.getX(), Cursor.getY()) !== a1.SKY_MISSING) {
                    a3.cursorPositionUpdate(Cursor.getX(), Cursor.getY())
                }
                an(a3, false);
                aq(a3);
                vim.view.notifyBubbleUp(aY.startX, aY.startY, aY.originalText)
            } else {
                if (vim.model.getLevel() === 10) {
                    vim.audio.play("blocked");
                    if (aY && aY.type === "*" && aY.originalText !== a7) {
                        aM("The texts don't match. You're trying to paste" + (aV ? "\n" : " '") + a7.substr(0, 80) + (aV ? "\n" : "' ") + "there.\nBut do try this again on level 11, ok?", true)
                    }
                } else {
                    if ((aY && aY.type === "*" && !aY.shownText) || (aY && aY.type === "+")) {
                        return ai(a0, a5, a3, aY, undefined, undefined, a7 + (aV ? "\n" : ""))
                    } else {
                        vim.audio.play("blocked");
                        aM("You can paste only to empty or previously edited ranges.", true)
                    }
                }
            }
        }
    }

    function aA(a0, ba, aV, aW, bc, bb, bh, bm) {
        var a9 = Cursor.getX(),
            a8 = Cursor.getY(),
            a1 = a9,
            aZ = a8,
            bs, aX, bf, a6 = true,
            a2, be, a5 = vim.board,
            bk = a0 === "x" ? "x" : a0.substr(1),
            a4 = parseInt(bk, 10) || 1,
            bp = bk.substr(isNaN(parseInt(bk, 10)) || bk === "0" ? 0 : ("" + parseInt(bk, 10)).length),
            br, a3, bg, bd, bq, bj, bi, aY = vim.buffers.getCurrentBuffer().getEntities(),
            bo = vim.buffers.getCurrentBuffer().getTextAreas(),
            bt, bl, bn = false,
            a7;
        j = false;
        if (!bo.exist(a9, a8)) {
            vim.audio.play("error_beep");
            return
        }
        bs = bo.get(a9, a8);
        if (bp == "l") {
            a4 = ba * a4 - 1;
            ba = 1;
            bk = a4 + bp
        }
        if (a4 === 0) {
            a2 = true;
            be = {
                sx: a9,
                sy: a8,
                ex: a9,
                ey: a8
            }
        } else {
            if ("ai".indexOf(bp.charAt(0)) !== -1) {
                a2 = true;
                be = bs.getTextObjectRange(bp, ba * a4);
                if (!be.cancel) {
                    be = aU(be.sx, be.sy, be.ex, be.ey, bp, bs, false, be.wordOutOfBounds);
                    if (bk.charAt(1) === "p") {
                        be.linewise = true
                    }
                }
            } else {
                a2 = Cursor.doMotion(bk, true, ba);
                if (!a2 && (bp.charAt(0) == "`" || bp.charAt(0) === "'")) {
                    a7 = bp.charAt(1);
                    if (!vim.model.isSupportedMark(a7)) {
                        vim.screens["game-screen"].setColonCommand("E78: Unknown Mark (" + a7 + " is not a supported mark name).");
                        vim.audio.play("error_beep");
                        return
                    }
                    if ((vim.model.isLocalMark(a7) && !bo.get(Cursor.getX(), Cursor.getY()).getLocalMark(a7)) || (vim.model.isGlobalMark(a7) && !vim.model.getGlobalMark(a7))) {
                        vim.screens["game-screen"].setColonCommand("E20: Mark not set");
                        vim.audio.play("error_beep");
                        return
                    }
                }
                if (Cursor.getSimulationBufferName() !== vim.buffers.getCurrentBuffer().getName()) {
                    bn = true
                } else {
                    be = aU(Cursor.getX(), Cursor.getY(), Cursor.getSimulationX(), Cursor.getSimulationY(), bp, bs, bc, Cursor.getSimulationWordOutOfBounds())
                }
            }
        }
        if (!bn) {
            if (be.cancel !== true) {
                R(a0, be.sx, be.sy, be.ex, be.ey)
            }
            aX = bs.getSpecialArea(be.sx, be.sy);
            if ((!aX && aW) || (aX && (aX.type === "+" || (aX.type === "*" && aO(aX.startX, aX.startY, aX.endX, aX.endY, be.sx, be.sy, be.ex, be.ey))) && be.cancel !== true && (a2 || bh))) {
                return ai(a0, ba * a4, bs, aX, be, aV, undefined, bb, bh, false, bm, aW)
            }
            bi = aX && aX.type === "d" && !be.cancel && aX.startX === be.ex && aX.startY === be.ey && aX.endX - 1 === be.sx && aX.endY === be.sy;
            if (!aX || (aX.type !== "d" && aX.type !== "x") || be.cancel === true || !aO(aX.startX, aX.startY, aX.endX, aX.endY, be.sx, be.sy, be.ex, be.ey) || !a2) {
                a6 = false
            }
            bj = aX && aX.bol && aX.eol && be.linewise !== true;
            if (a6 && !bj) {
                br = aB(bs, aX, bp);
                bg = br.beforeX;
                bd = br.beforeY;
                a3 = !vim.model.isValidCursorPosition(bg, bd) || a5.getBG(bg, bd) === a5.MISSING || a5.getBG(bg, bd) === a5.SKY_MISSING || a5.getBG(bg, bd) === a5.DARK
            }
            if (bi) {
                aM("When deleting backwards,\nthe character under the cursor\nis not deleted. Try doing\nthis one step to the right.", true)
            }
            if (be.cancel !== true) {
                bl = aW ? 0 : A(be.sx, be.sy, be.ex, be.ey)
            }
        }
        if (bn) {
            vim.audio.play("blocked");
            aM("Target mark is in\nanother buffer.")
        } else {
            if (!a6) {
                vim.audio.play("blocked");
                if (a2 && !be.cancel) {
                    vim.view.notifyShowRangeAnimation(be.sx, be.sy, be.ex, be.ey, bs)
                }
            } else {
                if (a3) {
                    vim.audio.play("blocked");
                    vim.view.notifyShowRangeAnimation(bg, bd, bg, bd, undefined);
                    aM("I won't have a valid location after delete")
                } else {
                    if (bj) {
                        vim.audio.play("blocked");
                        if (be.linewise !== true) {
                            aM("The deleted range should be linewise (i.e. include the\nwhole line along with the following end of line character).")
                        } else {
                            aM("The deleted range shouldn't be linewise (i.e. it\nshouldn't include the following end of line character).")
                        }
                    } else {
                        if (bl > 0) {
                            vim.audio.play("blocked");
                            aM("I should probably get\nrid of " + (bl > 1 ? "these bugs" : "this bug") + " first.")
                        } else {
                            bf = bs.getLineLength(a8 - bs.getTopY());
                            bt = vim.model.getBottomEndOfCodeBlocks(bs.getTopX(), bs.getTopY() + bs.getNumberOfLines());
                            vim.view.notifyShowRangeAnimation(aX.startX, aX.startY, aX.endX, aX.endY, bs);
                            bq = bs.getAffectedText(be.sx, be.sy);
                            bs.applySpecialArea(be.sx, be.sy);
                            vim.regs.doDelete(bq, aV);
                            aL = bq;
                            bo.refreshCache(bs);
                            vim.audio.play("deletion");
                            aF(aX);
                            U(aX, bt);
                            u(aX, bt);
                            vim.model.clearTextAreaCellCache(bs);
                            Cursor.set(br.afterX, br.afterY);
                            if (Cursor.getX() !== a1 || Cursor.getY() !== aZ) {
                                vim.model.readjustViewToCursorPosition();
                                aY.collide(Cursor.getX(), Cursor.getY())
                            }
                            if (a5.getBG(Cursor.getX(), Cursor.getY()) !== a5.MISSING && a5.getBG(Cursor.getX(), Cursor.getY()) !== a5.SKY_MISSING) {
                                bs.cursorPositionUpdate(Cursor.getX(), Cursor.getY())
                            }
                            an(bs, false);
                            aq(bs);
                            j = true
                        }
                    }
                }
            }
        }
    }

    function Q(aW, a4, aV) {
        var a3 = Cursor.getX(),
            a2 = Cursor.getY(),
            bc, aY, a7, a8 = aW === "x" ? "x" : aW.substr(1),
            aZ = parseInt(a8, 10) || 1,
            ba = a8.substr(isNaN(parseInt(a8, 10)) || a8 === "0" ? 0 : ("" + parseInt(a8, 10)).length),
            bd, bb = vim.buffers.getCurrentBuffer().getTextAreas(),
            a6, a5, a0 = vim.board,
            aX = vim.model,
            a9 = false,
            be, a1;
        if (!bb.exist(a3, a2)) {
            vim.audio.play("error_beep");
            return
        }
        bc = bb.get(a3, a2);
        if (ba === "") {
            ba = "yy";
            aZ = 1;
            a8 = "1yy"
        }
        if (ba == "l") {
            aZ = a4 * aZ - 1;
            a4 = 1;
            a8 = aZ + ba
        }
        if ("ai".indexOf(ba.charAt(0)) !== -1) {
            a7 = bc.getTextObjectRange(ba, a4 * aZ);
            if (!a7.cancel) {
                a7 = aU(a7.sx, a7.sy, a7.ex, a7.ey, ba, bc, false, a7.wordOutOfBounds)
            }
        } else {
            if (aZ !== 0) {
                be = Cursor.doMotion(a8, true, a4);
                if (!be && (ba.charAt(0) == "`" || ba.charAt(0) === "'")) {
                    a1 = ba.charAt(1);
                    if (!vim.model.isSupportedMark(a1)) {
                        vim.screens["game-screen"].setColonCommand("E78: Unknown Mark (" + a1 + " is not a supported mark name).");
                        vim.audio.play("error_beep");
                        return
                    }
                    if ((vim.model.isLocalMark(a1) && !bb.get(Cursor.getX(), Cursor.getY()).getLocalMark(a1)) || (vim.model.isGlobalMark(a1) && !vim.model.getGlobalMark(a1))) {
                        vim.screens["game-screen"].setColonCommand("E20: Mark not set");
                        vim.audio.play("error_beep");
                        return
                    }
                }
                if (Cursor.getSimulationBufferName() !== vim.buffers.getCurrentBuffer().getName()) {
                    a9 = true
                } else {
                    a7 = aU(Cursor.getX(), Cursor.getY(), Cursor.getSimulationX(), Cursor.getSimulationY(), ba, bc, false, Cursor.getSimulationWordOutOfBounds())
                }
            } else {
                aY = true;
                a7 = {
                    sx: a3,
                    sy: a2,
                    ex: a3,
                    ey: a2
                }
            }
        }
        if (!a9) {
            if (a7.cancel !== true) {
                if (a7.linewise === true) {
                    a5 = Math.min(a7.sy, a7.ey);
                    if (Cursor.isGluedToEOL()) {
                        a6 = bc.getTopX() + bc.getLineLength(a5 - bc.getTopY()) - 1
                    } else {
                        a6 = Math.min(a3, bc.getTopX() + bc.getLineLength(a5 - bc.getTopY()) - 1)
                    }
                } else {
                    a6 = a7.sx;
                    a5 = a7.sy;
                    if (a7.ey < a7.sy || (a7.sy === a7.ey && a7.sx > a7.ex)) {
                        a6 = a7.ex;
                        a5 = a7.ey
                    }
                }
            }
            if (a7.cancel !== true) {
                aY = aX.isValidCursorPosition(a6, a5)
            }
        }
        if (a9) {
            vim.audio.play("blocked");
            aM("Target mark is in\nanother buffer.")
        } else {
            if (a7.cancel === true) {
                vim.audio.play("blocked")
            } else {
                if (!aY) {
                    vim.audio.play("blocked");
                    vim.view.notifyShowRangeAnimation(a6, a5, a6, a5, undefined);
                    aM("I won't have a valid\nlocation after the yank...")
                } else {
                    vim.view.notifyShowRangeAnimation(a7.sx, a7.sy, a7.ex, a7.ey, bc);
                    if (a7.cancel !== true) {
                        R(aW, a7.sx, a7.sy, a7.ex, a7.ey)
                    }
                    bd = bc.yankTextInRange(a7);
                    vim.regs.doYank(bd, aV);
                    vim.audio.play("yank");
                    z(a6, a5, "HML".indexOf(a8.charAt(0)) !== -1)
                }
            }
        }
    }

    function h() {
        vim.input.disableKeys();
        vim.model.setCandleLightMode(true);
        vim.view.notifyCandleLightAnimation();
        vim.screens["game-screen"].hideCommandHelp();
        vim.audio.play("slam");
        // TOFIX - Removed this !vim.login.isUserLoggedIn()
        if (false) {
            vim.free_game_ended = true;
            window.setTimeout(vim.screens["game-screen"].toBeContinuedFadeIn, 7030)
        } else {
            vim.input.enableKeys()
        }
    }

    function ad() {
        var aV = aD("#user-message")[0];
        aV.style.visibility = "hidden";
        aE = -1
    }

    function e(aW) {
        var aV = aD("#user-message")[0];
        aV.innerHTML = aW;
        aV.style.visibility = "visible";
        if (aE !== -1) {
            window.clearTimeout(aE)
        }
        aE = window.setTimeout(ad, 3000)
    }

    function aM(aY, aX, aW, aV) {
        vim.view.setCursorCommand(aY, aX, aW, aV)
    }

    function aI(aV) {
        vim.view.setCursorCommand(aV, true)
    }

    function al(aV, aZ, aY, aW, aX) {
        vim.view.notifySpeech(aV, aZ, aY, aW, aX)
    }

    function aC(aV) {
        vim.view.notifyPrincessFlashAnimation(aV)
    }

    function d() {
        vim.view.notifyKeyboardKeyAnimation()
    }

    function W() {
        vim.view.notifyLightsOnAnimation()
    }

    function B() {
        vim.view.scrollTop()
    }

    function w() {
        vim.view.scrollBottom()
    }

    function ak() {
        vim.view.scrollMiddle()
    }

    function J(aV) {
        return a(aV, true, true)
    }

    function a(be, bm, a1) {
        var aV = az,
            a7 = aV.textArea,
            a9 = Cursor.getX(),
            a6 = Cursor.getY(),
            bn = a7.getTopX(),
            bk = a7.getTopY(),
            a3 = vim.board,
            a8, bf, bl = a9 - (a6 === aV.startY ? aV.startX : bn),
            ba, bo, aW, bb, bj = a9,
            bi = a6,
            bc = false,
            bq = be === "BACKSPACE",
            a0 = be === "DELETE",
            bd = be === "REPLAY_ENTER",
            aX = be === "USER_ENTER",
            a4, bg = a6 - aV.startY,
            a5, a2, bh, bp, aZ, aY = vim.model;
        a4 = aV.shownText.split("\n");
        a5 = aV.originalText.split("\n");
        bp = a4[bg] === " " && a7.getLineLength(a6 - bk) === 1 && bl === 0 && !a3.isCodeBG(a9, a6);
        if (bd) {
            aZ = ai("p", 1, a7, aV, undefined, undefined, (s.length === 0 || bp ? " " : "") + "\n", bp, false, bm, undefined, a1);
            if (aZ) {
                bj = bn;
                bi = a6 + 1
            }
            bc = true
        } else {
            if (aX) {
                aW = "That works in VIM, but is not supported in this game...\nEither insert / paste the correct number of lines\nto begin with, or use 'o' / 'O' to create new lines."
            }
        }
        if ((bl === 0 && bq) || (a0 && bl === a4[bg].length)) {
            aW = "That works in VIM, but not in this game..."
        } else {
            if (bq && a3.getHeight(a9 - 1, a6) !== 1) {
                aW = "I can't backspace there..."
            } else {
                if (a0 && a3.getHeight(a9, a6) !== 1) {
                    aW = "I can't delete that..."
                } else {
                    if (a6 - aV.startY < a5.length && a4[a6 - aV.startY].length >= a5[a6 - aV.startY].length && bq && !aY.isValidCursorPosition(Math.max(a7.topX, a9 - 2), a6)) {
                        aW = "If I backspace this, I won't have\na valid location to exit insert mode."
                    } else {
                        if (a6 - aV.startY < a5.length && a4[a6 - aV.startY].length >= a5[a6 - aV.startY].length && a0 && !aY.isValidCursorPosition(Math.min(a9 + 1, a7.topX + a7.getLineLength(a6 - bk) - 1), a6)) {
                            aW = "If I delete this, I won't have a valid\nlocation to exit insert mode."
                        } else {
                            if (!bd && !aX) {
                                if (bq || a0) {
                                    bh = bq ? -1 : 0;
                                    a2 = bl + bh;
                                    a4[bg] = a4[bg].substring(0, a2) + a4[bg].substring(a2 + 1);
                                    if (a4[bg] === "" && a7.getLineLength(a6 - bk) === 1) {
                                        a4[bg] = " "
                                    }
                                    bo = a4.join("\n");
                                    bb = aG(a7, aV, a9 + bh, a6, 1, true);
                                    bj = a9 + bh
                                } else {
                                    if (bp) {
                                        a4[bg] = ""
                                    }
                                    if (a1 === true || (bg < a5.length && a4[bg].length < a5[bg].length)) {
                                        a4[bg] = a4[bg].substring(0, bl) + be + a4[bg].substring(bl);
                                        bo = a4.join("\n");
                                        bb = G(a7, aV, a9, a6, be, false);
                                        bj = a9 + 1
                                    } else {
                                        aW = "In this game, you are not allowed to add\nmore than the length of the required text."
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (bm !== true && a1 !== true) {
            s.push(be)
        }
        if (!bc) {
            ba = ag(bj, bi, bo, aW, aW ? undefined : bb);
            aZ = at(ba, a7, aV, bm, undefined, a1)
        }
        if (typeof vim.model.getGlobalSearchStr() !== "undefined") {
            vim.buffers.getCurrentBuffer().getTextAreas().highlight(vim.model.getGlobalSearchStr())
        }
        return aZ
    }

    function P() {
        var aV = Cursor.getX(),
            aZ = Cursor.getY(),
            aW = vim.model,
            aY = vim.board,
            aX;
        if (aW.isValidCursorPosition(aV - 1, aZ) && aV - 1 >= az.textArea.getTopX()) {
            aV = aV - 1
        }
        aX = aY.getBG(aV, aZ);
        return (aW.isValidCursorPosition(aV, aZ) && aX !== aY.MISSING && aX !== aY.SKY_MISSING && aX !== aY.DARK)
    }

    function C(aW, aV) {
        if (aV === true) {
            ac.length = 0
        }
        ac.push(aW)
    }

    function M() {
        return ap
    }

    function c(aV) {
        ap = aV
    }

    function Y() {
        var aX, aY = vim.validKeys,
            aW = "#$%^*()_+0-=WwEe{}GHhjklL|BbNnM,;",
            aV = "`'Tt[]Ff/?g",
            aZ = "123456789";
        for (aX = 0; aX < aW.length; ++aX) {
            aY.temporarilyDisable(aW.charAt(aX))
        }
        for (aX = 0; aX < aV.length; ++aX) {
            aY.temporarilyDisable(aV.charAt(aX))
        }
        for (aX = 0; aX < aZ.length; ++aX) {
            aY.temporarilyDisable(aZ.charAt(aX))
        }
        ac.length = 0;
        vim.regs.reset();
        vim.regs.doYank("Dear me,", "u");
        vim.regs.doYank("Worst really came to worst. The plan fell apart.", "v");
        vim.regs.doYank("I hid most of what I need in the lorem buffer.", "w");
        vim.regs.doYank("Directions are in the ground buffer.", "x");
        vim.regs.doYank("The secret to winning is hidden in the marks that are in another castle... written across the sky between W and Y", "y");
        vim.regs.doYank("---");
        vim.regs.doDelete("Houston, we have a problem...")
    }

    function T(aW) {
        var aV = vim.view;
        ar.princessPostCallback = aW;
        aV.notifyFadeOutAnimation(function () {
            vim.view.notifyBlank();
            window.setTimeout(ar, 3000);
            window.setTimeout(function () {
                vim.view.notifyPrincessFlashAnimation(undefined, "#0a0")
            }, 1000)
        })
    }

    function ar() {
        if (ar.princessPostCallback) {
            ar.princessPostCallback()
        }
        vim.buffers.switchTo("sky");
        vim.buffers.switchTo("lorem");
        vim.view.notifyFadeInAnimation();
        Y();
        aI("Level 14 ?!\n\nAnd WHERE HAVE ALL\nMY MOTIONS GONE?!")
    }

    function aj(aW) {
        var a4 = Cursor.getX(),
            a3 = Cursor.getY(),
            a2 = vim.buffers.getCurrentBuffer(),
            aY = a2.getTextAreas().get(a4, a3),
            a5 = aY.getSpecialArea(a4, a3),
            aX = vim.audio,
            aZ = vim.model,
            a0 = aY.getLocalMark(aW) || aZ.getGlobalMark(aW),
            a1 = aY.getLocalMarkForPosition(a4, a3) || aZ.getGlobalMarkForPosition(a4, a3),
            aV = a0 && a0.fixed === true;
        if (!aZ.isSupportedMark(aW)) {
            aX.play("error_beep");
            return
        }
        if (aV) {
            aI("The '" + aW + "' mark is already used.\nA new mark will replace the\nold one which was left for\nme on purpose so I'd better\nleave it alone for now.");
            aX.play("error_beep");
            return
        }
        if (a1 && a1.mark !== aW) {
            aM("That would work in VIM, but\nin this game you can't put\ntwo marks at the same place.");
            vim.audio.play("error_beep");
            return
        }
        if (a5 && a5.type === "o" && a5.requiredMark !== aW) {
            if (a5.hidden) {
                aM("'" + aW + "' doesn't feel\nright right here...")
            } else {
                aM("'" + a5.requiredMark + "' mark is required here.")
            }
            vim.audio.play("error_beep");
            return
        }
        if (aW >= "A" && aW <= "Z") {
            aZ.addGlobalMark(aW, a4, a3)
        } else {
            aY.addLocalMark(aW, a4, a3)
        }
        if (a2.getName() === "underground" && vim.model.getLevel() === 14 && aY.isBossMode() && a5 && a5.type === "o") {
            aX.play("aura")
        } else {
            aX.play("boing")
        }
        if (aY.hasMarkSpecialAreas()) {
            aq(aY)
        }
    }
    return {
        init: V,
        gameFocus: aJ,
        recollide: aa,
        errorMove: aH,
        processCommand: q,
        processInputModeInput: a,
        processUndoRedoInputModeInput: J,
        enableBlink: K,
        disableBlink: S,
        showMessage: e,
        setCursorCommand: aM,
        setCursorCommandUntilMove: aI,
        moveLeft: m,
        moveRight: p,
        moveUp: Z,
        moveDown: aK,
        doDelete: aA,
        scrollTop: B,
        scrollBottom: w,
        scrollMiddle: ak,
        cursorSetAndReadjust: aS,
        darknessFalls: h,
        restartGame: ae,
        disableMotions: Y,
        level13CutScene: T,
        speech: al,
        princessFlashAnimation: aC,
        keyboardKeyAnimation: d,
        lightsOnAnimation: W,
        checkForSwipingAndAdvance: an,
        testTextCompletion: aq,
        hasInvisibleItems: ao,
        returnToCommandMode: I,
        canReturnToCommandMode: P,
        addToLastChangeCommandBuffer: C,
        getLastChangeCommandNumber: M,
        setLastChangeCommandNumber: c,
        bugsCount: A
    }
})();
vim.input = (function () {
    var p = vim.validKeys,
        s = Game,
        b = vim.dom,
        a = {},
        u = -1,
        C, N, c, t, r;
    var q = {
        states: {
            start: {
                input_type: "discrete",
                inputs: {
                    "1": "times",
                    "2": "times",
                    "3": "times",
                    "4": "times",
                    "5": "times",
                    "6": "times",
                    "7": "times",
                    "8": "times",
                    "9": "times",
                    '"': "registers",
                    h: "moveLeft",
                    l: "moveRight",
                    k: "moveUp",
                    j: "moveDown",
                    w: "execute",
                    W: "execute",
                    b: "execute",
                    B: "execute",
                    e: "execute",
                    E: "execute",
                    "^": "execute",
                    "0": "execute",
                    $: "execute",
                    ";": "execute",
                    ",": "execute",
                    G: "execute",
                    g: "_goto",
                    "*": "execute",
                    "#": "execute",
                    n: "execute",
                    N: "execute",
                    "(": "execute",
                    ")": "execute",
                    "{": "execute",
                    "}": "execute",
                    H: "execute",
                    M: "execute",
                    L: "execute",
                    "|": "execute",
                    x: "execute",
                    X: "execute",
                    "~": "execute",
                    D: "execute",
                    C: "execute",
                    Y: "execute",
                    "%": "execute",
                    p: "execute",
                    P: "execute",
                    i: "execute",
                    I: "execute",
                    a: "execute",
                    A: "execute",
                    s: "execute",
                    S: "execute",
                    o: "execute",
                    O: "execute",
                    ".": "execute",
                    u: "execute",
                    "CTRL-R": "execute",
                    r: "askForOneChar",
                    m: "askForMark",
                    "'": "askForMark",
                    "`": "askForMark",
                    f: "askForOneChar",
                    F: "askForOneChar",
                    t: "askForOneChar",
                    T: "askForOneChar",
                    "[": "askForOpeningBracket",
                    "]": "askForClosingBracket",
                    d: "askForMotionOrTextObject",
                    y: "askForMotionOrTextObject",
                    c: "askForMotionOrTextObject",
                    z: "scrollAskForPosition",
                    ":": "sendToColonCommand",
                    "/": "sendToColonCommand",
                    "?": "sendToColonCommand"
                }
            },
            sendToColonCommand: {
                input_type: "regex",
                inputs: {
                    ENTER: "performColonCommand",
                    BACKSPACE: "sendToColonCommand",
                    ".": "sendToColonCommand"
                }
            },
            askForOpeningBracket: {
                input_type: "discrete_no_validation",
                inputs: {
                    "(": "execute",
                    "{": "execute"
                }
            },
            askForClosingBracket: {
                input_type: "discrete_no_validation",
                inputs: {
                    ")": "execute",
                    "}": "execute"
                }
            },
            scrollAskForPosition: {
                input_type: "discrete_no_validation",
                inputs: {
                    z: "scrollMiddle",
                    t: "scrollTop",
                    b: "scrollBottom"
                }
            },
            times: {
                input_type: "times",
                inputs: {
                    "1": "times",
                    "2": "times",
                    "3": "times",
                    "4": "times",
                    "5": "times",
                    "6": "times",
                    "7": "times",
                    "8": "times",
                    "9": "times",
                    "0": "times",
                    DELETE: "times"
                }
            },
            registers: {
                input_type: "register",
                inputs: {
                    ".": "back"
                }
            },
            askForOneChar: {
                input_type: "regex",
                inputs: {
                    ".": "execute"
                }
            },
            askForMark: {
                input_type: "regex",
                inputs: {
                    mark: "execute"
                }
            },
            askForMotionOrTextObject: {
                input_type: "an_or_inner",
                inputs: {
                    "1": "times",
                    "2": "times",
                    "3": "times",
                    "4": "times",
                    "5": "times",
                    "6": "times",
                    "7": "times",
                    "8": "times",
                    "9": "times",
                    a: "askForTextObject",
                    i: "askForTextObject"
                }
            },
            askForTextObject: {
                input_type: "discrete_no_validation",
                inputs: {
                    w: "execute",
                    W: "execute",
                    s: "execute",
                    p: "execute",
                    "[": "execute",
                    "]": "execute",
                    "(": "execute",
                    ")": "execute",
                    b: "execute",
                    "<": "execute",
                    ">": "execute",
                    t: "noTagSupport",
                    "{": "execute",
                    "}": "execute",
                    B: "execute",
                    '"': "execute",
                    "'": "execute",
                    "`": "execute"
                }
            },
            askForMotion: {
                input_type: "regex",
                inputs: {
                    startDigit: "times",
                    "/": "sendToColonCommand",
                    "?": "sendToColonCommand",
                    "[": "askForOpeningBracket",
                    "]": "askForClosingBracket",
                    duplicate: "execute",
                    m: "execute",
                    "m.": "askForOneChar"
                }
            },
            _goto: {
                input_type: "discrete_no_validation",
                inputs: {
                    g: "execute"
                }
            },
            execute: {},
            moveLeft: {},
            moveRight: {},
            moveUp: {},
            moveDown: {},
            performColonCommand: {},
            error: {},
            noTagSupport: {},
            scrollMiddle: {},
            scrollTop: {},
            scrollBottom: {}
        },
        currentState: "start",
        currentCommand: "",
        currentCommandPrefix: "",
        stateBeforeTimes: "start",
        reset: function () {
            this.currentState = "start";
            this.stateBeforeTimes = "start";
            this.currentCommand = "";
            this.currentCommandPrefix = ""
        },
        getCurrentState: function () {
            return this.currentState
        },
        processInput: function (ag, aa) {
            var Y = this.states[this.currentState],
                Z, af, ab = true,
                X = "#$%^*()_+0-=WwEe{}GHhjklL|BbNnM,;",
                ac = "`'Tt[]Ffg",
                ad, ah = true,
                ae = (this.currentState === "start" && ag === "z") || this.currentState === "scrollAskForPosition";
            if (ag === "BACKSPACE" && this.currentState === "sendToColonCommand" && (this.currentCommand === ":" || this.currentCommand === "/" || this.currentCommand === "?")) {
                E("sendToColonCommand", "");
                this.reset();
                return
            }
            if (this.currentState === "start") {
                E("sendToColonCommand", "")
            }
            if (aa !== true && !ae) {
                vim.model.addKeyPressToCountDown()
            }
            if (this.currentState === "sendToColonCommand" || (this.currentState === "start" && ag === ":") || aa === true) {} else {
                vim.stats.incKeystrokes(vim.model.getLevel())
            }
            switch (Y.input_type) {
                case "discrete":
                case "discrete_no_validation":
                    if (Y.inputs[ag]) {
                        if (ag === ":" || Y.input_type === "discrete_no_validation" || (vim.validKeys.isValid(ag) && !vim.validKeys.isDisabled(ag))) {
                            Z = Y.inputs[ag];
                            if (ag === "/" || ag === "?") {
                                this.currentCommandPrefix = this.currentCommand;
                                this.currentCommand = ag
                            } else {
                                this.currentCommand += ag
                            }
                        } else {
                            Z = "error";
                            if (Y.input_type === "discrete") {
                                if (vim.validKeys.isValid(ag) && vim.validKeys.isDisabled(ag)) {
                                    if ((ag === "G" || ag === "g") && vim.validKeys.isValid("1") && !vim.validKeys.isDisabled("1")) {
                                        this.currentCommand = "I don't have '" + ag + "', but since\nI have numbers, you can\nuse ':' followed by a line\nnumber and enter."
                                    } else {
                                        this.currentCommand = "The '" + ag + "' button is gone...\nI can't use it!"
                                    }
                                } else {
                                    this.currentCommand = "I don't have the '" + ag + "' button!"
                                }
                            } else {
                                this.currentCommand = "It's not legal to use '" + ag + "' in this case"
                            }
                        }
                    } else {
                        Z = "error";
                        this.currentCommand = "'" + ag + "' is illegal in this case."
                    }
                    break;
                case "times":
                    if (Y.inputs[ag]) {
                        if (ag === "DELETE") {
                            if (this.currentCommand.length > 0 && "0123456789".indexOf(this.currentCommand.charAt(this.currentCommand.length - 1)) !== -1) {
                                this.currentCommand = this.currentCommand.substr(0, this.currentCommand.length - 1);
                                Z = Y.inputs[ag];
                                if (this.currentCommand === "") {
                                    this.reset()
                                }
                            }
                        } else {
                            if (vim.validKeys.isValid(ag)) {
                                Z = Y.inputs[ag];
                                this.currentCommand += ag
                            } else {
                                Z = "error"
                            }
                        }
                    } else {
                        Z = this.stateBeforeTimes;
                        this.currentState = Z;
                        return this.processInput(ag, true)
                    }
                    break;
                case "an_or_inner":
                    if (Y.inputs[ag]) {
                        if (ag >= "1" && ag <= "9") {
                            if (vim.validKeys.isValid(ag)) {
                                this.currentCommand += ag;
                                Z = Y.inputs[ag];
                                ab = true
                            } else {
                                this.currentCommand = "I don't have the '" + ag + "' button!";
                                Z = "error";
                                ab = true
                            }
                        } else {
                            if (!vim.validKeys.isValid("\\ia")) {
                                Z = "error";
                                this.currentCommand = "I haven't collect the 'ia' button yet!"
                            } else {
                                Z = Y.inputs[ag];
                                this.currentCommand += ag
                            }
                        }
                    } else {
                        Z = "askForMotion";
                        this.currentState = Z;
                        return this.processInput(ag, true)
                    }
                    break;
                case "register":
                    if (vim.regs.isUnsupportedRegisterName(ag)) {
                        Z = "error";
                        this.currentCommand = ag + " register is not support in the game at this time."
                    } else {
                        if (vim.regs.isValidRegisterName(ag)) {
                            Z = this.stateBeforeRegisters;
                            this.currentCommand += ag
                        } else {
                            Z = "error";
                            this.currentCommand = ag + " is not a valid register."
                        }
                    }
                    break;
                case "regex":
                    ab = false;
                    for (af in Y.inputs) {
                        switch (af) {
                            case ".":
                                if (this.currentCommand.length < 86) {
                                    this.currentCommand += ag
                                }
                                ab = true;
                                if (this.currentState === "askForOneChar" && "FfTt".indexOf(this.currentCommand[this.currentCommand.length - 2]) !== -1) {
                                    c = this.currentCommand.substr(this.currentCommand.length - 2)
                                }
                                break;
                            case "duplicate":
                                ad = this.currentCommand.replace(/\d/g, "");
                                if (ad.length > 0 && ag === ad[ad.length - 1]) {
                                    this.currentCommand += ag;
                                    ab = true
                                }
                                break;
                            case "m":
                                if (X.indexOf(ag) !== -1) {
                                    if (vim.validKeys.isValid(ag)) {
                                        if (vim.validKeys.isDisabled(ag)) {
                                            Z = "error";
                                            this.currentCommand = "The '" + ag + "' button is gone...\nI can't use it!";
                                            ab = true
                                        } else {
                                            if (ag === ";") {
                                                if (typeof c !== "undefined") {
                                                    this.currentCommand += c;
                                                    ab = true
                                                } else {
                                                    ab = false;
                                                    this.reset()
                                                }
                                            } else {
                                                if (this.currentCommand.length < 86) {
                                                    this.currentCommand += ag
                                                }
                                                ab = true
                                            }
                                        }
                                    } else {
                                        Z = "error";
                                        this.currentCommand = "I don't have the '" + ag + "' button!";
                                        ab = true
                                    }
                                }
                                break;
                            case "m.":
                                if (ac.indexOf(ag) !== -1) {
                                    if (vim.validKeys.isValid(ag)) {
                                        if (vim.validKeys.isDisabled(ag)) {
                                            Z = "error";
                                            this.currentCommand = "The '" + ag + "' button is gone...\nI can't use it!";
                                            ab = true
                                        } else {
                                            if (this.currentCommand.length < 86) {
                                                this.currentCommand += ag
                                            }
                                        }
                                    } else {
                                        Z = "error";
                                        this.currentCommand = "I don't have the '" + ag + "' button!"
                                    }
                                    ab = true
                                }
                                break;
                            case "/":
                            case "?":
                                if (ag === "/" || ag === "?") {
                                    if (vim.validKeys.isValid(ag) && !vim.validKeys.isDisabled(ag)) {
                                        this.currentCommandPrefix = this.currentCommand;
                                        this.currentCommand = ag;
                                        ab = true
                                    } else {
                                        Z = "error";
                                        ab = true;
                                        if (!vim.validKeys.isValid(ag)) {
                                            this.currentCommand = "I don't have the '" + ag + "' button!"
                                        } else {
                                            this.currentCommand = "The '" + ag + "' button is gone...\nI can't use it!"
                                        }
                                    }
                                }
                                break;
                            case "[":
                            case "]":
                                if (ag === af && vim.validKeys.isValid(ag)) {
                                    this.currentCommand += ag;
                                    ab = true
                                }
                                break;
                            case "ENTER":
                                if (ag === "ENTER") {
                                    ab = true
                                }
                                break;
                            case "BACKSPACE":
                                if (ag === "BACKSPACE") {
                                    this.currentCommand = this.currentCommand.substr(0, this.currentCommand.length - 1);
                                    ab = true
                                }
                                break;
                            case "startDigit":
                                if (ag >= "1" && ag <= "9") {
                                    if (vim.validKeys.isValid(ag)) {
                                        this.currentCommand += ag;
                                        ab = true
                                    } else {
                                        this.currentCommand = "I don't have the '" + ag + "' button!";
                                        Z = "error";
                                        ab = true
                                    }
                                }
                                break;
                            case "mark":
                                if (vim.model.isSupportedMark(ag)) {
                                    if (this.currentCommand.length < 86) {
                                        this.currentCommand += ag
                                    }
                                } else {
                                    this.currentCommand = "'" + ag + "' is not a supported mark!";
                                    Z = "error"
                                }
                                ab = true;
                                break
                        }
                        if (ab) {
                            if (Z !== "error") {
                                Z = Y.inputs[af]
                            }
                            break
                        }
                    }
                    break
            }
            if (ab) {
                if (Z !== "sendToColonCommand" && this.currentState !== "sendToColonCommand" && !("moveUp moveDown moveLeft moveRight".indexOf(Z) !== -1 && this.currentCommand.length === 1)) {
                    E("sendToCursorCommand", this.currentCommand)
                }
                if (Z === "times" && this.currentState !== "times") {
                    this.stateBeforeTimes = this.currentState
                } else {
                    if (Z === "registers") {
                        this.stateBeforeRegisters = this.currentState
                    }
                }
                this.currentState = Z;
                E(Z, this.currentCommand);
                if (!this.states[this.currentState].inputs) {
                    this.reset()
                }
            } else {
                this.reset()
            }
        }
    };
    var V = (function () {
        var aq = false,
            aH = false,
            at = false,
            au = false,
            ai = false,
            ao = false,
            av = false,
            ap = false,
            aV = false,
            aT = false,
            aA = false,
            a9 = false,
            aB = false,
            aS = false,
            ar = false,
            a7 = false,
            ab = false,
            Z = /firefox/i.test(navigator.userAgent),
            aN = false,
            a5 = false,
            aI = false,
            ac = false,
            ah = [],
            aa = ["225D", "229D", "221U", "225U", "229D", "32U"],
            a3 = ["225D", "221U", "229D", "221U", "225U"],
            aL = ["225D", "221U", "225U", "229D", "32U"],
            a4 = ["18D", "221D", "221U", "18U"],
            aR = ["16D", "229D", "221U", "16U", "229D", "32U"],
            aZ = ["16D", "221U", "16U", "229D", "32U"],
            am = ["16D", "221U", "229D", "221U", "16U"],
            Y = ["16D", "221D", "221U", "16U"],
            aO = ["!16D", "187D", "187U"],
            aD = ["16D", "187D", "187U", "16U"],
            al = ["18D", "16D", "54D", "54U", "16U", "18U"],
            a1 = ["16D", "18D", "54D", "54U", "18U", "16U"],
            a2 = ["16D", "222D", "39P", "222U", "16U"],
            aK = ["16D", "192D", "192U", "16U", "32D", "32P"],
            ag = ["16D", "54D", "54U", "16U", "32D", "32P"],
            a6 = ["191D", "39P", "191U"];

        function az(bc) {
            aW(bc.keyCode + "D");
            aS = false;
            if (bc.keyCode === 18) {
                aq = true;
                ap = true
            } else {
                if (bc.keyCode === 225) {
                    aH = true;
                    aV = true
                } else {
                    if (bc.keyCode === 16) {
                        at = true;
                        aT = true
                    } else {
                        if (bc.keyCode === 17) {
                            au = true;
                            aA = true
                        } else {
                            if (bc.keyCode === 224 || bc.keyCode === 91 || bc.keyCode === 93) {
                                ai = true
                            } else {
                                if (bc.keyCode === 82 && (au || ai || bc.ctrlKey === true || bc.metaKey === true)) {
                                    a7 = true;
                                    au = false;
                                    ai = false;
                                    ab = false;
                                    aN = false;
                                    a5 = false;
                                    aQ(bc);
                                    return false
                                } else {
                                    if (bc.keyCode === 85 && (au || ai || bc.ctrlKey === true || bc.metaKey === true)) {
                                        ab = true;
                                        au = false;
                                        ai = false;
                                        a7 = false;
                                        aN = false;
                                        a5 = false;
                                        aQ(bc);
                                        return false
                                    } else {
                                        if (Z && bc.keyCode === 222 && !at) {
                                            a5 = true;
                                            aN = false;
                                            ab = false;
                                            a7 = false;
                                            au = false;
                                            ai = false;
                                            aQ(bc);
                                            return false
                                        } else {
                                            if (Z && bc.keyCode === 191 && !at) {
                                                aN = true;
                                                a5 = false;
                                                ab = false;
                                                a7 = false;
                                                au = false;
                                                ai = false;
                                                aQ(bc);
                                                return false
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        function aY(bc) {
            aW(bc.keyCode + "P");
            ap = false;
            aV = false;
            aT = false;
            aA = false;
            aS = true
        }

        function aQ(bc) {
            if (bc && bc.preventDefault) {
                bc.preventDefault();
                if (bc.stopPropagation) {
                    bc.stopPropagation()
                }
            } else {
                if (window.event && window.event.returnValue) {
                    window.eventReturnValue = false
                }
            }
        }

        function a0(bc) {
            aW(bc.keyCode + "U");
            switch (bc.keyCode) {
                case 18:
                    aq = false;
                    break;
                case 225:
                    aH = false;
                    break;
                case 16:
                    at = false;
                    break;
                case 17:
                    au = false;
                    break;
                case 221:
                    if (aq) {
                        a9 = true
                    }
                    break;
                case 192:
                    if (!aS) {
                        av = true
                    }
                    break;
                case 78:
                    if (!aS && aq) {
                        ao = true
                    }
                    break;
                case 186:
                    if (!aS && aq) {
                        aI = true
                    }
                    break;
                case 219:
                    if (!aS && at) {
                        ac = true
                    } else {
                        if (!aS) {
                            ar = true
                        }
                    }
                    break;
                case 224:
                case 91:
                case 93:
                    ai = false;
                    break;
                case 32:
                    break;
                default:
                    a9 = false;
                    aB = false;
                    ao = false;
                    av = false;
                    ar = false;
                    a7 = false;
                    ab = false;
                    aN = false;
                    a5 = false;
                    aI = false;
                    ac = false;
                    break
            }
        }

        function aJ() {
            var bc = a9;
            a9 = false;
            return bc
        }

        function X() {
            var bc = ao;
            ao = false;
            return bc
        }

        function aX() {
            var bc = aB;
            aB = false;
            return bc
        }

        function aj() {
            return af(aO)
        }

        function ae() {
            return af(aD)
        }

        function bb() {
            var bc = ar;
            ar = false;
            return bc
        }

        function an() {
            var bc = av;
            av = false;
            return bc
        }

        function aP() {
            var bc = a7;
            a7 = false;
            return bc
        }

        function aM() {
            var bc = ab;
            ab = false;
            return bc
        }

        function ax() {
            var bc = aN;
            aN = false;
            return bc
        }

        function aF() {
            var bc = a5;
            a5 = false;
            return bc
        }

        function aG() {
            return (af(aL) || af(a3) || af(aa) || af(a4))
        }

        function aU() {
            return (af(aZ) || af(am) || af(aR) || af(Y))
        }

        function a8() {
            var bc = aI;
            aI = false;
            return bc
        }

        function ad() {
            var bc = ac;
            ac = false;
            return bc
        }

        function aE() {
            return af(a6)
        }

        function ak() {
            return af(a2)
        }

        function aw() {
            return (af(al) || af(a1))
        }

        function aC() {
            return af(aK)
        }

        function ba() {
            return af(ag)
        }

        function aW(bc) {
            ah.push(bc);
            if (ah.length > 10) {
                ah.shift()
            }
        }

        function af(bg, bd) {
            var bf, bh = bg.length,
                bc = ah.length;
            if (bc < bh) {
                return false
            }
            if (bd) {
                console.log(ah.slice(-bh))
            }
            for (bf = 0; bf < bh; ++bf) {
                if (bg[bf][0] === "!" && bg[bf].substr(1) === ah[bc - bh + bf]) {
                    return false
                } else {
                    if (bg[bf][0] !== "!" && bg[bf] !== ah[bc - bh + bf]) {
                        return false
                    }
                }
            }
            var be = ah[bc - 1];
            ah.length = 0;
            ah.push(be);
            return true
        }

        function ay() {
            var bc = {
                altDown: aq,
                altGrDown: aH,
                shiftDown: at,
                ctrlDown: au,
                cmdDown: ai,
                swissGermanTildeDown: ao,
                germanCaretDown: av,
                altDownNoKeyPress: ap,
                altGrDownNoKeyPress: aV,
                shiftDownNoKeyPress: aT,
                ctrlDownNoKeyPress: aA,
                tildeDown: a9,
                caretDown: aB,
                keypressTriggered: aS,
                frenchCaretDown: ar,
                ctrlRDown: a7,
                ctrlUDown: ab,
                slashDown: aN,
                singleQuoteDown: a5,
                spanishTildeDown: aI,
                spanishCaretDown: ac
            };
        }
        return {
            keydown: az,
            keyup: a0,
            keypress: aY,
            checkAndResetTilde: aJ,
            checkAndResetSwissGermanTilde: X,
            checkAndResetCaret: aX,
            checkAndResetSwissGermanCaret: aj,
            checkAndResetFrenchCaret: bb,
            checkAndResetGermanCaret: an,
            checkAndResetCtrlR: aP,
            checkAndResetCtrlU: aM,
            checkAndResetFirefoxSlash: ax,
            checkAndResetFirefoxSingleQuote: aF,
            checkAndResetSwedishTilde: aG,
            checkAndResetSwedishCaret: aU,
            checkAndResetSpanishTilde: a8,
            checkAndResetSpanishCaret: ad,
            checkAndResetNorwegianSingleQuote: aE,
            checkAndResetGermanMacbookSingleQuote: ak,
            checkAndResetGermanBacktickMacbook: ae,
            checkAndResetGerman3KeysCaret: aw,
            checkBrazilianTildeFollowedBySpaceKeypress: aC,
            checkBrazilianCaretFollowedBySpaceKeypress: ba,
            debug: ay
        }
    })();

    function k(ac) {
        var aa = ac.keyCode || ac.which,
            Z = ac.shiftKey || aa === 16,
            Y = String.fromCharCode(ac.charCode || ac.keyCode),
            ab = Y.toUpperCase(),
            X = Y.toLowerCase();
        return (ab !== X && ((Y === ab && !Z) || (Y === X && Z)))
    }

    function G(X) {
        if (X && X.preventDefault) {
            X.preventDefault()
        } else {
            if (window.event && window.event.returnValue) {
                window.eventReturnValue = false
            }
        }
    }

    function U(Y) {
        var X;
        if (!Y) {
            Y = window.event
        }
        X = Y.target ? Y.target : Y.srcElement;
        if (X.nodeType == 3) {
            X = X.parentNode
        }
        return X
    }

    function w(Y) {
        var Z = "",
            X = false;
        if (typeof w.escCount === "undefined") {
            w.escCount = 0
        }
        V.keydown(Y);
        if (Y.keyCode === 27) {
            w.escCount++;
            q.reset();
            E("sendToColonCommand", "");
            E("sendToCursorCommand", "");
            vim.screens["game-screen"].hideCommandHelp();
            if (w.escCount === 2) {
                w.escCount = 0;
                vim.model.keypressCountdownFinished(true)
            }
        } else {
            w.escCount = 0
        }
        if (q.getCurrentState() === "sendToColonCommand") {
            if (Y.keyCode === 13) {
                q.processInput("ENTER")
            }
            if (Y.keyCode === 8) {
                q.processInput("BACKSPACE");
                X = true
            }
        }
        if (q.getCurrentState() === "times") {
            if (Y.keyCode === 46) {
                q.processInput("DELETE")
            }
        }
        if (Y.keyCode === 8 && (U(Y).nodeName !== "INPUT" || U(Y).style.visibility !== "visible")) {
            X = true
        }
        if (Y.keyCode >= 37 && Y.keyCode <= 40) {
            X = true;
            if (!P()) {
                if ((!N && C === 0) || vim.enforceHjkl) {
                    if (!vim.enforceHjkl) {
                        E("confirmArrowKeys")
                    }
                } else {
                    if (C < 1) {
                        ++C
                    }
                    switch (Y.keyCode) {
                        case 37:
                            Z = "h";
                            break;
                        case 40:
                            Z = "j";
                            break;
                        case 38:
                            Z = "k";
                            break;
                        case 39:
                            Z = "l";
                            break
                    }
                    if (Z !== "") {
                        if (vim.screens["game-screen"].isCommandHelpOn()) {
                            vim.screens["game-screen"].hideCommandHelp()
                        }
                        q.processInput(Z)
                    }
                }
            }
        }
        if (V.checkAndResetCtrlR() && (q.getCurrentState() === "start" || q.getCurrentState() === "times")) {
            q.processInput("CTRL-R");
            X = true
        }
        if (V.checkAndResetFirefoxSlash()) {
            q.processInput("/");
            X = true
        }
        if (V.checkAndResetFirefoxSingleQuote()) {
            q.processInput("'");
            X = true
        }
        if (X) {
            G(Y);
            return false
        }
        return true
    }

    function L(ab) {
        var Z = ab.charCode || ab.keyCode,
            Y = String.fromCharCode(Z),
            X = false,
            aa = false,
            ac = vim.screens["game-screen"];
        V.keypress(ab);
        if (k(ab)) {
            E("message", "Caps Lock is on. Please turn it off to play.<BR>You can use shift to type upper-case letters.");
            return false
        }
        if (Z >= 128) {
            E("message", "That last keystroke was not in English.<BR>Please change keyboard language to English.");
            return false
        }
        if (Y === " " && (V.checkAndResetTilde() || V.checkBrazilianTildeFollowedBySpaceKeypress())) {
            Y = "~";
            X = true
        }
        if (Y === " " && V.checkAndResetCaret()) {
            V.checkAndResetSwedishCaret();
            Y = "^";
            aa = true
        }
        if (Y === " " && (V.checkAndResetGermanCaret() || V.checkBrazilianCaretFollowedBySpaceKeypress())) {
            Y = "^";
            aa = true
        }
        if (Y !== "+" && Y !== "-" && Y != "_" && Y != "=" && Z !== 13 && ac.isCommandHelpOn()) {
            ac.hideCommandHelp()
        }
        if ((Y === "+" || Y === "-" || Y === "_" || Y === "=") && ac.isCommandHelpOn()) {
            ac.traverseHelpCommandExample(Y === "+" || Y === "=" ? 1 : -1);
            return
        }
        if (Y >= " ") {
            q.processInput(Y)
        }
        if (Y === " " || X || aa) {
            G(ab);
            return false
        }
        return true
    }

    function M(Z) {
        var Y = vim.board,
            X = Cursor.getX(),
            aa = Cursor.getY();
        V.keyup(Z);
        if (V.checkAndResetSwissGermanTilde()) {
            q.processInput("~")
        } else {
            if (V.checkAndResetSwissGermanCaret()) {
                q.processInput("^")
            } else {
                if (V.checkAndResetFrenchCaret()) {
                    q.processInput("^")
                } else {
                    if (V.checkAndResetSpanishTilde()) {
                        q.processInput("~")
                    } else {
                        if (V.checkAndResetSpanishCaret()) {
                            q.processInput("^")
                        } else {
                            if (V.checkAndResetSwedishTilde()) {
                                q.processInput("~")
                            } else {
                                if (V.checkAndResetSwedishCaret()) {
                                    q.processInput("^")
                                } else {
                                    if (V.checkAndResetGerman3KeysCaret()) {
                                        q.processInput("^")
                                    } else {
                                        if (V.checkAndResetGermanMacbookSingleQuote()) {
                                            q.processInput("'")
                                        } else {
                                            if (V.checkAndResetGermanBacktickMacbook()) {
                                                q.processInput("`")
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (Y.getBG(X, aa) !== Y.MISSING && Y.getBG(X, aa) !== Y.SKY_MISSING && Y.getBG(X, aa) !== Y.DARK) {
            E("enableBlink")
        }
    }

    function S(Y) {
        var X = vim.model.addKeyPressToCountDown();
        vim.stats.incKeystrokes(vim.model.getLevel());
        Game.addToLastChangeCommandBuffer(Y);
        if (X) {
            if (Y === "ESC") {
                return z(false)
            } else {
                return E("processInputModeInput", Y)
            }
        }
    }

    function i(Y) {
        var Z = "",
            X = false;
        V.keydown(Y);
        if (Y.keyCode === 27) {
            S("ESC");
            X = true
        }
        if (Y.keyCode === 8) {
            S("BACKSPACE");
            X = true
        }
        if (Y.keyCode === 46) {
            S("DELETE")
        }
        if (Y.keyCode === 13) {
            S("USER_ENTER");
            X = true
        }
        if (V.checkAndResetFirefoxSlash()) {
            S("/");
            X = true
        }
        if (V.checkAndResetFirefoxSingleQuote()) {
            S("'");
            X = true
        }
        if (X) {
            G(Y);
            return false
        }
        return true
    }

    function J(ab) {
        var Z = ab.charCode || ab.keyCode,
            Y = String.fromCharCode(Z),
            X = false,
            aa = false;
        V.keypress(ab);
        if (k(ab)) {
            E("message", "Caps Lock is on. Please turn it off to play.<BR>You can use shift to type upper-case letters.");
            return false
        }
        if (Z >= 128) {
            E("message", "That last keystroke was not in English.<BR>Please change keyboard language to English.");
            return false
        }
        if (Y === " " && (V.checkAndResetTilde() || V.checkBrazilianTildeFollowedBySpaceKeypress())) {
            Y = "~";
            X = true
        }
        if (Y === " " && V.checkAndResetCaret()) {
            V.checkAndResetSwedishCaret();
            Y = "^";
            aa = true
        }
        if (Y === " " && (V.checkAndResetGermanCaret() || V.checkBrazilianCaretFollowedBySpaceKeypress())) {
            Y = "^";
            aa = true
        }
        if (Y >= " ") {
            S(Y)
        }
        if (Y === " " || X || aa) {
            G(ab);
            return false
        }
        return true
    }

    function f(Z) {
        var Y = vim.board,
            X = Cursor.getX(),
            aa = Cursor.getY();
        V.keyup(Z);
        if (V.checkAndResetSwissGermanTilde()) {
            S("~")
        } else {
            if (V.checkAndResetSwissGermanCaret()) {
                S("^")
            } else {
                if (V.checkAndResetFrenchCaret()) {
                    S("^")
                } else {
                    if (V.checkAndResetSpanishTilde()) {
                        S("~")
                    } else {
                        if (V.checkAndResetSpanishCaret()) {
                            S("^")
                        } else {
                            if (V.checkAndResetSwedishTilde()) {
                                S("~")
                            } else {
                                if (V.checkAndResetSwedishCaret()) {
                                    S("^")
                                } else {
                                    if (V.checkAndResetGerman3KeysCaret()) {
                                        S("^")
                                    } else {
                                        if (V.checkAndResetGermanMacbookSingleQuote()) {
                                            S("'")
                                        } else {
                                            if (V.checkAndResetGermanBacktickMacbook()) {
                                                S("`")
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (Y.getBG(X, aa) !== Y.MISSING && Y.getBG(X, aa) !== Y.SKY_MISSING && Y.getBG(X, aa) !== Y.DARK) {
            E("enableBlink")
        }
    }

    function F(X) {
        V.keyup(X)
    }

    function W(X) {
        V.keypress(X)
    }

    function d(X) {
        V.keydown(X)
    }

    function K(X) {
        if (t) {
            b.unbind(window, "keypress", J);
            b.unbind(window, "keyup", f);
            b.unbind(window, "keydown", i)
        } else {
            if (r) {
                b.unbind(window, "keydown", R)
            } else {
                b.unbind(window, "keypress", L);
                b.unbind(window, "keyup", M);
                b.unbind(window, "keydown", w)
            }
        }
        if (X !== true) {
            b.bind(window, "keydown", d);
            b.bind(window, "keypress", W);
            b.bind(window, "keyup", F)
        }
    }

    function g() {
        K(true);
        b.unbind(window, "keydown", d);
        b.unbind(window, "keypress", W);
        b.unbind(window, "keyup", F);
        if (t) {
            b.bind(window, "keypress", J);
            b.bind(window, "keyup", f);
            b.bind(window, "keydown", i)
        } else {
            if (r) {
                b.bind(window, "keydown", R)
            } else {
                b.bind(window, "keypress", L);
                b.bind(window, "keyup", M);
                b.bind(window, "keydown", w)
            }
        }
    }

    function e() {
        if (u !== -1) {
            window.clearTimeout(u);
            u = -1
        }
        N = false;
        C = 0;
        t = false;
        a.error = s.errorMove;
        a.enableBlink = s.enableBlink;
        a.message = s.showMessage;
        a.scrollTop = s.scrollTop;
        a.scrollBottom = s.scrollBottom;
        a.scrollMiddle = s.scrollMiddle;
        a.moveLeft = s.moveLeft;
        a.moveRight = s.moveRight;
        a.moveUp = s.moveUp;
        a.moveDown = s.moveDown;
        a.confirmArrowKeys = vim.screens["game-screen"].confirmArrowKeys;
        a.sendToColonCommand = vim.screens["game-screen"].setColonCommand;
        a.sendToCursorCommand = s.setCursorCommand;
        a.sendToCursorCommandUntilMove = s.setCursorCommandUntilMove;
        a.performColonCommand = n;
        a.execute = Game.processCommand;
        a.processInputModeInput = Game.processInputModeInput;
        a.processUndoRedoInputModeInput = Game.processUndoRedoInputModeInput;
        a.noTagSupport = h;
        g();
        c = undefined;
        r = false
    }

    function E(X, Y) {
        if (a[X]) {
            a[X](Y)
        }
    }

    function B(X) {
        K();
        u = window.setTimeout(g, X)
    }

    function l() {
        if (u !== -1) {
            window.clearTimeout(u);
            u = -1
        }
        K()
    }

    function Q() {
        N = true
    }

    function D(X) {
        var Y;
        for (Y = 0; Y < X.length; Y += 1) {
            q.processInput(X[Y])
        }
    }

    function o(X) {
        E("sendToColonCommand", X)
    }

    function v() {
        return c
    }

    function j(aa) {
        var Z = "^$*+?.",
            Y = "&|{}()bBcdDfnrsStvwWxu",
            X, ab;
        if (typeof aa === "undefined" || aa === "") {
            return false
        }
        for (X = 0; X < Z.length; X++) {
            ab = aa.indexOf(Z.charAt(X));
            if (ab === 0 || (ab > 0 && aa.charAt(ab - 1) !== "\\")) {
                return true
            }
        }
        for (X = 0; X < Y.length; X++) {
            ab = aa.indexOf(Y.charAt(X));
            if (ab > 0 && aa.charAt(ab - 1) === "\\") {
                return true
            }
        }
        return false
    }

    function n(ac) {
        var af = false,
            aA = false,
            ah = false,
            av = ":" + ac.substr(1).trim(),
            Y = vim.gamestate,
            am = Y.getCurrentFilename(),
            aB, ao, Z = false,
            ag = vim.validKeys,
            ap, au, ar, az = vim.stats,
            ae, ab = vim.model,
            ak, an, ax, al = true,
            at = ab.getGlobalSearchStr(),
            aq = ab.getGlobalSearchOffset(),
            aa = false,
            ai = "",
            X = "",
            aw = {},
            aj = vim.buffers.getCurrentBuffer().getTextAreas().get(Cursor.getX(), Cursor.getY()),
            ay, ad;
        if ("?/".indexOf(ac.charAt(0)) !== -1) {
            az.incKeystrokes(vim.model.getLevel(), 1 + av.substring(1).length);
            O(q.currentCommandPrefix, ac);
            an = ab.getGlobalSearchStr();
            ax = ab.getGlobalSearchOffset();
            if (typeof an === "undefined" || an === "") {
                E("sendToColonCommand", "Search pattern missing. No previous search pattern to use.");
                al = false
            }
            if (al && typeof ax !== "undefined" && ax !== "") {
                E("sendToColonCommand", "Search offset is currently not supported.");
                al = false
            }
            if (al && j(an.substr(1))) {
                E("sendToColonCommand", "Searching for a regular expressions is not currently supported.");
                al = false
            }
            if (al) {
                ak = (q.currentCommandPrefix || "") + ac.charAt(0) + an.substr(1) + ac.charAt(0) + (ax || "");
                vim.buffers.getCurrentBuffer().getTextAreas().highlight(vim.model.getGlobalSearchStr());
                q.reset();
                E("sendToColonCommand", "");
                ay = E("execute", ak);
                if (at) {
                    aa = O.detectedPattern === at.substr(1) && (O.detectedOffset || "") === (aq || "");
                    if (aa) {
                        E("sendToCursorCommandUntilMove", "I could have used '" + ac.charAt(0) + "'\nfollowed by Enter instead.\nIt searches again for the\nlast pattern without the\nneed to retype it.")
                    } else {
                        if (an.substr(1) === at.substr(1)) {
                            ad = an.charAt(0) === "/" ? "n" : "N";
                            if (ag.isValid(ad) && !ag.isDisabled(ad)) {
                                E("sendToCursorCommandUntilMove", "I could have used '" + ad + "'\ninstead. It's shorter.")
                            }
                        }
                    }
                }
                return ay
            } else {
                ab.setGlobalSearchStr(at);
                ab.setGlobalSearchOffset(aq);
                vim.buffers.getCurrentBuffer().getTextAreas().highlight(vim.model.getGlobalSearchStr());
                aA = true
            }
        }
        if (av === ":u" || av === ":undo") {
            if (!vim.validKeys.isValid("u")) {
                o("You should collect the 'u' button first.");
                aA = true
            } else {
                Game.processCommand("u")
            }
            af = true
        } else {
            if (av === ":red" || av === ":redo") {
                if (!vim.validKeys.isValid("\\redo")) {
                    o("You should collect the 'redo' button first.");
                    aA = true
                } else {
                    Game.processCommand("CTRL-R")
                }
                af = true
            } else {
                if (av === ":set nu" || av === ":set nonu" || av === ":set nu!" || av === ":set nonu!") {
                    if (!vim.validKeys.isValid("\\nu")) {
                        o("You should collect the 'nu' option in order to do that.");
                        aA = true
                    } else {
                        ab.setShowNumbers(av.indexOf("!") !== -1 ? !ab.isShowNumbers() : av === ":set nu")
                    }
                    af = true
                } else {
                    if (av === ":set stats") {
                        az.setVisible(true);
                        af = true
                    } else {
                        if (av === ":set nostats") {
                            az.setVisible(false);
                            af = true
                        } else {
                            if (av === ":set stats!" || av === ":set nostats!") {
                                az.setVisible(!az.isVisible());
                                af = true
                            } else {
                                if (":" + parseInt(av.substring(1), 10).toString() === av) {
                                    az.incKeystrokes(vim.model.getLevel(), 2 + av.substring(1).length);
                                    if (!vim.validKeys.isValid("1")) {
                                        E("sendToCursorCommand", "I didn't collect digits yet!")
                                    } else {
                                        if (vim.validKeys.isDisabled("1")) {
                                            E("sendToCursorCommand", "The digits are gone...\nI can't use them... yet!")
                                        } else {
                                            if (!vim.buffers.getCurrentBuffer().getTextAreas().exist(vim.model.getCursorX(), vim.model.getCursorY())) {
                                                E("sendToCursorCommand", "This can only be done on text areas")
                                            } else {
                                                E("execute", av.substring(1) + "G")
                                            }
                                        }
                                    }
                                    af = true
                                } else {
                                    if (av === ":registers" || av.indexOf(":registers ") === 0) {
                                        E("sendToColonCommand", vim.regs.showRegisters(av.length > 11 ? av.substring(11) : undefined));
                                        aA = true;
                                        af = true
                                    } else {
                                        if (av === ":reg" || av.indexOf(":reg ") === 0) {
                                            E("sendToColonCommand", vim.regs.showRegisters(av.length > 5 ? av.substring(5) : undefined));
                                            aA = true;
                                            af = true
                                        } else {
                                            if (av === ":delmarks" || av.indexOf(":delmarks ") === 0) {
                                                if (av.length <= 10) {
                                                    o("E741: Argument required (which means that you should supply a list of marks or a ! for all local marks after :delmarks)");
                                                    aA = true
                                                } else {
                                                    X = vim.model.deleteMarks(av.substring(10));
                                                    if (X !== "") {
                                                        o(X);
                                                        aA = true
                                                    }
                                                }
                                                af = true
                                            } else {
                                                if (av === ":delm" || av.indexOf(":delm ") === 0) {
                                                    if (av.length <= 6) {
                                                        o("E741: Argument required (which means that you should supply a list of marks or a ! for all local marks after :delm)");
                                                        aA = true
                                                    } else {
                                                        X = vim.model.deleteMarks(av.substring(6));
                                                        if (X !== "") {
                                                            o(X);
                                                            aA = true
                                                        }
                                                    }
                                                    af = true
                                                } else {
                                                    if (av === ":delmarks!" || av === ":delm!") {
                                                        X = vim.model.deleteMarks("!");
                                                        if (X !== "") {
                                                            o(X);
                                                            aA = true
                                                        }
                                                        af = true
                                                    } else {
                                                        if (av === ":marks" || av.indexOf(":marks ") === 0) {
                                                            aw = vim.model.getMarksSummaryObject(av.length > 7 ? av.substring(7) : undefined);
                                                            E("sendToColonCommand", aw.str);
                                                            if (aw.marks && aw.marks.trim() === "Toadstool" && aw.content === "The power of undo will beat Big Bug " && aj && aj.isComplete()) {
                                                                if (Game.hasInvisibleItems(aj)) {
                                                                    Game.testTextCompletion(aj)
                                                                }
                                                                E("sendToCursorCommandUntilMove", "The power of undo\nwill beat Big Bug?\n\nGood to know!")
                                                            }
                                                            if (aw.marks && aw.marks.trim() === "Peach" && aw.content === "The cursors are NOT friends! " && aj) {
                                                                E("sendToCursorCommandUntilMove", "They are NOT my friends...?\nWhat game are they playing?!")
                                                            }
                                                            aA = true;
                                                            af = true
                                                        } else {
                                                            if (av === ":help") {
                                                                vim.screens["game-screen"].showHelp();
                                                                af = true
                                                            } else {
                                                                if (av === ":stats") {
                                                                    vim.screens["game-screen"].showStats();
                                                                    af = true
                                                                } else {
                                                                    if (av.indexOf(":help ") === 0) {
                                                                        ap = av.substr(6);
                                                                        if (ag.hasExtendedDesc(ap)) {
                                                                            vim.screens["game-screen"].showCommandHelp(ap)
                                                                        } else {
                                                                            o("Sorry, no help for " + ap);
                                                                            aA = true
                                                                        }
                                                                        af = true
                                                                    } else {
                                                                        if (av === ":e start.game" || av === ":e! start.game" || av === ":level 1" || (av === ":e" && am === "start.game") || (av === ":e!" && am === "start.game") || (av === ":e" && am === "Level 1") || (av === ":e!" && am === "Level 1")) {
                                                                            Y.restartGame();
                                                                            o('Editing file "Level 1".');
                                                                            af = true;
                                                                            aA = true
                                                                        } else {
                                                                            if (av === ":login") {
                                                                                // TOFIX - Removed !vim.login.isUserLoggedIn()
                                                                                if (false) {
                                                                                    vim.screens["game-screen"].hideCommandHelp();
                                                                                    vim.login.askForLoginInfo();
                                                                                    af = true
                                                                                } else {
                                                                                    o("Already logged in. Please logout first.");
                                                                                    aA = true
                                                                                }
                                                                            } else {
                                                                                if (av === ":buy") {
                                                                                    // TOFIX - Removed the !vim.login.isUserLoggedIn()
                                                                                    if (false) {
                                                                                        vim.screens["game-screen"].hideCommandHelp();
                                                                                        vim.screens["game-screen"].showBuyLicense();
                                                                                        af = true
                                                                                    } else {
                                                                                        o("Current user already have a license.");
                                                                                        aA = true
                                                                                    }
                                                                                } else {
                                                                                    if (av === ":privacy") {
                                                                                        vim.screens["game-screen"].hideCommandHelp();
                                                                                        vim.screens["game-screen"].openPrivacyDialog();
                                                                                        af = true
                                                                                    } else {
                                                                                        if (av === ":cookies") {
                                                                                            vim.screens["game-screen"].hideCommandHelp();
                                                                                            vim.screens["game-screen"].openCookiesDialog();
                                                                                            af = true
                                                                                        } else {
                                                                                            if (av === ":copyright") {
                                                                                                vim.screens["game-screen"].hideCommandHelp();
                                                                                                vim.screens["game-screen"].openCreditsDialog();
                                                                                                af = true
                                                                                            } else {
                                                                                                if (av === ":terms") {
                                                                                                    vim.screens["game-screen"].hideCommandHelp();
                                                                                                    vim.screens["game-screen"].openTermsDialog();
                                                                                                    af = true
                                                                                                } else {
                                                                                                    if (av.indexOf(":login ") === 0) {
                                                                                                        // TOFIX - Removed !vim.login.isUserLoggedIn()
                                                                                                        if (false) {
                                                                                                            ao = av.split(" ");
                                                                                                            if (ao.length !== 3) {
                                                                                                                o("You can use either :login &lt;email&gt; &lt;password&gt; for fast login or :login to open the login dialog.");
                                                                                                                aA = true
                                                                                                            } else {
                                                                                                                vim.login.fastLoginSubmit(ao[1], ao[2]);
                                                                                                                aA = true
                                                                                                            }
                                                                                                        } else {
                                                                                                            o("Already logged in. Please logout first.");
                                                                                                            aA = true
                                                                                                        }
                                                                                                    } else {
                                                                                                        if (av === ":logout") {
                                                                                                            if (vim.login.isUserLoggedIn()) {
                                                                                                                vim.login.logout();
                                                                                                                af = true;
                                                                                                                aA = true
                                                                                                            } else {
                                                                                                                o("User not logged in yet.");
                                                                                                                aA = true
                                                                                                            }
                                                                                                        } else {
                                                                                                            if (av === ":keyboard") {
                                                                                                                af = true;
                                                                                                                vim.screens["game-screen"].displayKeyboard()
                                                                                                            } else {
                                                                                                                if (av === ":q" || av === ":q!" || av === ":quit" || av === ":quit!") {
                                                                                                                    vim.screens["game-screen"].showTitle();
                                                                                                                    af = true
                                                                                                                } else {
                                                                                                                    if (av === ":ls") {
                                                                                                                        o(vim.buffers.list());
                                                                                                                        aA = true
                                                                                                                    } else {
                                                                                                                        if (av.indexOf(":b ") === 0 || av === ":b#" || av === ":b%" || (av.indexOf(":b") === 0 && !isNaN(parseInt(av.substr(2), 10)))) {
                                                                                                                            if (vim.model.isKeypressCountdownActive()) {
                                                                                                                                o("Changing buffers while working on a countdown text is not allowed.\nPlease leave the text area and try again. (You can leave by pressing ESC twice)")
                                                                                                                            } else {
                                                                                                                                ar = av.substr(av.charAt(2) === " " ? 3 : 2);
                                                                                                                                au = vim.buffers.getBuffer(ar);
                                                                                                                                if (typeof au === "string") {
                                                                                                                                    o(au)
                                                                                                                                } else {
                                                                                                                                    if (vim.buffers.getCurrentBuffer().getName() !== au.getName()) {
                                                                                                                                        vim.buffers.switchTo(ar)
                                                                                                                                    }
                                                                                                                                    o("Editing buffer " + au.getName())
                                                                                                                                }
                                                                                                                            }
                                                                                                                            aA = true
                                                                                                                        } else {
                                                                                                                            if (av === ":e underground") {
                                                                                                                                if (vim.model.isKeypressCountdownActive()) {
                                                                                                                                    o("Changing buffers while working on a countdown text is not allowed.\nPlease leave the text area and try again. (You can leave by pressing ESC twice)")
                                                                                                                                } else {
                                                                                                                                    ar = "underground";
                                                                                                                                    au = vim.buffers.getBuffer(ar);
                                                                                                                                    if (typeof au === "string") {
                                                                                                                                        vim.buffers.add(ar, '{"buffer":"underground","addX":100,"addY":100,"cursorX":6,"cursorY":13,"bg":["                             ","                               ","                               ","                            ","                            ","                            ","                            ","                            ","                            ","                            ","                            ","    lllll                   ","    l~~~l                       ","    l~~~l                       ","    l~~~l                       ","    lS~Sllll                    ","    l~~~ llllllllllllllllll     ","    l+++++++++++++++lllllll     ","    lllllllllllllllllll~~~l     ","    lllllllllllllllllll~~~l     ","                      l~~~l   ","                      lllll   ","                            ","                            ","                            ","                            ","                            ","                   ","    ","     "],"entities":[{"type":"princess","x":24,"y":19,"data":{"name":"level_11_princess","levelToLoad":12,"message":"Well done Shadowy One!\\nTo be continued..."}},{"type":"red_door","x":6,"y":15,"invisible":false}],"textareas":[{"x":5,"y":17,"limit":22,"shouldClean":" ","alwaysSink":false,"text":"YOU ^*5.SHALL.NOT^ ^*3.NOT.^ ^*4.PASS.^!!^*1.!.PASS^"}]}')
                                                                                                                                    }
                                                                                                                                    if (vim.buffers.getCurrentBuffer().getName() !== ar) {
                                                                                                                                        vim.buffers.switchTo(ar)
                                                                                                                                    }
                                                                                                                                    if (typeof au === "string") {
                                                                                                                                        E("sendToCursorCommandUntilMove", "GREAT  SCOTT!!!")
                                                                                                                                    }
                                                                                                                                    au = vim.buffers.getCurrentBuffer();
                                                                                                                                    o("Editing buffer " + au.getName())
                                                                                                                                }
                                                                                                                                aA = true
                                                                                                                            } else {
                                                                                                                                if (av === ":level") {
                                                                                                                                    o("Missing level number (for example ':level 3')");
                                                                                                                                    aA = true
                                                                                                                                } else {
                                                                                                                                    if ((av === ":e" && am.indexOf("Level ") === 0) || av.indexOf(":level ") === 0) {
                                                                                                                                        ae = av.indexOf(":level ") === 0 ? parseInt(av.substr(7), 10) : parseInt(am.substr(6), 10);
                                                                                                                                        // TOFIX - Here we removed this: ae > az.getHighestLevel() to allow to load any level.
                                                                                                                                        if (false) {
                                                                                                                                            o("You can only replay levels that you've already reached. Current highest level is " + az.getHighestLevel() + ".");
                                                                                                                                            aA = true
                                                                                                                                        } else {
                                                                                                                                            if (ae === 13) {
                                                                                                                                                o("I don't remember anything from level 13... Why risk it?");
                                                                                                                                                aA = true
                                                                                                                                            } else {
                                                                                                                                                vim.gamestate.loadLevel(ae);
                                                                                                                                                af = true
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    } else {
                                                                                                                                        if (av === ":!ls" || av.indexOf(":!rm ") === 0 || av === ":!rm" || av.indexOf(":w ") === 0 || av === ":w" || av.indexOf(":w! ") === 0 || av === ":w!" || av.indexOf(":e ") === 0 || av === ":e" || av.indexOf(":e! ") === 0 || av === ":e!") {
                                                                                                                                            // TOFIX - Removed !vim.login.isUserLoggedIn()
                                                                                                                                            if (false) {
                                                                                                                                                o("Only licensed users are allowed to save and restore games. Please login first.");
                                                                                                                                                aA = true
                                                                                                                                            } else {
                                                                                                                                                if (av === ":!ls") {
                                                                                                                                                    vim.gamestate.list();
                                                                                                                                                    af = true
                                                                                                                                                } else {
                                                                                                                                                    if (av === ":!rm") {
                                                                                                                                                        o("!rm requires filename to be deleted.");
                                                                                                                                                        aA = true
                                                                                                                                                    } else {
                                                                                                                                                        if (av.indexOf(":!rm ") === 0) {
                                                                                                                                                            av = av.replace(/\s+/g, " ");
                                                                                                                                                            ao = av.split(" ");
                                                                                                                                                            aB = ao[1];
                                                                                                                                                            vim.gamestate.remove(aB);
                                                                                                                                                            af = true
                                                                                                                                                        } else {
                                                                                                                                                            if (av.indexOf(":w ") === 0 || av === ":w" || av.indexOf(":w! ") === 0 || av === ":w!") {
                                                                                                                                                                av = av.replace(/\s+/g, " ");
                                                                                                                                                                ao = av.split(" ");
                                                                                                                                                                if (ao.length > 2) {
                                                                                                                                                                    o("Filename can't contain spaces");
                                                                                                                                                                    aA = true;
                                                                                                                                                                    ah = true
                                                                                                                                                                }
                                                                                                                                                                if (!ah && vim.model.isKeypressCountdownActive()) {
                                                                                                                                                                    o("Saving games while working on a countdown text is not allowed.\nPlease leave the text area and try again. (You can leave by pressing ESC twice)");
                                                                                                                                                                    aA = true;
                                                                                                                                                                    ah = true
                                                                                                                                                                }
                                                                                                                                                                aB = ao[1] || am;
                                                                                                                                                                if (!ah && aB.indexOf("Level ") === 0) {
                                                                                                                                                                    o("The last restored game was the read only '" + aB + "'. Please specify a new filename after the :w.");
                                                                                                                                                                    aA = true;
                                                                                                                                                                    ah = true
                                                                                                                                                                }
                                                                                                                                                                if (!ah) {
                                                                                                                                                                    Z = av === ":w!" || av.indexOf(":w! ") === 0;
                                                                                                                                                                    vim.gamestate.saveGame(aB, Z);
                                                                                                                                                                    af = true
                                                                                                                                                                }
                                                                                                                                                            } else {
                                                                                                                                                                if (av.indexOf(":e ") === 0 || av === ":e" || av.indexOf(":e! ") === 0 || av === ":e!") {
                                                                                                                                                                    av = av.replace(/\s+/g, " ");
                                                                                                                                                                    ao = av.split(" ");
                                                                                                                                                                    if (ao.length > 2) {
                                                                                                                                                                        o("Filename can't contain spaces");
                                                                                                                                                                        aA = true;
                                                                                                                                                                        ah = true
                                                                                                                                                                    }
                                                                                                                                                                    if (!ah && vim.model.isKeypressCountdownActive()) {
                                                                                                                                                                        o("Restoring games while working on a countdown text is not allowed.\nPlease leave the text area and try again. (You can leave by pressing ESC twice)");
                                                                                                                                                                        aA = true;
                                                                                                                                                                        ah = true
                                                                                                                                                                    }
                                                                                                                                                                    if (!ah) {
                                                                                                                                                                        aB = ao[1] || am;
                                                                                                                                                                        vim.gamestate.restoreGame(aB);
                                                                                                                                                                        af = true
                                                                                                                                                                    }
                                                                                                                                                                }
                                                                                                                                                            }
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        q.reset();
        if (!aA) {
            E("sendToColonCommand", af ? "" : "Unknown command")
        }
    }

    function P() {
        return q.getCurrentState() === "sendToColonCommand"
    }

    function H(X) {
        K();
        t = true;
        g()
    }

    function z(X) {
        if (!X) {
            if (!Game.canReturnToCommandMode()) {
                E("sendToCursorCommand", "Please type something before leaving insert mode\nso I'll have a valid location to stand on.");
                return
            }
        }
        K();
        t = false;
        if (!X) {
            Game.returnToCommandMode()
        } else {
            vim.screens["game-screen"].showGameMenu()
        }
        g()
    }

    function T() {
        return t
    }

    function R(X) {
        m();
        vim.view.resetScrollMode();
        G(X);
        return false
    }

    function I() {
        K();
        r = true;
        g()
    }

    function m() {
        K();
        r = false;
        g()
    }

    function A(Y, X) {
        if (Y === "ESC") {
            return z(false)
        } else {
            return E(X ? "processUndoRedoInputModeInput" : "processInputModeInput", Y)
        }
    }

    function h() {
        E("sendToCursorCommandUntilMove", "Tag text objects are not\nsupported in this game.", true);
        E("error")
    }

    function O(ad, Z) {
        var X = Z.charAt(0),
            ab = Z.lastIndexOf(X) !== 0,
            ah = false,
            Y = Z === X,
            ac = vim.model,
            ae = ac.getGlobalSearchStr() ? ac.getGlobalSearchStr().substr(1) : undefined,
            ag = ac.getGlobalSearchOffset(),
            af, aa;
        af = ab ? Z.substring(1, Z.lastIndexOf(X)) : Z.substr(1);
        if (ab) {
            aa = Z.substr(Z.lastIndexOf(X) + 1);
            ab = aa !== ""
        } else {
            if (Y) {
                ab = true
            }
        }
        if (af === "") {
            ah = true
        }
        O.detectedPattern = af || "";
        O.detectedOffset = aa || "";
        af = ah ? ae : af;
        aa = Y ? ag : aa;
        if (typeof af !== "undefined" && af !== "") {
            ac.setGlobalSearchStr(X + af)
        }
        if (typeof af !== "undefined" && af !== "" && typeof aa !== "undefined") {
            ac.setGlobalSearchOffset(aa)
        }
    }
    return {
        initialize: e,
        disableKeys: K,
        enableKeys: g,
        enableArrowKeys: Q,
        suspend: B,
        resetState: function () {
            q.reset()
        },
        isInColonInputMode: P,
        isInMiddleOfCursorCommand: function () {
            return q.currentCommand.length > 0
        },
        injectCommand: D,
        getLastInlineSearch: v,
        done: l,
        preventDefault: G,
        switchToInputMode: H,
        returnToCommandMode: z,
        isInInputMode: T,
        switchToScrollMode: I,
        leaveScrollMode: m,
        emulateInputModeInput: A,
        noTagSupport: h,
        detectTilde: V
    }
})();
vim.screens["game-screen"] = (function () {
    var U = vim.dom,
        bf = U.$,
        ak = vim.game,
        b = vim.audio,
        br = true,
        bh = false,
        I = b.getVolume(),
        s = bf("#to-be-continued")[0],
        at = bf("#more-information a")[0],
        d = bf("#colon-command")[0],
        a7 = -1,
        bc = true,
        R = "",
        aX = "standard",
        a5 = ["~`!1@2#3$4%5^6&7*8(9)0_-+=", "QqWwEeRrTtYyUuIiOoPp{[}]|\\", "AaSsDdFfGgHhJjKkLl:;\"'", "ZzXxCcVvBbNnMm<,>.?/"],
        aE = ["~`!1@2#3$4%5^6&7*8(9)0{[}]", "\"'<,>.PpYyFfGgCcRrLl?/+=|\\", "AaOoEeUuIiDdHhTtNnSs_-", ":;QqJjKkXxBbMmWwVvZz"],
        aO = a5,
        w, W, aL, bC = bf("#credits")[0],
        bj = bf("#new-terms")[0],
        Y = bf("#register-screen")[0],
        E = bf("#instructions")[0],
        z = vim.validKeys,
        k = bf("#button-desc")[0],
        aT, aF = false,
        M = ["~`!1@2#3$4%5^6&7*8(9)0_-+=", "QqWwFfPpGgJjLlUuYy:;{[}]|\\", "AaRrSsTtDdHhNnEeIiOo\"'", "ZzXxCcVvBbKkMm<,>.?/"],
        J = bf("#stats")[0],
        bD, bu = 150;
    var N = bf("#confirm-new-terms-button")[0],
        aA = bf("#new-terms-message")[0];

    function O() {
        if (aX === "Dvorak") {
            return "Colemak"
        }
        if (aX === "Colemak") {
            return "standard"
        }
        return "Dvorak"
    }

    function aQ() {
        bi(O())
    }

    function bi(bE) {
        aX = bE;
        switch (bE) {
            case "Dvorak":
                aO = aE;
                break;
            case "Colemak":
                aO = M;
                break;
            default:
                aO = a5
        }
        bp()
    }

    function bb() {
        bf("#game-menu-volume .indicator")[0].style.width = b.getVolume() + "%"
    }

    function ba() {
        bh = !bh;
        if (bh) {
            I = b.getVolume();
            b.setVolume(0)
        } else {
            b.setVolume(I)
        }
        bb()
    }

    function G(bG) {
        var bE, bF = bf("#game-menu-volume .indicator")[0],
            bH, bI = bF.getClientRects()[0].left;
        if (bG.pageX === null) {
            bH = document.documentElement && document.documentElement.scrollLeft !== null ? document.documentElement : document.body;
            bE = bG.clientX + bH.scrollLeft
        } else {
            bE = bG.pageX
        }
        I = bE - bI;
        b.setVolume(I);
        bb()
    }

    function T(bE) {
        if (bE && bE.preventDefault) {
            bE.preventDefault()
        } else {
            if (window.event && window.event.returnValue) {
                window.eventReturnValue = false
            }
        }
    }

    function aK(bE) {
        bn();
        if (!vim.free_game_ended || vim.licensedUser === true) {
            s.style.visibility = "hidden";
            at.style.visibility = "hidden";
            vim.input.initialize()
        }
        bf("#game-screen #game-menu")[0].style.display = "block";
        Game.gameFocus();
        T(bE);
        return false
    }

    function af() {
        aL = true;
        bf("#title")[0].style.display = "block";
        bf("#game-screen #game-menu")[0].style.display = "none";
        a9();
        vim.input.disableKeys();
        window.addEventListener("keydown", aK, false)
    }

    function bn() {
        aL = false;
        bf("#title")[0].style.display = "none";
        window.removeEventListener("keydown", aK, false);
        vim.view.notifyPointCursor()
    }

    function o() {
        var bE = s.style.color,
            bH = bE.substring(bE.lastIndexOf(",") + 1, bE.lastIndexOf(")")),
            bG = 0.05,
            bF;
        if (bE === "") {
            s.style.color = "rgba(255,255,255,0)";
            for (bF = bG; bF < 1; bF += bG) {
                window.setTimeout(o, bF * 2000)
            }
            window.setTimeout(L, bF * 2000);
            s.style.visibility = "visible"
        } else {
            s.style.color = "rgba(255,255,255," + (parseFloat(bH) + bG) + ")"
        }
    }

    function L() {
        var bE = at.style.color,
            bH = bE.substring(bE.lastIndexOf(",") + 1, bE.lastIndexOf(")")),
            bG = 0.05,
            bF;
        if (bE === "") {
            at.style.color = "rgba(255,255,0,0)";
            for (bF = bG; bF < 1; bF += bG) {
                window.setTimeout(L, bF * 2000)
            }
            at.style.visibility = "visible"
        } else {
            at.style.color = "rgba(255,255,0," + (parseFloat(bH) + bG) + ")"
        }
    }

    function h() {
        b.play("menu_click");
        aw()
    }

    function ae() {
        vim.input.resetState();
        vim.input.injectCommand([":", "l", "e", "v", "e", "l", " ", "1", "ENTER"])
    }

    function p() {
        vim.input.resetState();
        vim.input.injectCommand([":", "l", "e", "v", "e", "l", " ", "3", "ENTER"])
    }

    function aI() {
        vim.input.resetState();
        vim.input.injectCommand([":", "l", "e", "v", "e", "l", " "])
    }

    function aZ() {
        vim.input.resetState();
        vim.input.injectCommand([":", "w", " "])
    }

    function aS() {
        vim.input.resetState();
        vim.input.injectCommand([":", "e", " "])
    }

    function v() {
        vim.input.resetState();
        vim.input.injectCommand([":", "!", "l", "s", "ENTER"])
    }

    function bx() {
        vim.input.resetState();
        vim.input.injectCommand([":", "!", "r", "m", " "])
    }

    function ac() {
        vim.input.resetState();
        vim.input.injectCommand([":", "s", "e", "t", " ", "s", "t", "a", "t", "s", "ENTER"]);
        U.addClass("#game-menu", "nohover");
        window.setTimeout(function () {
            U.removeClass("#game-menu", "nohover")
        }, 100)
    }

    function a1() {
        vim.input.resetState();
        vim.input.injectCommand([":", "s", "e", "t", " ", "n", "o", "s", "t", "a", "t", "s", "ENTER"]);
        U.addClass("#game-menu", "nohover");
        window.setTimeout(function () {
            U.removeClass("#game-menu", "nohover")
        }, 100)
    }

    function D() {
        vim.input.resetState();
        vim.input.injectCommand([":", "h", "e", "l", "p", " "])
    }

    function ao(bE) {
        if (bE.keyCode === 27) {
            al();
            T(bE)
        }
        return false
    }

    function al() {
        bf("#allow-arrow-keys-dialog")[0].style.display = "none";
        bf("#shadowOverlay")[0].style.visibility = "hidden";
        window.removeEventListener("keydown", ao, false);
        vim.input.enableArrowKeys();
        C()
    }

    function ar() {
        vim.input.disableKeys();
        bf("#shadowOverlay")[0].style.visibility = "visible";
        a9();
        window.addEventListener("keydown", ao, false);
        bf("#allow-arrow-keys-dialog")[0].style.display = "block"
    }

    function m(bF) {
        var bE = vim.input,
            bG = bE.detectTilde;
        bG.keydown(bF);
        if (bG.checkAndResetCtrlR()) {
            an("CTRL-R");
            T(bF);
            return false
        } else {
            if (bG.checkAndResetFirefoxSlash()) {
                an("/");
                T(bF);
                return false
            } else {
                if (bG.checkAndResetFirefoxSingleQuote()) {
                    an("'");
                    T(bF);
                    return false
                } else {
                    if (bF.keyCode === 27 || bF.keyCode === 13) {
                        V()
                    } else {
                        if (bF.keyCode === 16) {
                            w = true
                        } else {
                            W = true
                        }
                    }
                }
            }
        }
    }

    function ap(bE) {
        vim.input.detectTilde.keyup(bE);
        if (bE.keyCode === 16) {
            w = false;
            if (!W) {
                aQ()
            }
            W = false
        }
    }

    function j(bF) {
        var bE = String.fromCharCode(bF.charCode || bF.keyCode);
        vim.input.detectTilde.keypress(bF);
        if (bE === " ") {
            V()
        } else {
            an(bE)
        }
    }

    function an(bF) {
        var bG = vim.validKeys.getKeyDescription(bF),
            bE = document.getElementById("key-description");
        if (bG !== "") {
            bE.innerHTML = bF + " - " + bG + (vim.validKeys.isDisabled(bF) ? " <span style='color: #555'>(Temporarily missing)</span>" : "")
        }
    }

    function V() {
        bf("#valid-keys-dialog")[0].style.display = "none";
        bf("#shadowOverlay")[0].style.visibility = "hidden";
        window.removeEventListener("keypress", j, false);
        window.removeEventListener("keydown", m, false);
        window.removeEventListener("keyup", ap, false);
        C();
        w = false;
        W = false
    }

    function bp() {
        var bF, bE, bI = "",
            bG, bH = vim.validKeys;
        for (bF = 0; bF < aO.length; ++bF) {
            bI += "<ul>";
            switch (bF) {
                case 1:
                    bI += '<li class="tab_key key_inactive">&nbsp;</li>';
                    break;
                case 2:
                    bI += '<li class="capslock key_inactive"></li>';
                    break;
                case 3:
                    bI += '<li class="shift key_inactive">';
                    bI += '<div id="switch-keyboard-layout" onClick="vim.screens[\'game-screen\'].switchLayoutStyle()">Switch layout<br>to ' + O() + "</div>";
                    bI += "</li>";
                    break
            }
            for (bE = 0; bE < aO[bF].length / 2; ++bE) {
                bI += "<li";
                bG = aO[bF].charAt(bE * 2);
                if (bG === "|") {
                    bI += ' class="pipe"'
                }
                bI += '><div class="key_up';
                if (bH.isValid(bG)) {
                    if (bH.isDisabled(bG)) {
                        bI += " disabled"
                    } else {
                        bI += " active"
                    }
                }
                bI += "\" onClick=\"vim.screens['game-screen'].showKeyDescription('" + (bG === '"' ? "&quot;" : bG) + "');\"";
                bI += ">" + (bH.isDisabled(bG) || bH.isValid(bG) ? bG : "") + "</div>";
                bI += '<div class="key_down';
                bG = aO[bF].charAt(bE * 2 + 1);
                if (bH.isValid(bG)) {
                    if (bH.isDisabled(bG)) {
                        bI += " disabled"
                    } else {
                        bI += " active"
                    }
                }
                bI += '" onClick=\'vim.screens["game-screen"].showKeyDescription("' + (bG === "'" ? "&apos;" : bG) + "\");'";
                bI += ">" + (bH.isDisabled(bG) || bH.isValid(bG) ? bG : "") + "</div></li>"
            }
            switch (bF) {
                case 0:
                    bI += '<li class="backspace key_inactive">&nbsp;</li>';
                    break;
                case 2:
                    bI += '<li class="enter key_inactive"></li>';
                    break;
                case 3:
                    bI += '<li class="shift key_inactive"></li>';
                    break
            }
            bI += "</ul>"
        }
        bI += '<div id="key-description">Please press a key to read its description. Enter or ESC to exit.<br>For a more complete description type :help [character] in the game screen.</div>';
        bf("#show-valid-keys-dialog")[0].innerHTML = bI
    }

    function a2(bE) {
        if (bE.keyCode === 27) {
            bB();
            T(bE);
            return false
        } else {
            if (bE.keyCode === 40 || bE.keyCode === 38) {
                Y.scrollTop = Y.scrollTop + 20 * (bE.keyCode === 40 ? 1 : -1);
                T(bE);
                return false
            }
        }
        return true
    }

    function a8(bG) {
        var bF = bG.charCode || bG.keyCode,
            bE = String.fromCharCode(bF);
        if (bE === "k" || bE === "j") {
            Y.scrollTop = Y.scrollTop + 20 * (bE === "j" ? 1 : -1)
        }
    }

    function bB() {
        Y.style.display = "none";
        C();
        bf("#shadowOverlay")[0].style.visibility = "hidden";
        window.removeEventListener("keydown", a2, false);
        window.removeEventListener("keypress", a8, false)
    }

    function aw() {
        i();
        bf("#shadowOverlay")[0].style.visibility = "visible";
        a9();
        Y.style.display = "block";
        window.addEventListener("keydown", a2, false);
        window.addEventListener("keypress", a8, false)
    }

    function ax(bG) {
        var bF = bG.charCode || bG.keyCode,
            bE = String.fromCharCode(bF);
        if (bE === "k" || bE === "j") {
            E.scrollTop = E.scrollTop + 20 * (bE === "j" ? 1 : -1)
        }
    }

    function ad(bE) {
        if (bE.keyCode === 27 || bE.keyCode === 13) {
            av();
            T(bE);
            return false
        } else {
            if (bE.keyCode === 40 || bE.keyCode === 38) {
                E.scrollTop = E.scrollTop + 20 * (bE.keyCode === 40 ? 1 : -1);
                T(bE);
                return false
            }
        }
        return true
    }

    function av() {
        E.style.display = "none";
        C();
        bf("#shadowOverlay")[0].style.visibility = "hidden";
        window.removeEventListener("keydown", ad, false);
        window.removeEventListener("keypress", ax, false)
    }

    function aM() {
        i();
        bf("#shadowOverlay")[0].style.visibility = "visible";
        a9();
        E.style.display = "block";
        window.addEventListener("keydown", ad, false);
        window.addEventListener("keypress", ax, false)
    }

    function aa(bG) {
        var bF = bG.charCode || bG.keyCode,
            bE = String.fromCharCode(bF);
        if (bE === "k" || bE === "j") {
            J.scrollTop = J.scrollTop + 20 * (bE === "j" ? 1 : -1)
        }
    }

    function aq(bE) {
        if (bE.keyCode === 27 || bE.keyCode === 13) {
            bq();
            T(bE);
            return false
        } else {
            if (bE.keyCode === 40 || bE.keyCode === 38) {
                J.scrollTop = J.scrollTop + 20 * (bE.keyCode === 40 ? 1 : -1);
                T(bE);
                return false
            }
        }
        return true
    }

    function bq() {
        J.style.display = "none";
        C();
        bf("#shadowOverlay")[0].style.visibility = "hidden";
        window.removeEventListener("keydown", aq, false);
        window.removeEventListener("keypress", aa, false)
    }

    function g() {
        var bE = vim.login;
        i();
        bf("#shadowOverlay")[0].style.visibility = "visible";
        a9();
        bf("#stat-user-email")[0].innerText = bE.isUserLoggedIn() ? vim.emailaddr + (bE.isPartOfAGroup() ? " (" + bE.getGroupName() + ")" : "") : "Unlicensed user";
        bf("#stat-table-div")[0].innerHTML = vim.stats.getUserStatisticsTable();
        J.style.display = "block";
        window.addEventListener("keydown", aq, false);
        window.addEventListener("keypress", aa, false)
    }

    function az() {
        var bF, bE;
        vim.input.disableKeys();
        w = false;
        W = false;
        bf("#shadowOverlay")[0].style.visibility = "visible";
        a9();
        window.addEventListener("keypress", j, false);
        window.addEventListener("keydown", m, false);
        window.addEventListener("keyup", ap, false);
        bp();
        bf("#valid-keys-dialog")[0].style.display = "block"
    }

    function bz() {
        if (vim.login.isUserLoggedIn()) {
            vim.login.logout()
        } else {
            a9();
            vim.login.askForLoginInfo()
        }
    }

    function bm() {
        if (s.style.visibility === "visible") {
            s.style.visibility = "hidden";
            s.style.color = "";
            at.style.visibility = "hidden";
            at.style.color = "";
            vim.input.enableKeys()
        }
    }

    function a0() {
        // TOFIX - Removed !vim.login.isUserLoggedIn()
        if (false) {
            bf("#user-login")[0].style.display = "block";
            bf("#user-logout")[0].style.display = "none";
            bf(".game-menu-buy")[0].style.display = "block"
        } else {
            bf("#user-login")[0].style.display = "none";
            bf("#user-logout")[0].style.display = "block";
            bf(".game-menu-buy")[0].style.display = "none"
        }
    }

    function bs() {
        var bE = vim.login.isUserLoggedIn() && vim.groupAdmin;
        bf("#level-breakdown")[0].style.display = bE ? "block" : "none";
        var bF = vim.login.isUserLoggedIn() && vim.login.isPartOfAGroup();
        bf("#leaderboard")[0].style.display = bF ? "block" : "none"
    }

    function Q() {
        var bE = vim.login.shouldUserConfirmTerms() ? "block" : "none";
        bf("#accept-terms")[0].style.display = bE;
        bf("#terms-notification")[0].style.display = bE
    }

    function aC() {
        bB();
        vim.email.confirmEmailAddress(Z, undefined, false)
    }

    function aR() {
        bB();
        vim.email.confirmEmailAddress(Z, undefined, true)
    }

    function aN() {
        bB();
        vim.email.confirmEmailAddress(Z, undefined, false, true)
    }

    function Z(bI, bF, bE) {
        var bG = document.getElementById("paypal_form"),
            bH = document.location.host === "localhost" || document.location.host.indexOf("beta") !== -1,
            bJ;
        if (!bG.innerHTML) {
            bG.action = "https://www." + (bH ? "sandbox." : "") + "paypal.com/cgi-bin/webscr";
            bG.method = "post";
            bG.target = "_top";
            bJ = '<input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="CHANGE_ME">';
            bJ += '<input type="image" src="https://www.' + (bH ? "sandbox.paypal" : "paypalobjects") + '.com/en_US/GB/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online.">';
            bJ += '<img alt="" border="0" src="https://www.' + (bH ? "sandbox.paypal" : "paypalobjects") + '.com/en_GB/i/scr/pixel.gif" width="1" height="1">';
            bJ += '<input id="paypal_user_email" type="hidden" name="custom" value="CHANGE ME">';
            bG.innerHTML = bJ
        }
        if (bI) {
            bG.children[1].value = bH ? "VCJBEB7R78JQG" : "J2KK82Y9UGBKL"
        } else {
            if (bF) {
                bG.children[1].value = bH ? "7FUGNTE59Y2WU" : "9T7ZRT5ACFJYS"
            } else {
                if (bE == 10) {
                    bG.children[1].value = bH ? "N72GNLS6Z23NL" : "NKEJ4GZNCR8JY"
                } else {
                    bG.children[1].value = bH ? "NP786CSELUYY4" : "R8977MY6X6S9A"
                }
            }
        }
        bf("#paypal_user_email")[0].value = vim.emailaddr;
        bf("#buy_now form")[0].submit()
    }

    function bl(bE) {
        if (bE.keyCode === 27 || bE.keyCode === 13) {
            aW();
            T(bE);
            return false
        } else {
            if (bE.keyCode === 40 || bE.keyCode === 38) {
                bC.scrollTop = bC.scrollTop + 20 * (bE.keyCode === 40 ? 1 : -1);
                T(bE);
                return false
            }
        }
        return true
    }

    function u(bG) {
        var bF = bG.charCode || bG.keyCode,
            bE = String.fromCharCode(bF);
        if (bE === "k" || bE === "j") {
            bC.scrollTop = bC.scrollTop + 20 * (bE === "j" ? 1 : -1)
        }
    }

    function t() {
        bC.scrollTop = 0;
        bC.style.display = "block";
        i();
        bf("#shadowOverlay")[0].style.visibility = "visible";
        a9();
        bC.style.display = "block";
        window.addEventListener("keydown", bl, false);
        window.addEventListener("keypress", u, false)
    }

    function aW() {
        bC.style.display = "none";
        C();
        bf("#shadowOverlay")[0].style.visibility = "hidden";
        window.removeEventListener("keydown", bl, false);
        window.removeEventListener("keypress", u, false)
    }

    function aD() {
        bb();
        U.bind("#game-menu-sound", "click", ba);
        U.bind("#game-menu-volume", "click", G);
        U.bind(".game-menu-exit", "click", af);
        U.bind(".game-menu-keyboard", "click", az);
        U.bind(".game-menu-buy", "click", aw);
        U.bind("#restart-game", "click", ae);
        U.bind("#save-game", "click", aZ);
        U.bind("#restore-game", "click", aS);
        U.bind("#restore-level3", "click", p);
        U.bind("#load-level", "click", aI);
        U.bind("#list-games", "click", v);
        U.bind("#delete-game", "click", bx);
        U.bind("#user-login", "click", bz);
        U.bind("#user-logout", "click", bz);
        U.bind("#user-stats", "click", g);
        U.bind("#level-breakdown", "click", aV);
        U.bind("#leaderboard", "click", aH);
        U.bind("#display-ingame-stats", "click", ac);
        U.bind("#hide-ingame-stats", "click", a1);
        U.bind("#help", "click", aM);
        U.bind("#topic-help", "click", D);
        U.bind("#terms-and-conditions", "click", a4);
        U.bind("#copyright-and-credits", "click", t);
        U.bind("#privacy-policy", "click", bd);
        U.bind("#cookie-usage", "click", c);
        U.bind(".terms-link", "click", a4);
        U.bind(".privacy-link", "click", bd);
        U.bind(".timed-terms-link", "click", a4);
        U.bind(".timed-privacy-link", "click", bd);
        U.bind("#accept-terms", "click", l);
        U.bind("#confirm-new-terms-button", "click", am);
        a0();
        bs();
        Q();
        U.bind(at, "click", h);
        U.bind("#personal-license", "click", aC);
        U.bind("#friend-license", "click", aR);
        U.bind("#timed-license", "click", aN);
        U.bind("#group-license", "click", be);
        U.bind("#another-timed-license", "click", F);
        U.bind("#convert-to-personal-license", "click", a3)
    }

    function F() {
        vim.emailaddr = vim.expiredEmail;
        Z(false, true);
        vim.emailaddr = undefined
    }

    function a3() {
        vim.emailaddr = vim.expiredEmail;
        Z(false);
        vim.emailaddr = undefined
    }

    function be() {
        var bF = "contact@vim-adventures.com",
            bG = "Further details regarding group license",
            bE = "[ Please describe the context you wish to use VIM Adventures in, and how many licenses you require ]";
        window.open("mailto:" + bF + "?subject=" + bG + "&body=" + bE)
    }

    function r() {
        d.innerHTML = R + (bc ? "<span id='colon-dialog-cursor'>|</span>" : "");
        bc = !bc
    }

    function a() {
        return d.offsetTop
    }

    function K() {
        return R
    }

    function ai(bH) {
        var bG, bE, bF;
        if (a7 !== -1) {
            window.clearInterval(a7);
            a7 = -1;
            bc = true
        }
        if (bH.indexOf(":login ") === 0) {
            bG = bH.split(" ");
            if (bG.length > 2) {
                bF = "";
                for (bE = 0; bE < bG[2].length; ++bE) {
                    bF += "&bull;"
                }
                bG[2] = bF
            }
            bH = bG.join(" ")
        }
        R = bH;
        d.innerHTML = bH;
        d.style.visibility = bH === "" ? "hidden" : "visible";
        if (bH === "") {
            U.removeClass("#game-menu", "nohover")
        } else {
            U.addClass("#game-menu", "nohover")
        }
        if (vim.input.isInColonInputMode()) {
            a7 = window.setInterval(r, 400)
        }
    }

    function au(bF, bE) {
        var bH = bF.substring(bF.indexOf("?") + 1);
        var bI = bH.split("&");
        for (var bG = 0; bG < bI.length; bG++) {
            var bJ = bI[bG].split("=");
            if (bJ[0] == bE) {
                return decodeURIComponent(bJ[1])
            }
        }
        return ""
    }

    function bw() {
        window.setInterval(function () {
            var bE = document.getElementsByClassName("vimiumReset");
            if (bE.length && bE[0].style.display !== "none") {
                Game.showMessage("Vimium is capturing some of this page's keystrokes.<BR>Please add this page to Vimium's excluded URLs list.")
            }
        }, 2000)
    }

    function A() {
        U.bind(window, "beforeunload", function (bE) {
            if (vim.login.isUserLoggedIn() && vim.expirationTime && !isNaN(vim.expirationTime)) {
                var bF = "If you leave this page without logging out properly, the timer will continue to count down on the server leading to license expiration.\nPlease properly log out first.";
                bE.returnValue = bF;
                return bF
            }
        })
    }

    function bk() {
        if (Modernizr.canvas && Modernizr.canvastext) {
            if (br) {
                aL = true;
                b.initialize();
                Game.init();
                vim.input.disableKeys();
                aD();
                bw();
                A();
                vim.login.revalidateLogin();
                vim.login.scheduleLoginRevalidation();
                br = false
            }
        } else {
            vim.dom.$("#no-canvas")[0].style.display = "block";
            aL = false;
            if (br) {
                aD();
                br = false
            }
        }
        if (document.referrer.indexOf("resetPassword.php") !== -1) {
            bn();
            vim.login.choosePassword(au(document.referrer, "email"))
        } else {
            if (document.referrer.toLowerCase().indexOf("activatelicense.php") !== -1 && au(document.location.search, "email") !== "") {
                bn();
                vim.newAccount = true;
                vim.login.choosePassword(au(document.location.search, "email"))
            } else {
                if (document.referrer.toLowerCase().indexOf("activatelicense.php") !== -1 && au(document.location.search, "login") !== "") {
                    bn();
                    vim.login.askForLoginInfo(au(document.location.search, "login"))
                } else {
                    if (au(document.location.search, "email") !== "" && (au(document.location.search, "gift") !== "" || au(document.location.search, "personal") !== "" || au(document.location.search, "timed") !== "")) {
                        bn();
                        vim.login.choosePassword(au(document.location.search, "email"))
                    } else {
                        if (au(document.location.search, "login") !== "" && (au(document.location.search, "personal") !== "" || au(document.location.search, "timed") !== "")) {
                            bn();
                            vim.login.askForLoginInfo(au(document.location.search, "login"))
                        } else {
                            if (aL) {
                                af()
                            }
                        }
                    }
                }
            }
        }
        window.scroll(0, 0)
    }

    function i() {
        vim.input.disableKeys()
    }

    function C() {
        if (!vim.free_game_ended || vim.licensedUser === true) {
            vim.input.enableKeys()
        }
    }

    function a9() {
        U.removeClass(k, "shown");
        aF = false
    }

    function ah(bG) {
        var bF, bE;
        aT = bG;
        aF = true;
        bD = 0;
        if (typeof z.getNumberOfExampleSteps(bG) === "undefined") {
            return
        }
        if (vim.model.getCursorX() - vim.model.getTopX() > 18) {
            k.style.left = "50px";
            k.style.right = "auto"
        } else {
            k.style.right = "50px";
            k.style.left = "auto"
        }
        bF = z.getExtendedDescHTML(bG);
        k.innerHTML = bF;
        U.addClass(k, "shown")
    }

    function ab() {
        return aF
    }

    function bA() {
        return aL
    }

    function S(bH) {
        var bG, bF, bE = z.getNumberOfExampleSteps(aT || "");
        if (!aT || !bE) {
            return
        }
        if ((bH < 0 && bD > 0) || (bH > 0 && bD < bE - 1)) {
            bD = bD + bH
        }
        k.innerHTML = z.getExtendedDescHTML(aT, bD)
    }

    function f(bE) {
        if (bE.keyCode === 27 || bE.keyCode === 13) {
            bt()
        }
    }

    function bo(bF) {
        var bE = String.fromCharCode(bF.charCode || bF.keyCode);
        if (bE === " ") {
            bt()
        }
    }

    function bt() {
        bf("#double-login-dialog-overlay")[0].style.display = "none";
        bf("#shadowOverlay")[0].style.visibility = "hidden";
        window.removeEventListener("keypress", bo, false);
        window.removeEventListener("keydown", f, false);
        C()
    }

    function bv() {
        al();
        V();
        bn();
        bB();
        av();
        vim.input.disableKeys();
        bf("#shadowOverlay")[0].style.visibility = "visible";
        a9();
        window.addEventListener("keypress", bo, false);
        window.addEventListener("keydown", f, false);
        bf("#double-login-dialog-overlay")[0].style.display = "block"
    }

    function P() {
        bf("#game-screen #game-menu")[0].style.display = "block"
    }

    function aY() {
        bf("#game-screen #game-menu")[0].style.display = "none"
    }

    function l(bF, bE) {
        l.closingMsg = bE || "";
        bj.style.display = "block";
        i();
        bf("#shadowOverlay")[0].style.visibility = "visible";
        a9();
        ai("");
        bj.style.display = "block";
        return false
    }

    function X() {
        bf("#new-terms-message")[0].style.display = "none";
        bf("#confirm-new-terms-button")[0].style.display = "block";
        bj.style.display = "none";
        C();
        bf("#shadowOverlay")[0].style.visibility = "hidden";
        ai(l.closingMsg);
        Q()
    }

    function am() {
        var bE = (vim.emailaddr || "").trim();
        b.play("menu_click");
        N.style.display = "none";
        if (bE === "") {
            bg("Email address can't be empty. Please login first.", "error")
        } else {
            if (bE.indexOf("@") === -1) {
                bg("Email address missing @ sign. Please login.", "error")
            } else {
                if (bE.indexOf(".", bE.indexOf("@")) === -1) {
                    bg("Email address appears to be invalid. Please login again.", "error")
                } else {
                    vim.fetcher.getUrl("php/acceptTerms.php", H, a6, bE, (vim.password || "").trim(), undefined, function () {
                        bg("Updating server information...", "processing")
                    }, undefined)
                }
            }
        }
    }

    function aj() {
        aA.style.display = "none";
        N.style.display = "block"
    }

    function bg(bF, bE) {
        N.style.display = "none";
        aA.innerHTML = bF;
        aA.style.display = "block";
        aA.className = bE;
        if (bE !== "processing") {
            window.setTimeout(aj, 3000)
        }
    }

    function H(bE) {
        vim.terms = true;
        bg("Terms of Use and Privacy Policy accepted.", "ok");
        window.setTimeout(function () {
            aj();
            X()
        }, 3000)
    }

    function a6(bE) {
        bg("Error: " + bE.responseText, "error")
    }

    function a4(bE) {
        window.open("terms", "_blank");
        T(bE);
        return false
    }

    function bd(bE) {
        window.open("privacy", "_blank");
        T(bE);
        return false
    }

    function c(bE) {
        window.open("cookies", "_blank");
        T(bE);
        return false
    }

    function q() {
        return document.location.hostname === "localhost" ? "http://localhost/" : "https://eudb.vim-adventures.com/"
    }

    function aV(bE) {
        window.open(q() + "breakdown?email=" + encodeURIComponent(vim.emailaddr) + "&token=" + encodeURIComponent(vim.token) + (document.location.hostname.includes("beta") ? "&beta=true" : ""), "_blank");
        T(bE);
        return false
    }

    function aH(bF) {
        var bE = document.createElement("form");
        bE.method = "POST";
        bE.action = q() + "php/leaderboard.php";
        bE.target = "_blank";
        bE.innerHTML = '<INPUT name="email" value="' + vim.emailaddr + '" hidden /><INPUT name="token" value="' + vim.token + '" hidden />';
        document.body.appendChild(bE);
        bE.submit();
        T(bF);
        return false
    }

    function ay(bE) {
        if (!ay.bugElem) {
            ay.bugElem = document.getElementById("ending_pic_bug")
        }
        return function () {
            ay.bugElem.style.left = bE + "px";
            if (ay.bugElem.style.visibility !== "visible") {
                ay.bugElem.style.visibility = "visible"
            }
        }
    }

    function ag() {
        vim.input.disableKeys();
        a9();
        bf("#ending-dialog")[0].style.display = "block";
        aG("ending1", "THANKS LIN                ", 12, 1);
        by("ending1", "THANKS LIN                ", 3, 12);
        aG("ending1", "SHADOWY ONE, YOU'RE", undefined, 14, "THANKS ");
        aG("ending2", "THE HERO OF HYRU     ", 16, 33);
        by("ending2", "THE HERO OF HYRU     ", 4, 50);
        aG("ending2", "TEXTLAND.", undefined, 55, "THE HERO OF ");
        window.setTimeout(function () {
            document.getElementById("ending_pic_princess").classList.add("css3-flip")
        }, 71 * bu);
        aG("ending3", "FINALLY,", undefined, 94);
        aG("ending4", "PEACH RETURN              ", 12, 108);
        by("ending4", "PEACH RETURN              ", 8, 121);
        aG("ending4", "E RETURNS TO TEXTLAND.", undefined, 130, "PEAC");
        aG("ending5", "THIS ENDS THE STORY.", undefined, 156);
        by("ending5", "THIS ENDS THE STORY.", undefined, 180);
        aG("ending5", "THIS ENDS VIM-ADVENTURES.", undefined, 200);
        e(":%s/ENDS/ENDS PART 1 OF/g", 235);
        window.setTimeout(function () {
            var bH = document.getElementById("ending5");
            vim.screens["game-screen"].setColonCommand("");
            bH.innerHTML = "THIS ENDS PART 1 OF VIM-ADVENTURES.";
            bH.classList.add("css3-glow");
            window.setTimeout(function () {
                bH.classList.remove("css3-glow")
            }, 2 * bu)
        }, 270 * bu);
        var bF = 80,
            bE = Math.floor(window.innerWidth / 2 / bF),
            bG = 0;
        for (bG = 0; bG < bF; ++bG) {
            window.setTimeout(ay(-330 - (bF - 1 - bG) * bE), 278 * bu + (bG * bu) / 2)
        }
        window.setTimeout(function () {
            document.getElementById("what_happened_bubble").style.visibility = "visible"
        }, 321 * bu);
        window.setTimeout(function () {
            document.getElementById("what_happened_bubble").style.visibility = "hidden"
        }, 408 * bu);
        e(":q!", 458);
        window.setTimeout(function () {
            vim.screens["game-screen"].setColonCommand("");
            bf("#ending-dialog")[0].style.display = "none";
            bf("#game")[0].style.display = "none"
        }, 473 * bu)
    }

    function aP(bE) {
        return function () {
            vim.screens["game-screen"].setColonCommand(bE)
        }
    }

    function e(bE, bG) {
        var bF;
        for (bF = 1; bF <= bE.length; ++bF) {
            window.setTimeout(aP(bE.substr(0, bF)), (bF + bG) * bu)
        }
    }

    function aB(bI, bE, bF, bJ) {
        var bG = "",
            bH = bF.length;
        while (bH--) {
            bG += "&nbsp;"
        }
        return function () {
            bI.innerHTML = (bJ || "") + bE + bG
        }
    }

    function aG(bJ, bE, bG, bK, bI) {
        var bH = document.getElementById(bJ),
            bF;
        for (bF = 1; bF <= (bG !== undefined ? bG : bE.length); ++bF) {
            window.setTimeout(aB(bH, bE.substr(0, bF), bE.substr(bF), bI), (bF + bK) * bu)
        }
    }

    function by(bK, bE, bH, bL, bJ) {
        var bI = document.getElementById(bK),
            bF = bE.trim().length - 1,
            bG;
        for (bG = 0; bG < (bH !== undefined ? bH : bE.length); ++bG) {
            window.setTimeout(aB(bI, bE.substr(0, bF - bG), bE.substr(bF - bG), bJ), (bG + bL) * bu)
        }
    }

    function n(bE) {
        if (bE.keyCode === 27 || bE.keyCode === 13) {
            B()
        }
    }

    function aJ(bF) {
        var bE = String.fromCharCode(bF.charCode || bF.keyCode);
        if (bE === " ") {
            B()
        }
    }

    function B() {
        bf("#license-expired-dialog-overlay")[0].style.display = "none";
        bf("#expired-user-email")[0].innerHTML = "Unlicensed user";
        bf("#activated-on")[0].innerHTML = "";
        bf("#shadowOverlay")[0].style.visibility = "hidden";
        window.removeEventListener("keypress", aJ, false);
        window.removeEventListener("keydown", n, false);
        C()
    }

    function aU() {
        al();
        V();
        bn();
        bB();
        av();
        vim.input.disableKeys();
        bf("#shadowOverlay")[0].style.visibility = "visible";
        a9();
        ai("");
        window.addEventListener("keypress", aJ, false);
        window.addEventListener("keydown", n, false);
        bf("#license-expired-dialog-overlay")[0].style.display = "block"
    }
    return {
        run: bk,
        toBeContinuedFadeIn: o,
        hideToBeContinuedMessage: bm,
        confirmArrowKeys: ar,
        setColonCommand: ai,
        getColonCommand: K,
        getColonMessageTopYOffset: a,
        adjustUserMenu: a0,
        adjustStatsMenu: bs,
        adjustTermsMenu: Q,
        showKeyDescription: an,
        switchLayoutStyle: aQ,
        displayKeyboard: az,
        disableKeys: i,
        enableKeys: C,
        showTitle: af,
        showCommandHelp: ah,
        hideCommandHelp: a9,
        traverseHelpCommandExample: S,
        isCommandHelpOn: ab,
        isTitleScreenOn: bA,
        showHelp: aM,
        showStats: g,
        doubleLogin: bv,
        licenseExpired: aU,
        showGameMenu: P,
        hideGameMenu: aY,
        showBuyLicense: aw,
        openCreditsDialog: t,
        openTermsDialog: a4,
        openPrivacyDialog: bd,
        openCookiesDialog: c,
        openNewTermsDialog: l,
        runEnding: ag
    }
})();
window.cookieconsent_options = {
    message: "This website uses cookies to ensure you get the best experience on our website",
    dismiss: "Got it!",
    learnMore: "More info",
    link: "cookies",
    theme: "dark-floating",
    target: "_blank"
};
(function () {
    if (window.hasCookieConsent) {
        return
    }
    window.hasCookieConsent = true;
    var b = "cookieconsent_options";
    var d = "update_cookieconsent_options";
    var f = "cookieconsent_dismissed";
    var h = "//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/1.0.10/";
    if (document.cookie.indexOf(f) > -1 || (window.navigator && window.navigator.CookiesOK)) {
        return
    }
    if (typeof String.prototype.trim !== "function") {
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, "")
        }
    }
    var g = {
        isArray: function (k) {
            var j = Object.prototype.toString.call(k);
            return j == "[object Array]"
        },
        isObject: function (j) {
            return Object.prototype.toString.call(j) == "[object Object]"
        },
        each: function (j, p, m, o) {
            if (g.isObject(j) && !o) {
                for (var l in j) {
                    if (j.hasOwnProperty(l)) {
                        p.call(m, j[l], l, j)
                    }
                }
            } else {
                for (var k = 0, n = j.length; k < n; k++) {
                    p.call(m, j[k], k, j)
                }
            }
        },
        merge: function (k, j) {
            if (!k) {
                return
            }
            g.each(j, function (m, l) {
                if (g.isObject(m) && g.isObject(k[l])) {
                    g.merge(k[l], m)
                } else {
                    k[l] = m
                }
            })
        },
        bind: function (k, j) {
            return function () {
                return k.apply(j, arguments)
            }
        },
        queryObject: function (j, m) {
            var n;
            var l = 0;
            var k = j;
            m = m.split(".");
            while ((n = m[l++]) && k.hasOwnProperty(n) && (k = k[n])) {
                if (l === m.length) {
                    return k
                }
            }
            return null
        },
        setCookie: function (j, n, m, l, p) {
            m = m || 365;
            var o = new Date();
            o.setDate(o.getDate() + m);
            var k = [j + "=" + n, "expires=" + o.toUTCString(), "path=" + p || "/"];
            if (l) {
                k.push("domain=" + l)
            }
            document.cookie = k.join(";")
        },
        addEventListener: function (k, l, j) {
            if (k.addEventListener) {
                k.addEventListener(l, j)
            } else {
                k.attachEvent("on" + l, j)
            }
        }
    };
    var e = (function () {
        var j = "data-cc-event";
        var o = "data-cc-if";
        var p = function (s, t, r) {
            if (g.isArray(t)) {
                return g.each(t, function (u) {
                    p(s, u, r)
                })
            }
            if (s.addEventListener) {
                s.addEventListener(t, r)
            } else {
                s.attachEvent("on" + t, r)
            }
        };
        var q = function (s, r) {
            return s.replace(/\{\{(.*?)\}\}/g, function (z, u) {
                var w = u.split("||");
                var v, t;
                while ((t = w.shift())) {
                    t = t.trim();
                    if (t[0] === '"') {
                        return t.slice(1, t.length - 1)
                    }
                    v = g.queryObject(r, t);
                    if (v) {
                        return v
                    }
                }
                return ""
            })
        };
        var m = function (s) {
            var r = document.createElement("div");
            r.innerHTML = s;
            return r.children[0]
        };
        var n = function (u, t, s) {
            var r = u.parentNode.querySelectorAll("[" + t + "]");
            g.each(r, function (w) {
                var v = w.getAttribute(t);
                s(w, v)
            }, window, true)
        };
        var l = function (s, r) {
            n(s, j, function (u, t) {
                var w = t.split(":");
                var v = g.queryObject(r, w[1]);
                p(u, w[0], g.bind(v, r))
            })
        };
        var k = function (s, r) {
            n(s, o, function (u, t) {
                var v = g.queryObject(r, t);
                if (!v) {
                    u.parentNode.removeChild(u)
                }
            })
        };
        return {
            build: function (t, r) {
                if (g.isArray(t)) {
                    t = t.join("")
                }
                t = q(t, r);
                var s = m(t);
                l(s, r);
                k(s, r);
                return s
            }
        }
    })();
    var a = {
        options: {
            message: "This website uses cookies to ensure you get the best experience on our website. ",
            dismiss: "Got it!",
            learnMore: "More info",
            link: null,
            target: "_self",
            container: null,
            theme: "light-floating",
            domain: null,
            path: "/",
            expiryDays: 365,
            markup: ['<div class="cc_banner-wrapper {{containerClasses}}">', '<div class="cc_banner cc_container cc_container--open">', '<a href="#null" data-cc-event="click:dismiss" target="_blank" class="cc_btn cc_btn_accept_all">{{options.dismiss}}</a>', '<p class="cc_message">{{options.message}} <a data-cc-if="options.link" target="{{ options.target }}" class="cc_more_info" href="{{options.link || "#null"}}">{{options.learnMore}}</a></p>', "</div>", "</div>"]
        },
        init: function () {
            var j = window[b];
            if (j) {
                this.setOptions(j)
            }
            this.setContainer();
            if (this.options.theme) {
                this.loadTheme(this.render)
            } else {
                this.render()
            }
        },
        setOptionsOnTheFly: function (j) {
            this.setOptions(j);
            this.render()
        },
        setOptions: function (j) {
            g.merge(this.options, j)
        },
        setContainer: function () {
            if (this.options.container) {
                this.container = document.querySelector(this.options.container)
            } else {
                this.container = document.body
            }
            this.containerClasses = "";
            if (navigator.appVersion.indexOf("MSIE 8") > -1) {
                this.containerClasses += " cc_ie8"
            }
        },
        loadTheme: function (j) {
            j.call(this)
        },
        render: function () {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
                delete this.element
            }
            this.element = e.build(this.options.markup, this);
            if (!this.container.firstChild) {
                this.container.appendChild(this.element)
            } else {
                this.container.insertBefore(this.element, this.container.firstChild)
            }
        },
        dismiss: function (j) {
            j.preventDefault && j.preventDefault();
            j.returnValue = false;
            this.setDismissedCookie();
            this.container.removeChild(this.element)
        },
        setDismissedCookie: function () {
            g.setCookie(f, "yes", this.options.expiryDays, this.options.domain, this.options.path)
        }
    };
    var i;
    var c = false;
    (i = function () {
        if (!c && document.readyState == "complete") {
            a.init();
            c = true;
            window[d] = g.bind(a.setOptionsOnTheFly, a)
        }
    })();
    g.addEventListener(document, "readystatechange", i)
})();