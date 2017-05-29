from nameko.rpc import rpc, RpcProxy

class Compute(object):
    name = "compute"

    @rpc
    def compute(self, operation, value, other):
        operations = {'sum': lambda x, y: int(x) + int(y),
                      'mul': lambda x, y: int(x) * int(y),
                      'div': lambda x, y: int(x) / int(y),
                      'sub': lambda x, y: int(x) - int(y)}

        result = operations[operation] (value, other)
        return result
